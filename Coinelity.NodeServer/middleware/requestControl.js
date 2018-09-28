/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

// Schema:
const requestControl =
{
  rateLimitSecond: 1, // getter
  rateLimitMinute: 60, // getter
  totalReqCountUntilAuthCheck: 60 * 10,
  timeUntilDeleteControl: 60 + 30, // (minutes) getter
  timeUntilDeleteBlacklisted: 60 * 24 * 2, // (minutes) getter
  minsSinceLastControlDel: 0, // getter/setter
  minsSinceLastBacklistedDel: 0, // getter/setter
  ipControl: [
    {
      userIp: '',
      requestsNumSecond: 0,
      requestsNumMinute: 0,
      totalRequests: 0,
      lastRequest: ''
    }
  ],
  backlisted: []
};
