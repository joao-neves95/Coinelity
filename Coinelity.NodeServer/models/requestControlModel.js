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
