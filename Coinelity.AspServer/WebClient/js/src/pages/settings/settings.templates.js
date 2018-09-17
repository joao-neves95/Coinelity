class SettingsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'SettingsTemplates' );
  }

  static theForm( content ) {
    return `
      <form class="settings-form">
        ${ content }
      </form>
    `;
  }

  static formItem( title, gridOrientationType, content ) {
    return `
      <article class="input-item">
        <h3>${ title }</h3>
        <div class="grid-container fluid">
          <div class="${ gridOrientationType }">
            ${ content }
          </div>
        </div>
      </article>
      `;
  }

  static changePassword() {
    return SettingsTemplates.formItem( 
      'Change Password',
      GridOrientationType.Y,
      PageTemplates.inputElem( 'Current Password', 'password', 'curr-pass-input' ) +
      PageTemplates.inputElem( 'New Password', 'password', 'new-pass-input' ) +
      PageTemplates.inputElem( 'Confirm New Password', 'password', 'check-new-pass-input' ) +
      '<a id="change-password-button" class="success button">Change Password</a>'
    );
  }

  static maxFailedLogins() {
    return SettingsTemplates.formItem(
      'Maximum Failed Logins',
      GridOrientationType.Y,
      PageTemplates.inputElem( 'Maximum Login Fails', 'number', 'check-new-pass-input' )
    );
  }

  static themeSelection() {
    throw DevErrors.notImplemented();
    // return ``;
  }


  static notifications() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static connectSocialAccounts() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static timezoneSelection() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static twoFA() {
    throw DevErrors.notImplemented();
    // return ``;
  }
}
