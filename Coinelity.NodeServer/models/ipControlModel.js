'use strict';

class IpControlModel {
  constructor( userIp, requestsNumSecond, requestsNumMinute, totalRequests, lastRequest ) {
    this.userIp = userIp;
    this.requestsNumSecond = requestsNumSecond;
    this.requestsNumMinute = requestsNumMinute;
    this.totalRequests = totalRequests;
    this.lastRequest = lastRequest;
  }
}

module.exports = IpControlModel;
