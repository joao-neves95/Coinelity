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

  notAuthorized: () => {
    return JSON.stringify(
      new ApiResponseModel(
        401,
        'Unauthorized',
        ['The authentication failed.']
      )
    );
  },

  blacklisted: () => {
    return JSON.stringify(
      new ApiResponseModel(
        429,
        'Too Many Requests',
        ['The user has sent too many requests. Rate limit has been reached. Ip blocked for ' +
          process.env.BLACKLISTED_TIME_MINUTES +
          ' minutes.'
        ]
      )
    );
  },

  notFound: () => {
    return JSON.stringify(
      new ApiResponseModel(
        404,
        'Not Found',
        ['Resource not found.']
      )
    );
  }

};
