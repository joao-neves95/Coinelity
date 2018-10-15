/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

'user strict';
const RequestControlModel = require( '../models/requestControlModel' );
const IpControlModel = require( '../models/ipControlModel' );

class RequestControl extends RequestControlModel {
  constructor() {

    const config = {
      rateLimitSecond: 1, // getter
      rateLimitMinute: 60, // getter
      totalReqCountUntilAuthCheck: 60 * 10,
      timeUntilDeleteControl: 60 + 30, // (minutes) getter
      timeUntilDeleteBlacklisted: 60 * 24 * 2 // (minutes) getter
    };

    super( config );
  }

  /**
   * 
   * @param { string } ip The ip of the request.
   * @param { Function } next Receives a <boolean> determining if the request passed or not.
   */
  controlRequest( ip, next ) {
    if ( this.backlisted.includes( ip ) )
      next( false );

    let ipIsControlled = false;

    for ( let i = 0; i < this.ipControl.length; ++i ) {
      if ( this.ipControl.userIp === ip ) {
        ipIsControlled = true;
        //
      }
    }

    if ( !ipIsControlled ) {
      this.ipControl.push( new IpControlModel( ip, 1, 1, 1, Date.UTC( new Date() ) ) );
      next( true );
    }
  }
}

module.exports = RequestControl;
