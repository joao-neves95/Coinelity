/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class SettingsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'SettingsTemplates' );
  }

  // TODO: Change to an Accordion Menu.

  static theAccordion( content ) {
    return `
      <ul class="accordion" data-accordion data-allow-all-closed="true">
        ${ content }
      </ul>
    `;
  }

  static __accordionItem( tabId, title, content ) {
    return `
      <li class="accordion-item" data-accordion-item>
        <a href="#${tabId}" class="accordion-title"> ${title} </a>
        <div id="${tabId}" class="accordion-content" data-tab-content>
          ${ content }
        </div>
      </li>
    `;
  }

  static __form( gridOrientationType, gridContent, containerBottomContent = '' ) {
    return `
      <form class="cell small-12 medium-6 large-4">
        <div class="grid-container fluid">
          <div class="${ gridOrientationType }">
            ${ gridContent }
          </div>
          ${containerBottomContent}
        </div>
      </form>
    `;
  }

  static changePassword() {
    return SettingsTemplates.__accordionItem(
      'change-password',
      'Change Password',
      SettingsTemplates.__form( 
        GridOrientationType.Y,

        PageTemplates.inputElem( 'Current Password', 'password', 'curr-pass-input' ) +
        PageTemplates.inputElem( 'New Password', 'password', 'new-pass-input' ) +
        PageTemplates.inputElem( 'Confirm New Password', 'password', 'check-new-pass-input' ),

        PageTemplates.successButton( 'Change Password', 'change-password-button' )
    ) );
  }

  static maxLoginFailes() {
    return SettingsTemplates.__accordionItem(
      'max-login-fails',
      'Maximum Login Fails',
      SettingsTemplates.__form(
        GridOrientationType.Y,

        PageTemplates.inputNumElem( 'Maximum Login Fails', 'max-login-fails-input', 0, 100, 'Leave this blank to deactivate this control.' )
    ) );
  }

  static themeSelection() {
    return SettingsTemplates.__accordionItem(
      'theme-selection',
      'Change Color Theme',
      SettingsTemplates.__form(
        GridOrientationType.Y,

        PageTemplates.switchInput( 'theme-checkbox', 'Light Theme', 'Dark Theme' )
      )
    );
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
