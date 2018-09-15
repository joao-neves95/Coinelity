class SettingsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'SettingsTemplates' );
  }

  //static theForm( content ) {
  //  return `
  //    <form>
  //    </form>
  //  `;
  //}

  static changePassword() {
    return `
      <form class="settings-form">
        <h3>Change Password</h3>
        <div class="grid-container fluid">
          <div class="grid-y">
            <label>Current Password
              <input type="password" id="curr-pass-input">
            </label>
            <label>New Password
              <input type="password" id="new-pass-input">
            </label>
            <label>Confirm New Password
              <input type="password" id="check-new-pass-input">
            </label>
          </div>
        </div>
        <a id="change-password-button" class="success button">Change Password</a>
      </form>
    `;
  }

  static maxFailedLogins() {
    throw DevErrors.notImplemented();
    // return ``;
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
