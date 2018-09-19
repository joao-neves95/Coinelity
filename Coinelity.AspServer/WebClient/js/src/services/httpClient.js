class HttpClient {
  constructor() {
    DevErrors.cantInstantiateStatic( 'HttpClient' );
  }

  // res.json()

  static get( url, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Get, url, jwtAuth, ( err, res ) => {
      Callback( err, res );
    } );
  }

  static post( url, body, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Post, url, jwtAuth, ( err, res ) => {
      Callback( err, res );
    } );
  }

  static put( url, body, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Put, url, body, jwtAuth, ( err, res ) => {
      Callback( err, res );
    } );
  }

  static request( requestType, url, body = null, jwtAuth = true, Callback ) {
    let requestObject = {
      method: requestType,
      headers: new Headers()
    };

    if ( jwtAuth )
      requestObject.headers['Authorization'] = 'Bearer ' + localStorage.getItem( AUTH_TOKEN_ID );

    if ( requestType === RequestType.Post || requestType === RequestType.Put ) {
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
