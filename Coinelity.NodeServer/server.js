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
require( 'dotenv' ).config()
const app = require( 'express' )();
const io = require( 'socket.io' )( app );
const cors = require( 'cors' );
const corsOptions = require( './middleware/corsOptions' );
const logger = require( 'morgan' );
const RequestControl = require( './middleware/requestControl' );
const requestControl = new RequestControl();
const Utils = require( './middleware/utils' );
const MongoClient = require( 'mongodb' ).MongoClient;
const apiRoute = require( './routes/index' );
const messageStore = require( './dataAccess/messageStore' );
const Message = require( './models/userMessage' );
const User = require( './models/userModel' );
const commonApiResponses = require( './routes/commonApiResponses' );
const ApiResponseModel = require( './models/apiResponseModel' );

const PORT = process.env.PORT || 3003;
// TODO: Add Helmet JS.
app.use( cors( corsOptions ) );
app.use( logger( 'combined' ) );

const dbClient = new MongoClient( MONGODB_URL );

dbClient.connect( (err) => {
  if ( err )
    console.error( err );

  app.use( function ( req, res, next ) {
    res.setHeader( 'X-Powered-By', 'anonymous' );
    req.user = new User( Utils.getIpFromRequest( req ), req.headers['Authorization'] );

    next();
  });

  const chat = io
    .of( '/chat' )
    .use( async ( socket, next ) => {

      // TODO: Test socket.request.headers
      socket.request.theUser = new User( Utils.getIpFromRequest( socket.request ), socket.request.headers['Authorization'] );
      const req = socket.request;

      const result = await requestControl.control( req );

      switch ( result ) {
        case RequestControlResult.AuthFailed:
          return socket.to( socket.client.id ).emit('request-error', commonApiResponses.notAuthorized() );

        case RequestControlResult.Blacklisted:
          return socket.to( socket.client.id ).emit('request-error', commonApiResponses.blacklisted() );

        case RequestControlResult.Accepted:
          socket.db = req.dbClient.db( process.env.MONGODB_NAME );
          return next();
      }

    } )
    .on( 'GENERAL_connection', ( socket ) => {
      socket.join( 'GENERAL' );
      socket.to( 'GENERAL' ).emit( 'user-connection', { hello: 'world' } );

      socket.on( 'client event', ( data ) => {
        console.log( data );
      } );

      socket.on( 'client-message', ( data ) => {
        messageStore.insert( socket.db, new Message( data, '' ) );
        console.log( "Broadcast GENERAL Message: ", data );
        socket.to( 'GENERAL' ).emit( 'server-message', data )
      } );

      socket.on( 'GENERAL_disconnect', () => {
        socket.leave( 'GENERAL' );
        socket.to( 'GENERAL' ).emit( 'user-disconnected' );
      } );
    } )
    .on( 'BTC_connection', ( socket ) => {
      socket.join( 'BTC' );
      socket.to( 'BTC' ).emit( 'user-connection', { hello: 'world' } );
      
      socket.on( 'client-message', ( data ) => {
        console.log( "Broadcast GENERAL Message: ", data );
        socket.to( 'BTC' ).emit( 'server-message', data );
      } );

      socket.on( 'BTC_disconnect', () => {
        socket.leave( 'BTC' );
        io.to( 'BTC' ).emit( 'user-disconnected' );
      } );
    });

  app.use( '/api', apiRoute );

  app.use( '*', ( req, res ) => {
    return res.status( 404 ).send( commonApiResponses.notFound() );
  } );

  app.listen( PORT, () => {
    console.info( 'The server is listening in port ' + PORT );
  } );

  dbClient.close();
} );

