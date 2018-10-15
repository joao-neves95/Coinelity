'use strict';
const IpControlModel = require( './ipControlModel' );

class RequestControlModel {
  constructor( config ) {
    this.rateLimitSecond = config.rateLimitSecond; // getter
    this.rateLimitMinute = config.rateLimitMinute; // getter
    this.totalReqCountUntilAuthCheck = config.totalReqCountUntilAuthCheck; // getter
    this.delControlMinutesOffset = config.delControlMinutesOffset; // getter
    this.delBlacklistedMinutesOffset = config.delBlacklistedMinutesOffset; // getter
    this.authMinutesOffset = config.authMinutesOffset; // getter

    this.lastControlDelTimstamp = 0; // getter/setter
    this.lastBacklistedDelTimestamp = 0; // getter/setter

    /** @type { IpControlModel[] } */
    this.ipControl = [];
    /** @type { string[] } */
    this.backlisted = [];
  }
}

module.exports = RequestControlModel;
