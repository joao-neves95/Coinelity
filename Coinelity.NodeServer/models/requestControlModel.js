'use strict';

class RequestControlModel {
  constructor( config ) {
    this.rateLimitSecond = config.rateLimitSecond;
    this.rateLimitMinute = config.rateLimitMinute;
    this.totalReqCountUntilAuthCheck = config.totalReqCountUntilAuthCheck;
    this.timeUntilDeleteControl = config.timeUntilDeleteControl;
    this.timeUntilDeleteBlacklisted = config.timeUntilDeleteBlacklisted;
    this.minsSinceLastControlDel = 0; // getter/setter
    this.minsSinceLastBacklistedDel = 0; // getter/setter
    this.ipControl = [];
    this.backlisted = [];
  }
}

module.exports = RequestControlModel;
