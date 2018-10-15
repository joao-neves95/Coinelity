/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

'use strict';
require( 'dotenv' ).config()
const app = require( 'express' )();
const io = require( 'socket.io' )( app );
const cors = require( 'cors' );
const corsOptions = require( './middleware/corsOptions' );
const logger = require( 'morgan' );
const RequestControl = require( './middleware/requestControl' );
const requestControl = new RequestControl();
const apiRoute = require( './routes/index' );
const commonApiResponses = require( './routes/commonApiResponses' );
const ApiResponseModel = require( './models/apiResponseModel' );

const PORT = 3003;

app.use( cors( corsOptions ) );
app.use( logger( 'combined' ) );

app.use( function ( req, res, next ) {
  res.setHeader( 'X-Powered-By', 'anonymous' );

  // TODO: Add the user to the request.
  req.theUser = '';
  
} );

const chat = io
  .of( '/chat' )
  .use( function ( socket, next ) {

    const req = socket.request;

    requestControl.control( req, console.log, ( result ) => {

      switch ( result ) {
        case RequestControlResult.AuthFailed:
          return commonApiResponses.notAuthorized();

        case RequestControlResult.Blacklisted:
          return commonApiResponses.blacklisted();

        case RequestControlResult.Accepted:
          return next();
      }

    } );

    socket.to( socket.id ).emit('')
    
    next();
  } )
  .on( 'connection', function ( socket ) {
    socket.emit( 'Hello-World', { hello: 'world' } );

    socket.on( 'client event', function ( data ) {
      console.log( data );
    } );

    socket.on( 'disconnect', function () {
      io.emit( 'user disconnected' );
    } );
} );

app.use( '/api', apiRoute );

app.use( '*', ( req, res ) => {
  return res.status( 404 ).send( JSON.stringify( new ApiResponseModel( 404, 'Not Found', ['Resource not found.'] ) ) );
} );

app.listen( PORT, () => {
  console.info( 'The server is listening in port ' + PORT );
} );
