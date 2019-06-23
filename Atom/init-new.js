const fs = require('fs');
const path = require('path');
const SelectList = global.require('atom-select-list');

atom.workspace.observeTextEditors(editor => {
  const grammar = editor.getGrammar();
  if (grammar.name === "Plain Text" || grammar === atom.grammars.nullGrammar)
    atom.textEditors.setGrammarOverride(editor, 'text.plain');
});

const projectsDir = path.join(require('os').homedir(), 'projects');
// if "~/projects/" directory does not exist, create it;
fs.stat(projectsDir, (err, stats) => {
  if (err) {
    fs.mkdir(projectsDir, (err) => { if (err) alert(err.message); });
  }
  else if (!stats.isDirectory()) {
    alert('can\'t create projects directory, cause there is a file with the same name');
  }
});

atom.enablePersistence = false;

// { 'project name': projectPane, ... }
const projectPanes = {};

function storeBuffer(buffer, projectName) {
  const data = JSON.stringify(buffer.serialize())
  const storePath = path.join(projectsDir, projectName, '.cache/atom-buffers', buffer.id);

  fs.writeFile(storePath, data, (err) => {
    if (err) fs.mkdir(path.dirname(storePath), { recursive: true }, (err) => {
      if (err) console.error(err);
      fs.writeFile(storePath, data, (err) => { if (err) console.error(err); })
    });
  });
}

// elements of the form: [buffer, projectName]
const changedBuffers = new Set();
setInterval(() => {
  changedBuffers.forEach(([buffer, projectName]) => storeBuffer(buffer, projectName));
  changedBuffers.clear();
}, 15000);
atom.window.addEventListener('beforeunload', _ => {
  changedBuffers.forEach(([buffer, projectName]) => storeBuffer(buffer, projectName));
  changedBuffers.clear();
});

function restoreBuffers(projectName) {
  function loadBuffer(storePath) {
    return new Promise((resolve, _) => {
      fs.readFile(storePath, (err, data) => {
        if (err) { console.error(err); resolve(true); return }

        let serializedBuffer;
        try { serializedBuffer = JSON.parse(data) }
        catch (err) { console.error(err); resolve(true); return }

        if (serializedBuffer.shouldDestroyOnFileDelete == null) {
          serializedBuffer.shouldDestroyOnFileDelete =
            () => atom.config.get('core.closeDeletedFileTabs');
        }
        // use a little guilty knowledge of the way a "TextBuffer" is serialized;
        // this allows a "TextBuffer" that has never been saved (but has a "filePath")
        //   to be deserialized;
        // but prevents a "TextBuffer" backed by a file that has been deleted from being saved;
        serializedBuffer.mustExist = serializedBuffer.digestWhenLastPersisted !== false;

        require('atom').TextBuffer.deserialize(serializedBuffer)
        .then(buffer => {
          resolve(true);
        })
        .catch(err => {
          console.error(err);
          resolve(true);
        });
      });
    });
  }

  return new Promise((resolve, _) => {
    const storeDir = path.join(projectsDir, projectName, '.cache/atom-buffers');
    fs.readdir(storeDir, (err, fileNames) => {
      const storePaths = (fileNames || []).map(
        fileName => path.join(storeDir, fileName)
      );

      const bufferLoadedPromises = [];
      storePaths.forEach(storePath => {
        bufferLoadedPromises.push(loadBuffer(storePath))
      });

      Promise.all(bufferLoadedPromises).then(_ => resolve(true));
    })
  });
}

function storeProjectPane(projectName) {
  const projectPane = projectPanes[projectName];
  if (!projectPane) return;

  const serializedPane = projectPane.serialize();

  const data = JSON.stringify(serializedPane);
  const storePath = path.join(projectsDir, projectName, '.cache/atom-pane');
  fs.writeFile(storePath, data, (err) => {
    if (err) fs.mkdir(path.dirname(storePath), { recursive: true }, (err) => {
      if (err) console.error(err);
      fs.writeFile(storePath, data, (err) => { if (err) console.error(err); })
    });
  });
}

const projectsWithChangedPane = new Set();
setInterval(() => {
  projectsWithChangedPane.forEach(projectName => storeProjectPane(projectName));
  projectsWithChangedPane.clear();
}, 15000);
atom.window.addEventListener('beforeunload', _ => {
  projectsWithChangedPane.forEach(projectName => storeProjectPane(projectName));
  projectsWithChangedPane.clear();
});

function openProjectPane(projectName) {
  const storePath = path.join(projectsDir, projectName, '.cache/atom-pane');
  fs.readFile(storePath, (err, data) => {
    let serializedPane;
    try { serializedPane = JSON.parse(err ? null : data) }
    catch (err) {
      console.error(err);
      serializedPane = null;
    }

    const activePane = atom.workspace.getCenter().getActivePane();

    let projectPane;
    if (serializedPane) {
      projectPane = activePane.constructor.deserialize(serializedPane, atom);
    } else {
      projectPane = new (activePane.constructor)({
        applicationDelegate: activePane.applicationDelegate,
        notificationManager: activePane.notificationManager,
        deserializerManager: activePane.deserializerManager,
        config: activePane.config,
        viewRegistry: activePane.viewRegistry
      });
    }

    // add "projectPane" to workspace;
    activePane.parent.replaceChild(activePane, projectPane);

    projectPanes[projectName] = projectPane;
    projectPane.activate();

    // if there is no item in projectPane, focus tree-view;
    //if (projectPane.getItems().length == 0) {
    //  atom.workspace.paneForURI('atom://tree-view').activate();
    //}

    function projectPaneAddHandlers(projectPane, projectName) {
      projectPane.onWillDestroy(() => {
        storeProjectPane(projectName);
        delete projectPanes[projectName];
      });

      projectPane.onDidMoveItem(_ => projectsWithChangedPane.add(projectName));
      projectPane.onDidAddItem(_ => projectsWithChangedPane.add(projectName));
      projectPane.onDidRemoveItem(({item}) => {
        projectsWithChangedPane.add(projectName);
        // if there is no item in activePane, focus tree-view;
        const activePane = atom.workspace.getCenter().getActivePane();
        if (activePane.getItems().length == 0) {
          atom.workspace.paneForURI('atom://tree-view').activate();
        }
      });

      projectPane.observeItems(item => {
        if (item instanceof require('atom').TextEditor) {
          item.onDidChangeCursorPosition(
            _ => projectsWithChangedPane.add(projectName)
          );

          const buffer = item.getBuffer();
          const bufferId = buffer.id;

          storeBuffer(buffer, projectName);

          const disposable1 = buffer.onDidStopChanging(
            () => changedBuffers.add([buffer, projectName])
          );
          // if saving imply changing, this is not necessary;
          const disposable2 = buffer.onDidSave(
            _ => changedBuffers.add([buffer, projectName])
          );

          const disposable3 = buffer.onDidDestroy(() => {
            // remove the file which stored the buffer state;
            const storePath = path.join(projectsDir, projectName, '.cache/atom-buffers', bufferId);
            //fs.unlink(storePath, err => { if (err) console.error(err); });
          });

          item.onDidDestroy(() => {
            disposable1.dispose();
            disposable2.dispose();
            disposable3.dispose();
          });
        }
      });
    }
    projectPaneAddHandlers(projectPane, projectName);
  })
}

class ProjectsList {
  constructor() {
    this.selectList = new SelectList({
      items: [],

      elementForItem: (item) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;
        li.appendChild(span);
        return li;
      },

      didConfirmSelection: (projectName) => {
        this.selectList.reset();
        this.modalPanel.hide();
        atom.project.setPaths([path.join(projectsDir, projectName)]);

        const projectPane = projectPanes[projectName];
        if (!projectPane) {
          restoreBuffers(projectName)
          .then(_ => openProjectPane(projectName));
        }
        // hide all panes;
        //atom.workspace.getCenter().getPanes().forEach(pane => {
        //  const view = atom.views.getView(pane);
        //  view.style.display = 'none';
        //});
        // show the selected project pane, and activate it;
        if (projectPane) {
          //const view = atom.views.getView(projectPane);
          //view.style.display = '';
          const activePane = atom.workspace.getCenter().getActivePane();
          activePane.parent.replaceChild(activePane, projectPane);
          projectPane.activate();
        }
      },

      didCancelSelection: () => {
        this.selectList.reset();
        this.modalPanel.hide();
        atom.workspace.getCenter().getActivePane().activate();
      }
    });

    this.modalPanel = atom.workspace.addModalPanel({ item: this.selectList, visible: false });
  }

  show() {
    fs.readdir(projectsDir, { withFileTypes: true }, (err, dirents) => {
      if (err) { alert(err.message); return }

      const projectNames = dirents
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
      const currentProjectPath = atom.project.getPaths()[0];
      const currentProjectName = currentProjectPath ?
        path.relative(projectsDir, currentProjectPath) : null;

      this.selectList.update({
        items: projectNames,
        initialSelectionIndex:
          currentProjectName ? projectNames.indexOf(currentProjectName) : 0
      });

      this.modalPanel.show();
      this.selectList.focus();
    });
  }

  createNewProject() {}
}

const projectsList = new ProjectsList();
if (!atom.project.getPaths()[0]) projectsList.show();

atom.commands.add('atom-workspace', {
  'comshell:projects-list': () => {
    if (projectsList.modalPanel.isVisible()) {
      projectsList.selectList.props.didCancelSelection();
    } else {
      projectsList.show();
    }
  }
});

// to define keybindings for projectsList, add a class:
projectsList.selectList.element.classList.add('projects-list');

require('./status-bar');
require('./tree-view');

atom.commands.add('atom-text-editor', 'comshell:space', () => {
})
atom.commands.add('atom-text-editor', 'comshell:comma', () => {
})

// "https://github.com/alexfu/atom-replace-pane"

// "https://github.com/sh8/web-lookup/blob/master/lib/web-lookup.coffee"
//   "https://github.com/sh8/web-lookup/blob/master/lib/web-lookup-view.coffee"
// "https://github.com/skandasoft/browser-plus/blob/master/package.json"
//   "https://github.com/skandasoft/browser-plus/tree/master/lib"
// "https://github.com/skandasoft/browser-plus-open-new-window"
// "https://github.com/nju33/atom-pane-browser"
// "https://github.com/sean-codes/atom-browser"
// "https://atom.io/packages/Navigate"

// "https://atom.io/packages/simple-git"
// "https://atom.io/packages/git-plus"

// "https://github.com/atom/settings-view/blob/master/lib/package-manager.coffee"

// modal key bindings:
// "https://github.com/Kesin11/atom-vim-like-tab/#keymap"

// "https://atom.io/packages/structure-view"

// "https://atom.io/packages/quick-file-browser"
// "https://atom.io/packages/atom-video"

// "https://atom.io/packages/plain-simple"
// "https://medium.com/hacking-atom/tweak-your-atom-s-init-script-without-reloading-atom-with-a-declarative-module-8b1c0f208663"

/* importing from a package (probably a bad idea)
atom.packages.activatePackage("tree-view").then((pkg) => {
  if (pkg && pkg.mainModule && pkg.mainModule.treeView) {
    treeView = pkg.mainModule.treeView;

    if (!treeView.roots[0] || !treeView.roots[0].directory) {
      atom.project.onDidChangePaths(() => {});
      return;
    }
  }},

  (reason) => {
    atom.notifications.addWarning('failure', {
      description: reason.message
    });
  }
);
*/
