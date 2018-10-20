/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

'use strict';

class UserModel {
  constructor( ip, JWTToken ) {
    this.ip = ip;
    this.JWTToken = JWTToken;
  }
}

module.exports = UserModel;
