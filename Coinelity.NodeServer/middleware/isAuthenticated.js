/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

'use strict';
const http = require( 'http' );
const ResponseStatusCode = require( '../enums/responseStatusCode' );

const options = {
  hostname: 'localhost',
  port: 33620,
  path: '/authenticated',
  headers: {
    'Authorization': 'Bearer '
  }
};

/**
 * 
 * returns: Promise<ResponseStatusCode, Error | null>
 * 
 * Note: reject() is not fired.
 * 
 * @param { string } JWTToken
 * 
 * @returns { Promise<ResponseStatusCode, Error | null }
 */
module.exports = ( JWTToken ) => {
  options.headers['Authorization'] += JWTToken;

  return new Promise( ( resolve, reject ) => {
    http.get( options, ( res ) => {
      res.setEncoding( 'utf8' );

      res.on( 'error', ( e ) => {
        console.error( 'Error on the authorization request:', e );
        return resolve( ResponseStatusCode.Error, e );
      } );

      res.on( 'end', () => {
        if ( res.statusCode === 401 )
          return resolve( ResponseStatusCode.Unauthorized, null );

        if ( res.statusCode === 200 )
          return resolve( ResponseStatusCode.Unauthorized, null );

        else
          return resolve( ResponseStatusCode.Error, 'Unknown Error' );
      } );

    } );
  } );

};
