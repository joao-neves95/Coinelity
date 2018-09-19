/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

class SettingsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'SettingsTemplates' );
  }

  static theForm( content ) {
    return `
      <form class="settings-form grid-x">
        ${ content }
      </form>
    `;
  }

  static formItem( title, gridOrientationType, gridContent, containerBottomContent = '' ) {
    return `
      <article class="form-item cell small-12 medium-6 large-4">
        <h4>${ title }</h4>
        <div class="grid-container fluid">
          <div class="${ gridOrientationType } article-content">
            ${ gridContent }
          </div>
          ${containerBottomContent}
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
      PageTemplates.inputElem( 'Confirm New Password', 'password', 'check-new-pass-input' ),

      PageTemplates.successButton( 'Change Password', 'change-password-button' )
    );
  }

  static maxLoginFailes() {
    return SettingsTemplates.formItem(
      'Maximum Login Failes Allowed',
      GridOrientationType.Y,
      PageTemplates.inputNumElem( 'Maximum Login Fails', 'max-login-fails-input', 0, 100, 'Leave this blank to deactivate this control.' )
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
