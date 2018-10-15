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
