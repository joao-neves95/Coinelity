/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class ApiResponseModel {
  /**
   * 
   * @param { number } statusCode Defaults to 200.
   * @param { string } statusMessage
   * @param {string[]} error
   * @param {string[]} data
   */
  constructor( statusCode = 200, statusMessage, error = [], data = [] ) {
    this.statusCode = code.toString();
    this.statusMessage = statusMessage;
    this.error = error;
    this.data = data;
  }
}

module.exports = ApiResponseModel;
