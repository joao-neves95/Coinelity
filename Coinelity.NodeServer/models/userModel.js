'use strict';

class UserModel {
  constructor( ip, JWTToken ) {
    this.ip = ip;
    this.JWTToken = JWTToken;
  }
}

module.exports = UserModel;
