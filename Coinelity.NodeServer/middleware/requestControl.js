/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

'user strict';
const Utils = require( '../middleware/utils' );
const RequestControlModel = require( '../models/requestControlModel' );
const IpControlModel = require( '../models/ipControlModel' );
const ResponseStatusCode = require( '../enums/responseStatusCode' );

class RequestControl extends RequestControlModel {
  constructor( authHandler ) {

    const config = {
      rateLimitSecond: 2, // getter
      rateLimitMinute: 120 , // getter
      totalReqCountUntilAuthCheck: 60 * 10,
      maxRateLimitFails: 3,
      delControlMinutesOffset: 60 * 12, // (minutes) getter
      delBlacklistedMinutesOffset: process.env.BLACKLISTED_TIME_MINUTES, // (minutes) getter
      authMinutesOffset: 5 // (minutes) getter
    };

    super( config );
    this.authHandler = authHandler;
  }

  /**
   * The user get's blacklisted for (x) minutes if he reaches the rate limit or fails authentication.
   * 
   * @param { Request } request The ip of the request.
   * 
   * @returns { Promise<ResponseStatusCode> }
   */
  control( request ) {
    return new Promise( async ( resolve, reject ) => {
      this.____dumpIfNeeded();

      if ( this.backlisted.includes( ip ) )
        return resolve( false );

      const ip = Utils.getIpFromRequest( request );
      const thisRequestTimestamp = Utils.getUTCTimestamp();
      let ipIsControlled = false;
      /** @type { IpControlModel } */
      let thisIpControl;
      /** @type { number } */
      let thisIpControlIdx;

      for ( let i = 0; i < this.ipControl.length; ++i ) {
        if ( this.ipControl[i].userIp === ip ) {
          thisIpControl = this.ipControl[i];
          thisIpControlIdx = i;
          ipIsControlled = true;
        }
      }

      // New IP to control.
      if ( !ipIsControlled ) {
        // Add an offset to the lastAuthTimestamp to request authentication.
        thisIpControl = new IpControlModel(
          ip,
          request.theUser,
          1, 1, 1,
          thisRequestTimestamp,
          thisRequestTimestamp - Utils.minutesToMiliseconds( this.authMinutesOffset + 1 )
        );
        
        this.ipControl.push( thisIpControl );
      }

      // Authentication.
      if ( thisRequestTimestamp - thisIpControl.lastAuthTimestamp >= this.authMinutesOffset ) {
        const result = await this._authenticate( JWTToken );

        if ( result === ResponseStatusCode.Unauthorized ) {
          this.blacklisted.push( thisIpControl.userIp );
          return resolve( result );
        }
      }

      // Request control per second.
      if ( thisRequestTimestamp - thisIpControl.lastRequest <= 1000 ) {
        if ( thisIpControl.requestsNumSecond >= this.rateLimitSecond &&
             this._blacklisting( thisIpControl )
           ) {
          return resolve( ResponseStatusCode.Blacklisted );
        }

      } else {
        thisIpControl.requestsNumSecond = 0;
      }

      // Request control per minute.
      if ( thisRequestTimestamp - this.lastRequest <= 1000 * 60 ) {
        if ( thisIpControl.requestsNumMinute >= this.rateLimitMinute &&
             this._blacklisting( thisIpControl )
           ) {
          return resolve( ResponseStatusCode.Blacklisted );
        }

      } else {
        thisIpControl.requestsNumMinute = 0;
      }

      thisIpControl.lastRequest = thisRequestTimestamp;
      ++thisIpControl.requestsNumSecond;
      ++thisIpControl.requestsNumMinute;
      ++thisIpControl.totalRequests;
      this.ipControl[thisIpControlIdx] = thisIpControl;
      return resolve( ResponseStatusCode.Authorized );
    } );
  }

  _blacklisting( thisIpControl ) {
    ++thisIpControl.rateLimitFails;

    if ( thisIpControl.rateLimitFails >= this.maxRateLimitFails ) {
      this.blacklisted.push( thisIpControl.userIp );
      return true;
    }

    return false;
  }

  /**
   * @returns { Promise<ResponseStatusCode> }
   */
  _authenticate( JWTToken ) {
    return new Promise( async ( resolve, reject ) => {
      return resolve( await this.authHandler( JWTToken ) );
    } );
  }

  ____dumpIfNeeded() {
    // IpControl deletion:
    if ( Utils.milisecondsToMinutes( thisRequestTimestamp - this.lastControlDelTimstamp ) >= this.delControlMinutesOffset ) {
      this.ipControl = [];
    }

    // Blacklisted deletion:
    if ( Utils.milisecondsToMinutes( thisRequestTimestamp - this.lastBacklistedDelTimestamp ) >= this.deleteBlacklistedMinutesOffset ) {
      this.backlisted = [];
    }
  }
}

module.exports = RequestControl;

