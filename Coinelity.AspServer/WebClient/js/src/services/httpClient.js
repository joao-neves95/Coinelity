/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class HttpClient {
  constructor() {
    DevErrors.cantInstantiateStatic( 'HttpClient' );
  }

  // res.json()
  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param {any} url
   * @param {any} jwtAuth
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static get( url, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Get, url, body=null, jwtAuth )
      .then( res => { Callback( null, res ); } )
      .catch( err => { Callback( err, null ); } );
  }

  /**
   * Returns a Fetch Response object or an error.
   *
   * @param {any} url
   * @param {any} body
   * @param {any} jwtAuth
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static post( url, body, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Post, url, body, jwtAuth )
      .then( res => { Callback( null, res ); } )
      .catch( err => { Callback( err, null ); } );
  }

  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param {any} url
   * @param {any} body
   * @param {any} jwtAuth
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static put( url, body, jwtAuth = true, Callback ) {
    HttpClient.request( RequestType.Put, url, body, jwtAuth )
      .then( res => { Callback( null, res ); } )
      .catch( err => { Callback( err, null ); } );
  }

  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param {any} requestType
   * @param {any} url
   * @param {any} body
   * @param {any} jwtAuth
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static request( requestType, url, body = null, jwtAuth = true ) {
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

    ( async () => {
      const response =  await fetch( url, requestObject );

      return response;
      } )();
  }
}
