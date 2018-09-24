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
const PORT = 3003;
const apiRoute = require( './routes/index' );
const exchangesRoute = require( './routes/exchanges' );

const ExchangeClient = require( './exchangeClient' );
new ExchangeClient();

app.get( '/api', apiRoute );

//ExchangeClient._.getAllPairs( ( data ) => {
//  console.debug( data );
//} );

//ExchangeClient._.getLastTicker( 'BTC/EUR', ( data ) => {
//  console.debug( data );
//} );

ExchangeClient._.getLastOHLCV( 'BTC/EUR', '1m', ( data ) => {
  console.debug( data );
} );

app.listen( PORT, () => {
  console.info( 'The server is listening in port ' + PORT );
} );
