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

module.exports = {
  /** Get UTC timestamp in miliseconds. */
  getUTCTimestamp: () => {
    return new Date().getTime();
  },

  getIpFromRequest: ( request ) => {
    return request.headers["x-forwarded-for"].split( ',', 1 ).join();
  },

  /**
   * Returns the floored minutes.
   * 
   * @param { number } miliseconds 
   */
  milisecondsToMinutes: ( miliseconds ) => {
    return Math.floor( miliseconds * 1.6667e-5 );
  },

  /** @param { number } miliseconds */
  minutesToMiliseconds: ( minutes ) => {
    return minutes * 60000;
  }
};
