const ResponseStatusCode = Object.freeze( {
  Authorized: 200,
  Unauthorized: 401,
  Blacklisted: 429,
  Error: 500
} );

module.exports = ResponseStatusCode;
