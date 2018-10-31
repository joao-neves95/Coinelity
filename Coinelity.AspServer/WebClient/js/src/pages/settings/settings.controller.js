/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let settingsController = null;

/**
 * The Settings page controller.
 */
class SettingsController extends ControllerBase {
  constructor() {
    if ( settingsController )
      throw DevErrors.singleIntance( 'SettingsController' );

    super(
      new SettingsModel(),
      new SettingsView()
    );

    settingsController = this;
    Object.freeze( settingsController );
  }

  setEventListeners() {
    DOM.on( 'click', this.view.changePasswordButton, ( e ) => {
      e.preventDefault();

      if ( this.view.newPassInput.value !== this.view.checkNewPassInput.value ) {
        // TODO: Send notification.
        return false;
      }

      const newChangePasswordDTO = this.view.getChangePasswordInputDTO();

      // Update password (API connection - confirm current password).
      this.model.changePassword( newChangePasswordDTO );
    } );
  }

  onSetActive() {
    this.setEventListeners();
  }
}
