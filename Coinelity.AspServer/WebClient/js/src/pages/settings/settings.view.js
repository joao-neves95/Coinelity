let settingsView;

class SettingsView extends ViewBase {
  constructor() {
    if ( settingsView )
      throw DevErrors.singleIntance( 'SettingsView' );

    super( '<h1>Settings</h1>' + SettingsTemplates.changePassword() );

    settingsView = this;
    Object.freeze( settingsView );
  }

  static get _() { return settingsView; }
}
