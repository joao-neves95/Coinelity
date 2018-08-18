let settingsModel;

class SettingsModel extends ModelBase {
  constructor() {
    if ( settingsModel )
      throw new Error( 'There can only be one instance of SettingsModel.' );

    super( NavItemID.Settings, NavbarItemType.Page, 'Settings', 'public/img/settings-icon-white.svg' );

    settingsModel = this;
    Object.seal( settingsModel );
  }

  static get _() { return settingsModel; }
}
