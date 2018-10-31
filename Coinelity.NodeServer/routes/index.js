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
const router = require( 'express' ).Router();
const ExchangeClient = require( '../exchangeClient' );
new ExchangeClient();

// Default Query: ?exchange=kraken&symbol=<required>&timeframe=1m

router.use( ( req, res, next ) => {
  res.type( 'application/json' );

  if ( !req.query.exchange )
    req.query.exchange = 'KRAKEN';

  if ( !req.query.timeframe )
    req.query.timeframe = '1m';

  if ( !req.query.symbol )
    return ExchangeClient.handleHTTPResponse( res, null, 'The query string does not contain the required "symbol" parameter.' );

  req.symbol = ExchangeClient.resolveSymbolFromRequest( req.query.exchange, req.query.symbol );

  next();
} );

router.get( '/exchange-rate-limit', ( req, res ) => {
  const rateLimit = ExchangeClient._.getRateLimit( req.query.exchange );

  ExchangeClient.handleHTTPResponse( res, rateLimit );
} );

router.get( '/last-trade', ( req, res ) => {
} );

router.get( '/last-price', ( req, res ) => {
  ExchangeClient._.getLastPrice( req.query.exchange, req.symbol, ( data ) => {
    return ExchangeClient.handleHTTPResponse( res, data );
  } );
} );

router.get( '/change', ( req, res ) => {
  ExchangeClient._.getChange( req.query.exchange, req.symbol, ( changeModel ) => {
    ExchangeClient.handleHTTPResponse( res, changeModel );
  } );
});

router.get( '/current-spread-prices', ( req, res ) => {
  ExchangeClient._.getCurrentSpreadPrices( req.query.exchangeName, req.symbol, ( spreadPricesModel ) => {
    ExchangeClient.handleHTTPResponse( res, spreadPricesModel );
  } );
} );

router.get( '/last-OHLCV', ( req, res ) => {

  ExchangeClient._.getLastOHLCV( req.query.exchange, req.symbol, req.query.timeframe, ( data ) => {
    ExchangeClient.handleHTTPResponse( res, data );
  } );

} );

router.get( '/last-ticker', ( req, res ) => {
} );

module.exports = router;
