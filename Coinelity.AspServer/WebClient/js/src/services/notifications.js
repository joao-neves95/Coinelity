// SweetAlert2
// https://github.com/sweetalert2/sweetalert2

class Notifications {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'Notifications' );
  }

  static successToast( title, description = '' ) {
    swall( { toast: true, timer: 5000, title: title } );
  }

  static successToastAndIcon( title, description = '' ) {
    swall( { type: 'success', timer: 5000, title: title } );
  }

  static successPopUp( title, description = '' ) {
    swall();
  }

  static successPopUpAndIcon( title, description = '' ) {
    swall();
  }

  static infoToast( title, description = '' ) {
    swall();
  }

  static infoToastAndIcon( title, description = '' ) {
    swall();
  }

  static infoPopUp( title, description = '' ) {
    swall();
  }

  static infoPopUpAndIcon( title, description = '' ) {
    swall();
  }

  static errorToast( title, description = '' ) {
    swall();
  }

  static errorToastAndIcon( title, description = '' ) {
    swall();
  }

  static errorPopUp( title, description = '' ) {
    swall();
  }

  static errorPopUpAndIcon( title, description = '' ) {
    swall();
  }
}
