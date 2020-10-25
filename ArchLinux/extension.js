function init() {
const main = imports.ui.main;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;

main.setThemeStylesheet(
  "/usr/local/share/gnome-shell/extensions/gnome-shell-improved/style.css");
main.loadTheme();

// hide notification banners;
{
  const bannerBin = main.messageTray._bannerBin;
  if (bannerBin) bannerBin.hide();
}

// move status_bar to the bottom;
{
  const panelBox = main.layoutManager.panelBox;
  function movePanelToBottom() {
    const monitor = main.layoutManager.primaryMonitor;
    const y = monitor.height - panelBox.height;
    panelBox.set_position(0, y);
  }
  main.layoutManager.connect("monitors-changed", movePanelToBottom);
  panelBox.connect("notify::height", movePanelToBottom);
  movePanelToBottom();
}

main.panel.statusArea.activities.container.connect("show", c => c.hide());
main.panel.statusArea.activities.container.hide();
main.panel.statusArea.appMenu.container.connect("show", c => c.hide());
main.panel.statusArea.appMenu.container.hide();
main.panel.statusArea.dateMenu.container.connect("show", c => c.hide());
main.panel.statusArea.dateMenu.container.hide();
main.panel.statusArea.aggregateMenu.container.connect("show", c => c.hide());
main.panel.statusArea.aggregateMenu.container.hide();

// right side of status_bar;
{
  const rightButton = new imports.ui.panelMenu.Button(0.0, null, true);
  main.panel.addToStatusArea("status_right", rightButton, 0, "right");
  const rightBox = new St.BoxLayout({ style_class: "panel-status-indicators-box" });
  rightButton.add_child(rightBox);

  const screencast = main.panel.statusArea.aggregateMenu._screencast;
  if (screencast && screencast._indicator) {
    screencast.indicators.remove_child(screencast._indicator);
    rightBox.add_child(screencast._indicator);
    screencast._sync();
  }
  /*
  // since screencast implementation is simple, an alternative method is:
  const screencastIcon = new St.Icon({ style_class: "system-status-icon" });
  rightBox.add_child(screencastIcon);
  screencastIcon.icon_name = "media-record-symbolic";
  screencastIcon.add_style_class_name("screencast-indicator");
  main.screencastService.connect("updated",
    () => screencastIcon.visible = main.screencastService.isRecording
  );
  */

  // install ArchLinux updates as scheduled;
  // a red indicator appears to notify the user that for system to update, it needs a reboot;

  const remoteAccess = main.panel.statusArea.aggregateMenu._remoteAccess;
  if (remoteAccess && remoteAccess._indicator) {
    remoteAccess._ensureControls();
    remoteAccess.indicators.remove_child(remoteAccess._indicator);
    rightBox.add_child(remoteAccess._indicator);
    remoteAccess._sync();
  }

  const network = main.panel.statusArea.aggregateMenu._network;
  if (network && network._primaryIndicator) {
    network.indicators.remove_child(network._primaryIndicator);
    rightBox.add_child(network._primaryIndicator);
    if (network._vpnIndicator) {
      network.indicators.remove_child(network._vpnIndicator);
      rightBox.add_child(network._vpnIndicator);
    }
  }

  // https://github.com/hedayaty/NetSpeed/blob/master/net_speed.js
  // https://github.com/hedayaty/NetSpeed/blob/master/net_speed_status_icon.js

  const rfkillIcon = new St.Icon({ style_class: "system-status-icon" });
  rightBox.add_child(rfkillIcon);
  rfkillIcon.icon_name = "network-wireless-disabled-symbolic";
  const rfkillManager = imports.ui.status.rfkill.getRfkillManager();
  rfkillIcon.visible = rfkillManager.airplaneMode;
  rfkillManager.connect("airplane-mode-changed",
    () => rfkillIcon.visible = rfkillManager.airplaneMode
  );

  const volume = main.panel.statusArea.aggregateMenu._volume;
  if (volume && volume._primaryIndicator) {
    volume.indicators.remove_child(volume._primaryIndicator);
    rightBox.add_child(volume._primaryIndicator);
    if (volume._inputIndicator) {
      volume.indicators.remove_child(volume._inputIndicator);
      rightBox.add_child(volume._inputIndicator);
      volume._inputIndicator.visible = true;
    }
  }

  const power = main.panel.statusArea.aggregateMenu._power;
  if (power && power._indicator) {
    power.indicators.remove_child(power._indicator);
    rightBox.add_child(power._indicator);
    if (power._percentageLabel) {
      power.indicators.remove_child(power._percentageLabel);
      rightBox.add_child(power._percentageLabel);
    }
    // over_write "_sync" method, to hide the power icon, if there's no battery;
    if (power._sync && power._proxy) {
      power._sync = function() {
        imports.ui.status.power.Indicator.prototype._sync.call(this);
        if (!this._proxy.IsPresent) this._indicator.hide();
      };
      power._sync();
    }
  }

  // https://github.com/Ory0n/Resource_Monitor/
  // https://github.com/corecoding/Vitals
  // https://github.com/paradoxxxzero/gnome-shell-system-monitor-applet

  const location = main.panel.statusArea.aggregateMenu._location;
  if (location && location._indicator) {
    location.indicators.remove_child(location._indicator);
    rightBox.add_child(location._indicator);
    location._syncIndicator();
  }

  const dateTimeLabel = new St.Label({ y_align: Clutter.ActorAlign.CENTER });
  rightBox.add_child(dateTimeLabel);
  const updateClock = () => {
    const now = imports.gi.GLib.DateTime.new_now_local();
    const nowFormated = now ? now.format("%F %a %p %I:%M") : "";
    // https://github.com/omid/Persian-Calendar-for-Gnome-Shell/blob/master/PersianCalendar%40oxygenws.com/PersianDate.js
    dateTimeLabel.set_text(nowFormated);
  };
  updateClock();
  const wallClock = main.panel.statusArea.dateMenu._clock;
  if (wallClock) wallClock.connect("notify::clock", updateClock);
}

// left side of status_bar;
{
  const leftButton = new imports.ui.panelMenu.Button(0.0, null, true);
  main.panel.addToStatusArea("status_left", leftButton, 0, "left");
  const leftBox = new St.BoxLayout({ style_class: "panel-status-indicators-box" });
  leftButton.add_child(leftBox);

  // https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/master/js/ui/altTab.js
  // https://gitlab.gnome.org/GNOME/gnome-shell-extensions/-/tree/master/extensions/window-list
  // https://github.com/c0ldplasma/gnome-shell-extension-taskbar
}

// overview layer
{
  const overview = main.overview;
  const viewSelector = overview.viewSelector;
  const windowManager = main.wm;

  const toggleOverview = () => {
    if (overview.isDummy) return;
    if (overview.visible) overview.hide();
    else viewSelector.showApps();
  }

  // toggle overview when toggling apps view;
  windowManager.removeKeybinding("toggle-application-view");
  windowManager.addKeybinding(
    "toggle-application-view",
    new imports.gi.Gio.Settings({ schema_id: imports.ui.windowManager.SHELL_KEYBINDINGS_SCHEMA }),
    Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
    Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
    toggleOverview
  );

  // toggle overview when clicking on an empty area on the panel;
  main.panel.connect("button-press-event", toggleOverview);

  // hide overview when pressing "alt-tab";
  windowManager.setCustomKeybindingHandler(
    "switch-applications",
    Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
    (display, win, binding) => {
      if (overview.visible) { overview.hide(); return; }
      windowManager._startSwitcher(display, win, binding);
    }
  );

  // close overview by pressing "esc" key only once;
  // based on _onStageKeyPress function from:
  //   https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/master/js/ui/viewSelector.js
  viewSelector._onStageKeyPress = function (actor, event) {
    if (main.modalCount > 1)
      return Clutter.EVENT_PROPAGATE;

    let symbol = event.get_key_symbol();

    if (symbol === Clutter.KEY_Escape) {
      if (this._searchActive)
        this.reset();
      else
        main.overview.hide();
      return Clutter.EVENT_STOP;
    } else if (this._shouldTriggerSearch(symbol)) {
        this.startSearch(event);
    } else if (!this._searchActive && !global.stage.key_focus) {
      if (symbol === Clutter.KEY_Tab || symbol === Clutter.KEY_Down) {
        this._activePage.navigate_focus(null, St.DirectionType.TAB_FORWARD, false);
        return Clutter.EVENT_STOP;
      } else if (symbol === Clutter.KEY_ISO_Left_Tab) {
        this._activePage.navigate_focus(null, St.DirectionType.TAB_BACKWARD, false);
        return Clutter.EVENT_STOP;
      }
    }
    return Clutter.EVENT_PROPAGATE;
  }

  // hide dash;
  overview.connect("showing", () => overview.dash.hide());
}
}
function enable() {}
function disable() {}
