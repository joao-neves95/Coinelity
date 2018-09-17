let settingsModel;

class SettingsModel extends ModelBase {
  constructor() {
    if ( settingsModel )
      throw DevErrors.singleIntance( 'SettingsModel' );

    super( NavItemID.Settings, NavbarItemType.Page, 'Settings', SETTINGS_ICON_URL );

    settingsModel = this;
    Object.seal( settingsModel );
  }

  static get _() { return settingsModel; }

  get baseUserApiUrl() { return BASE_API_URL + 'user/'; }

  changePassword( changePasswordDTO ) {
    HttpClient.post( this.baseUserApiUrl + 'set-password', changePasswordDTO );
  }

}
