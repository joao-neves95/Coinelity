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
const Utils = require( '../middleware/utils' );

class RequestControl extends RequestControlModel {
  constructor() {

    const config = {
      rateLimitSecond: 1, // getter
      rateLimitMinute: 60 , // getter
      totalReqCountUntilAuthCheck: 60 * 10,
      delControlMinutesOffset: 60 * 12, // (minutes) getter
      delBlacklistedMinutesOffset: process.env.BLACKLISTED_TIME_MINUTES, // (minutes) getter
      authMinutesOffset: 5 // (minutes) getter
    };

    super( config );
  }

  /**
   * 
   * @param { string } ip The ip of the request.
   * @param { Function } next Receives a <boolean> determining if the request passed or not.
   * 
   * @returns { Function }
   */
  control( request, authFunction, next ) {
    this.____dumpIfNeeded();

    if ( this.backlisted.includes( ip ) )
      return next( false );

    const ip = Utils.getIpFromRequest( request );
    const thisResquestTimestamp = Utils.getUTCTimestamp(); 
    let thisIpCanPass = false;
    let ipIsControlled = false;
    /** @type { IpControlModel } */
    let thisIpControl;
    let thisIpControlIdx;

    for ( let i = 0; i < this.ipControl.length; ++i ) {
      if ( this.ipControl[i].userIp === ip ) {
        thisIpControl = this.ipControl[i];
        thisIpControlIdx = i;
        ipIsControlled = true;
      }
    }

    if ( !ipIsControlled ) {
      thisIpControl = new IpControlModel( ip, request.theUser, 1, 1, 1, thisResquestTimestamp, thisResquestTimestamp - Utils.minutesToMiliseconds( this.authMinutesOffset + 1 ) );
      this.ipControl.push( thisIpControl );
      thisIpCanPass = true;
    }

    if ( thisResquestTimestamp - thisIpControl.lastAuthTimestamp >= this.authMinutesOffset ) {
      const success = this._authenticate();
      if ( !success )
        return next( false );
    }

    // Request control per second.
    if ( thisResquestTimestamp - thisIpControl.lastRequest <= 1000 && thisIpCanPass ) {
      if ( thisIpControl.requestsNumSecond >= this.rateLimitSecond )
        return next( false );

    } else {
      if ( thisIpCanPass )
        thisIpControl.requestsNumSecond = 0;
    }

    // Request control per minute.
    if ( thisResquestTimestamp - this.lastRequest <= 1000 * 60 && thisIpCanPass ) {
      if ( thisIpControl.requestsNumMinute >= this.rateLimitMinute )
        return next( false );

    } else {
      if ( thisIpCanPass )
        thisIpControl.requestsNumMinute = 0;
    }

    thisIpControl.lastRequest = thisResquestTimestamp;
    ++thisIpControl.requestsNumSecond;
    ++thisIpControl.requestsNumMinute;
    ++thisIpControl.totalRequests;
    this.ipControl[thisIpControlIdx] = thisIpControl;

  }

  /**
   * @returns { boolean }
   */
  _authenticate() {
    return true;
  }

  ____dumpIfNeeded() {
    // IpControl deletion:
    if ( Utils.milisecondsToMinutes( thisResquestTimestamp - this.lastControlDelTimstamp ) >= this.delControlMinutesOffset ) {
      this.ipControl = [];
    }

    // Blacklisted deletion:
    if ( Utils.milisecondsToMinutes( thisResquestTimestamp - this.lastBacklistedDelTimestamp ) >= this.deleteBlacklistedMinutesOffset ) {
      this.backlisted = [];
    }
  }
}

module.exports = RequestControl;
