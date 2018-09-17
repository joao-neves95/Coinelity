class HttpClient {
  constructor() {
    DevErrors.cantInstantiateStatic( 'HttpClient' );
  }

  static get( url, jwtAuth = true ) {
    HttpClient.request( RequestType.Get, url, jwtAuth, ( err, res ) => {
      if ( err )
        return console.debug( err );

      return console.debug( res.json() );
    } );
  }

  static post( url, body, jwtAuth = true ) {
    HttpClient.request( RequestType.Post, url, jwtAuth, ( err, res ) => {
      if ( err )
        return console.debug( err );

      return console.debug( res.json() );
    } );
  }

  static request( requestType, url, body = null, jwtAuth = true, Callback ) {
    let requestObject = {
      method: requestType,
      headers: new Headers()
    };

    if ( jwtAuth )
      requestObject.headers['Authorization'] = 'Bearer ' + localStorage.getItem( AUTH_TOKEN_ID );

    if ( requestType === RequestType.Post ) {
      requestObject.body = body;
      requestObject.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    fetch( url, requestObject )
      .then( ( res ) => {
        return Callback( null, res );
      } )
      .catch( ( err ) => {
        Callback( err, null );
      } );
  }
}
