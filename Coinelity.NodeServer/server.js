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
const Utils = require( './middleware/utils' );
const apiRoute = require( './routes/index' );
const User = require( './models/userModel' );
const commonApiResponses = require( './routes/commonApiResponses' );
const ApiResponseModel = require( './models/apiResponseModel' );

const PORT = 3003;

app.use( cors( corsOptions ) );
app.use( logger( 'combined' ) );

app.use( function ( req, res, next ) {
  res.setHeader( 'X-Powered-By', 'anonymous' );

  // TODO: Add the user to the request.
  req.theUser = new User( Utils.getIpFromRequest( req ), req.headers['Authorization'] );
  
} );

const chat = io
  .of( '/chat' )
  .use( async ( socket, next ) => {

    // TODO: Test socket.request.headers
    socket.request.theUser = new User( Utils.getIpFromRequest( socket.request ), socket.request.headers['Authorization'] );
    const req = socket.request;

    const result = await requestControl.control( req );

    switch ( result ) {
      case RequestControlResult.AuthFailed:
        return socket.to( socket.id ).emit('request-error', commonApiResponses.notAuthorized() );

      case RequestControlResult.Blacklisted:
        return socket.to( socket.id ).emit('request-error', commonApiResponses.blacklisted() );

      case RequestControlResult.Accepted:
        return next();
    }

    next();
  } )
  .on( 'connection', ( socket ) => {
    socket.emit( 'Hello-World', { hello: 'world' } );

    socket.on( 'client event', ( data ) => {
      console.log( data );
    } );

    socket.on( 'disconnect', () => {
      io.emit( 'user-disconnected' );
    } );
} );

app.use( '/api', apiRoute );

app.use( '*', ( req, res ) => {
  return res.status( 404 ).send( commonApiResponses.notFound() );
} );

app.listen( PORT, () => {
  console.info( 'The server is listening in port ' + PORT );
} );
