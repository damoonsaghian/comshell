'use strict';

const main = imports.ui.main;
const st = imports.gi.St;
const clutter = imports.gi.Clutter;
const meta = imports.gi.Meta;

function init() {
  // maximize main windows;
  global.display.connect('window-created', (_display, win) => {
    if (win.can_maximize()) {
      win.maximize(meta.MaximizeFlags.HORIZONTAL | meta.MaximizeFlags.VERTICAL)
    } else {
      win.unmaximize(meta.MaximizeFlags.HORIZONTAL | meta.MaximizeFlags.VERTICAL)
    }
  });

  // remove rounded corners;
  main.panel._leftCorner.actor.set_style("-panel-corner-radius: 0px");
  main.panel._rightCorner.actor.set_style("-panel-corner-radius: 0px");

  // move notification banners to the bottom;
  main.messageTray._bannerBin.set_y_align(clutter.ActorAlign.END);

  // move status_bar to the bottom;
  {
    const panelBox = main.layoutManager.panelBox;
    function movePanelToBottom() {
      const monitor = main.layoutManager.primaryMonitor;
      if (this.rightPanelBarrier) {
        this.rightPanelBarrier.destroy();
      }
      this.rightPanelBarrier = new meta.Barrier({
        display: global.display,
        x1: monitor.width,
        x2: monitor.width,
        y1: monitor.height - panelBox.height,
        y2: monitor.height,
        directions: meta.BarrierDirection.NEGATIVE_Y
      });
      // TODO: find a way to replace the rightPanelBarrier instead of destroying
      main.layoutManager._rightPanelBarrier.destroy();
      panelBox.set_anchor_point(0, (-1)*(monitor.height - panelBox.height));
    }
    main.layoutManager.connect("monitors-changed", movePanelToBottom);
    panelBox.connect("notify::height", movePanelToBottom);
    movePanelToBottom();
  }

  main.panel.statusArea.activities.destroy();
  main.panel.statusArea.appMenu.destroy();
  main.panel.statusArea.dateMenu.destroy();
  main.panel.statusArea.dwellClick.destroy();
  main.panel.statusArea.a11y.destroy();
  main.panel.statusArea.keyboard.destroy();
  main.panel.statusArea.aggregateMenu.destroy();

  // right side of status_bar;
  {
    const rightBox = new st.BoxLayout({ style_class: 'panel-status-indicators-box' });
    main.panel.addToStatusArea("status_right", rightBox, 0, "right");

    const dateTimeIndicator = new st.Label({ y_align: clutter.ActorAlign.CENTER });
    const wallClock = new imports.gi.GnomeDesktop.WallClock();
    wallClock.connect('notify::clock', function() {
      const now = imports.gi.GLib.DateTime.new_now_local();
      const now_formated = now ? now.format("%F %a %p %I:%M") : "";
      dateTimeIndicator.set_text(now_formated);
    });
    rightBox.add_child(dateTimeIndicator);
  }

  // left side of status_bar;
  {
    const leftBox = new st.BoxLayout({ style_class: 'panel-status-indicators-box' });
    main.panel.addToStatusArea("status_left", leftBox, 0, "left");

    const status = imports.ui.status;
    leftBox.add_child(status.network.NMApplet());
    leftBox.add_child(status.thunderbolt.Indicator());
    leftBox.add_child(status.remoteAccess.RemoteAccessApplet());
    leftBox.add_child(status.screencast.Indicator());
    leftBox.add_child(status.brightness.Indicator());
    leftBox.add_child(status.volume.Indicator());

    // install ArchLinux updates as scheduled;
    // a red indicator appears to notify the user that for system to update, it needs a reboot;

    // an indicator which shows that there are some removable disks which are mounted;
  }

  {
    // little circles in the center of the panel, if there are multiple windows;
  }

  // "alt-f1": lock the session using "light-locker-command -l";
  main.wm.addKeybinding();
}

/*
https://wiki.gnome.org/Projects/GnomeShell/Extensions/Writing
https://github.com/omid/Persian-Calendar-for-Gnome-Shell
https://extensions.gnome.org/extension/1010/archlinux-updates-indicator/
https://gitlab.gnome.org/GNOME/gnome-shell-extensions/tree/master/extensions
https://github.com/hedayaty/NetSpeed
https://github.com/Ory0n/Resource_Monitor/
https://github.com/corecoding/Vitals
https://github.com/paradoxxxzero/gnome-shell-system-monitor-applet
https://extensions.gnome.org/extension/1509/drop-down-terminal-x/
https://extensions.gnome.org/extension/442/drop-down-terminal/
*/
