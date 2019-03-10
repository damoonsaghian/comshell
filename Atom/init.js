atom.enablePersistence = false;

// one pane per project
// only the active project's pane is displayed, others will be hidden;
// panes are stored/restored to/from a file in the ".cache" directory of each project;

const fs = require('fs');
const path = require('path');
const _ = require('/usr/lib/atom/node_modules/underscore');
const SelectList = require('/usr/lib/atom/node_modules/atom-select-list');

const projectsDir = path.join(require('os').homedir(), 'projects');
// if "~/projects/" directory does not exist, create it;
fs.stat(projectsDir, (err, stats) => {
  if (err) {
    fs.mkdir(projectsDir, (err) => {
      if (err) { alert(err.message); }
    });
  }
  else if (!stats.isDirectory()) {
    alert('"projects" directory can\'t be created, because there is a file with the same name');
  }
});

// { 'project name': { isChanged: bool, pane: Pane } }
const projectPanes = {};

class ProjectsList {
  constructor() {
    this.modalPanel = null;
    this.selectList = new SelectList({
      items: [],
      elementForItem: (item) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;
        li.appendChild(span);
        return li;
      },

      didConfirmSelection: (item) => {
        // here "item" is actually a project's name;
        this.selectList.reset();
        this.modalPanel.hide();
        atom.project.setPaths([path.join(projectsDir, item)]);

        if (!projectPanes[item] || projectPanes[item].isDestroyed()) {
          let newPane = atom.workspace.getCenter().getActivePane().splitRight();
          newPane.onWillDestroy(() => {
            atom.project.setPaths([]);
            this.show();
          });
          projectPanes[item] = newPane;
          restoreProjectPane(item);
        }

        // hide all panes, show only the selected project pane, and activate it;
        atom.workspace.getCenter().getPanes().forEach((pane) => {
          const view = atom.views.getView(pane);
          view.style.display = 'none';
        });
        const selectedProjectPane = projectPanes[item];
        const view = atom.views.getView(selectedProjectPane);
        view.style.display = '';
        selectedProjectPane.activate();
        // if there is no item in the pane, focus tree-view;
        if (selectedProjectPane.getItems().length == 0) {
          atom.commands.dispatch(atom.views.getView(atom.workspace.element), 'tree-view:toggle-focus');
        }

        this.selectList.update(
          { initialSelectionIndex: this.selectList.items.indexOf(item) }
        );
      },

      didCancelSelection: () => {
        this.selectList.reset();
        this.modalPanel.hide();
      }
    });
  }

  show() {
    fs.readdir(projectsDir, (err, fileNames) => {
      if (err) { alert(err.message); }
      else {
        let projectNames = fileNames.filter((fileName) =>
                                            fs.statSync(path.join(projectsDir, fileName)).isDirectory());
        this.selectList.update({ items: projectNames });
      }
    });

    if (!this.modalPanel) {
      this.modalPanel = atom.workspace.addModalPanel({ item: this.selectList});
    }
    this.modalPanel.show();
    this.selectList.focus(); 
  }

  createNewProject() {}
}

const projectsList = new ProjectsList();
projectsList.show();

atom.commands.add('atom-workspace', {
  'comshell:projects-list': () => projectsList.show()
});

// to define keybindings for projectsList, add a class:
projectsList.selectList.element.classList.add('projects-list');

function storeBuffer(buffer, projectName, relativePath) {
  const data = JSON.stringify(buffer.serialize());
  const cachePath = path.join(projectsDir, projectName, '.cache/buffers', relativePath);
  fs.createWriteStream(cachePath).write(data);
}

function restoreBuffer(buffer, projectName, relativePath) {
  const cachePath = path.join(projectsDir, projectName, '.cache/buffers', relativePath);
  fs.readFile(cachePath, (err, data) => {
    if (err) { return; }
    const serializedBuffer = JSON.parse(data);
    buffer.deserialize(serializedBuffer);
  });
}

function storeProjectPane(projectName) {
  const pane = projectPanes[projectName];
  if (pane.isDestroyed()) { return; }
  const data = JSON.stringify(pane.serialize());
  const cachePath = path.join(projectsDir, projectName, '.cache/open_editors');
  fs.createWriteStream(cachePath).write(data);
}

function restoreProjectPane(projectName) {
  const pane = projectPanes[projectName];
  if (pane.isDestroyed()) { return; }
  const cachePath = path.join(projectsDir, projectName, '.cache/open_editors');
  fs.readFile(cachePath, (err, data) => {
    if (err) { return; }
    const serializedPane = JSON.parse(data);
    pane.deserialize(serializedBuffer);
  });
}
/*
atom.workspace.getCenter().observeTextEditors((editor) => {
  const pathSegments = editor.getPath().relative(projectsDir, editorPath).split(path.sep);
  const projectName = pathSegments[0];
  const relativePath = path.join(...pathSegments.slice(1));
  const buffer = editor.getBuffer();
  restoreBuffer(buffer, projectName, relativePath);

  editor.onDidChangeCursorPosition((event) => {
    _.debounce(() => {
      if (event.textChanged) { storeBuffer(buffer, projectName, relativePath); }
      storeProjectPane(projectName);
    }, 30000)();
  });
});
*/
// https://atom.io/packages/tree-view-auto-collapse
// https://atom.io/packages/tree-view-scope-lines
// https://atom.io/packages/tree-lines
// https://github.com/hswolff/tree-view-extended/tree/master/lib
// https://atom.io/packages/tree-view-git-status
// https://atom.io/packages/file-icons

// https://github.com/alexfu/atom-replace-pane
// https://atom.io/packages/atom-clock
// https://github.com/atom/settings-view/blob/master/lib/package-manager.coffee
// https://atom.io/packages/structure-view
// https://atom.io/packages/simple-git
// https://atom.io/packages/git-plus

// https://medium.com/hacking-atom/tweak-your-atom-s-init-script-without-reloading-atom-with-a-declarative-module-8b1c0f208663

// 2 spaces -> enter
atom.commands.add('atom-text-editor', 'comshell:space', () => {
  const editor = atom.workspace.getActiveTextEditor(); // WRONG
  const cursor = editor.getLastCursor();

  if (cursor.hasPrecedingCharactersOnLine()) {
    editor.setText(' ');
  } else if (cursor.isAtBeginningOfLine()) {
    editor.setText('\n');
  } else {
    editor.backspace();
    editor.setText('\n');
  }
})

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
