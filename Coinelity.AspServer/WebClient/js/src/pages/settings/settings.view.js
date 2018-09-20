/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let settingsView;

class SettingsView extends ViewBase {
  constructor() {
    if ( settingsView )
      throw DevErrors.singleIntance( 'SettingsView' );

    super(
      '<h1>Settings</h1>' +
      SettingsTemplates.theForm(
        SettingsTemplates.changePassword() +
        SettingsTemplates.maxLoginFailes()
      )
    );

    settingsView = this;
    Object.freeze( settingsView );
  }

  static get _() { return settingsView; }

  get changePasswordButton() { return document.getElementById( 'change-password-button' ); }
  get currPassInput() { return document.getElementById( 'curr-pass-input' ); }
  get newPassInput() { return document.getElementById( 'new-pass-input' ); }
  get checkNewPassInput() { return document.getElementById( 'check-new-pass-input' ); }

  /**
   * Returns a ChangePasswordDTO with the user input.
   * 
   * @returns { ChangePasswordDTO } ChangePasswordDTO
   */
  getChangePasswordInputDTO() {
    const currentPasswordInput = this.currPassInput.value;
    const newPasswordInput = this.newPassInput.value;

    return new ChangePasswordDTO( currentPasswordInput, newPasswordInput );
  }
}
