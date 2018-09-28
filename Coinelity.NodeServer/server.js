/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

'use strict';
const express = require( 'express' );
const app = express();
const cors = require( 'cors' );
const corsOptions = require( './middleware/corsOptions' );
const logger = require( 'morgan' );
const apiRoute = require( './routes/index' );
const ApiResponseModel = require( './models/apiResponseModel' );
const PORT = 3003;

app.use( cors( corsOptions ) );
app.use( logger( 'combined' ) );

app.use( function ( req, res, next ) {
  res.setHeader( 'X-Powered-By', 'anonymous' );

  next();
} );

app.use( '/api', apiRoute );

app.use( '*', ( req, res ) => {
  return res.status( 404 ).send( JSON.stringify( new ApiResponseModel( 404, 'Resource not found.', null ) ) );
} );

app.listen( PORT, () => {
  console.info( 'The server is listening in port ' + PORT );
} );
