/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class SettingsController extends ControllerBase {
  constructor() {
    super(
      new SettingsModel(),
      new SettingsView()
    );
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
