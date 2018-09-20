class ErrorHandler {
  constructor() {
    DevErrors.cantInstantiateStatic( 'ErrorHandler' );
  }

  /**
   * 
   * @param { Response } res Fetch Response object.
   */
  static requestErrors( res ) {
    if ( res.status === 400 ) {
      // TODO: Handle error.
      // Take error from Response object and show notification.
    } else if ( res.status === 500 ) {
      // TODO: Handle error.
      // Show notification of something like "There was an error.".
    }
  }
}
