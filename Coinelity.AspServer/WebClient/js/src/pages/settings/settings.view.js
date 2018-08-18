let settingsView;

class SettingsView extends ViewBase {
  constructor() {
    if ( settingsView )
      throw new Error( "There can only be one instance of SettingsView." );

    super( PageTemplates.page('<h1>Settinhs</h1>') );

    settingsView = this;
    Object.freeze( settingsView );
  }

  static get _() { return settingsView; }
}
