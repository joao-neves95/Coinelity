class SettingsController extends ControllerBase {
  constructor() {
    super(
      new SettingsModel(),
      new SettingsView()
    );

    this.setEventListeners();
  }

  setEventListeners() {
    DOM.on( 'click', this.view.changePasswordButton, ( e ) => {
      e.preventDefault();

      if ( this.view.newPassInput.value !== this.view.checkNewPassInput.value ) {
        // TODO: Send notification.
        return false;
      }

      // Update password (API connection - confirm current password).
    } );
  }
}
