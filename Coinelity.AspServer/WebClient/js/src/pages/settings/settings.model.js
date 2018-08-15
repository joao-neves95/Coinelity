let settingsModel;

class SettingsModel extends ModelBase {
  constructor() {
    if ( settingsModel )
      throw new Error( "There can only be one instance of SettingsModel." );

    super( PageID.Settings, NavbarItemType.Page, 'Settings', 'public/img/settings-icon-white.svg' );

    settingsModel = this;
    Object.freeze( settingsModel );
  }

  static get _() { return settingsModel; }
}
