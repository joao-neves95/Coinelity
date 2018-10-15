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
