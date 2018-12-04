/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * Note: All methods are asynchronous.
 */
class HttpClient {
  constructor() {
    throw new Error( 'Can not instantiate the static classs HttpClient' );
  }

  /**
   * Awaitable (async/await) Fetch JSON object or an error.
   * 
   * @param { string } url
   * @param { boolean } jwtAuth
   * 
   * @return { Promise<JSON | Error> }
   */
  static get( url, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Get, url, null, jwtAuth )
        .then( res => resolve( res.json() ) )
        .catch( e => reject( e ) );
    } );
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
  static post( url, body, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Post, url, body, jwtAuth )
        .then( res => { resolve( res.json() ); } )
        .catch( err => { reject( err ); } );
    } );
  }

  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param {any} url
   * @param {any} body
   * @param {any} jwtAuth
   * 
   * @return { Promise<JSON | Error> }
   */
  static put( url, body, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Put, url, body, jwtAuth )
        .then( res => { resolve( res.json() ); } )
        .catch( err => { reject( err ); } );
    } );
  }

  static delete( url, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Delete, url, null, jwtAuth )
        .then( res => { resolve( res.json() ); } )
        .catch( err => { reject( err ); } );
    } );
  }

  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param { RequestType } requestType
   * @param { string } url
   * @param { any } body
   * @param { boolean } jwtAuth Whether or not to use JWT authentication (from localStorage).
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static request( requestType, url, body = null, jwtAuth = true, Callback ) {
    return new Promise( async ( resolve, reject ) => {

      let requestObject = {
        method: requestType,
        headers: {}
      };

      if ( jwtAuth )
        requestObject.headers['Authorization'] = 'Bearer ' + localStorage.getItem( AUTH_TOKEN_ID );

      if ( requestType === RequestType.Post || requestType === RequestType.Put ) {
        requestObject.body = !body ? '' : JSON.stringify( body );
        requestObject.headers['Content-Type'] = 'application/json;charset=utf-8';
      }

      await fetch( url, requestObject )
        //.then( res => { return res.json(); } )
        //.then( jsonData => { return Callback( null, jsonData ); } )
        .then( res => { return resolve( res ); } )
        .catch( err => { return reject( err ); } );
    } );
  }
}
