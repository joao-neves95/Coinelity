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
