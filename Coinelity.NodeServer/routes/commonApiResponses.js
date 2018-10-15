'use strict';

module.exports = {
  notAuthorized: () => {
    return res.status( 401 ).send( JSON.stringify(
      new ApiResponseModel(
        401,
        'Unauthorized',
        ['The authentication failed.']
      )
    ) );
  },

  blacklisted: () => {
    return res.status( 429 ).send( JSON.stringify(
      new ApiResponseModel(
        429,
        'Too Many Requests',
        ['The user has sent too many requests. Rate limit has been reached. Ip blocked for ' +
          process.env.BLACKLISTED_TIME_MINUTES +
          ' minutes.'
        ]
      )
    ) );
  }
}
