﻿/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

const ResponseStatusCode = Object.freeze( {
  Authorized: 200,
  Unauthorized: 401,
  Blacklisted: 429,
  Error: 500
} );

module.exports = ResponseStatusCode;