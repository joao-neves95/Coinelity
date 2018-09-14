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

  infoToast( title, description = '' ) {
    swall();
  }

  infoPopUp( title, description = '' ) {
    swall();
  }
}
