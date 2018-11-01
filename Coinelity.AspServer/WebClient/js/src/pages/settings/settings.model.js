/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

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

  get baseUserApiUrl() { return BASE_API_URL + 'users/'; }

  changePassword( changePasswordDTO ) {
    HttpClient.put( this.baseUserApiUrl + 'password', changePasswordDTO, ( err, res ) => {
      if ( err )
        console.debug( err );

      console.debug( res );
    } );
  }

  setMaxLoginFailes( maxLoginFailes ) {
    HttpClient.put( this.baseUserApiUrl + 'max-login-fails',
      JSON.stringify( { "maxLoginFails": maxLoginFailes } ),
      ( err, res ) => {
        if ( err )
          console.debug( err );

        console.debug( res );
      });
  }

  /**
   * 
   * @param { ThemeType } themeType
   */
  changeTheme( themeType ) {
    localStorage.setItem( 'theme', themeType );
  }
}
