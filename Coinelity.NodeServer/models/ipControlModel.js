/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

'use strict';

class IpControlModel {
  /**
   * 
   * @param { number } userIp
   * @param { number } requestsNumSecond
   * @param { number } requestsNumMinute
   * @param { number } totalRequests
   * @param { number } lastRequest UTC timestamp in miliseconds.
   */
  constructor( ip, user, requestsNumSecond, requestsNumMinute, totalRequests, lastRequest, lastAuthTimestamp ) {
    this.userIp = userIp;
    this.user = user;
    this.requestsNumSecond = requestsNumSecond;
    this.requestsNumMinute = requestsNumMinute;
    /** This gets deleted when there's a auth check */
    this.totalRequests = totalRequests;
    /** 
     * UTC timestamp in miliseconds.
     */
    this.lastRequest = lastRequest;
    this.lastAuthTimestamp = lastAuthTimestamp;
  }
}

module.exports = IpControlModel;
