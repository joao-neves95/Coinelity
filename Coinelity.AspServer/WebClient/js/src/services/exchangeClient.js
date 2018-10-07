/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

const exchangeClientUtils = Object.freeze( {
  calcPriceChange: ( lastPrice, openDayPrice ) => {
    return lastPrice - openDayPrice;
  },

  calcPercentChange: ( priceChange, openDayPrice ) => {
    return ( priceChange / openDayPrice ) * 100;
  }
} );

let exchangeClient = null;

class ExchangeClient {
  constructor() {
    if ( exchangeClient )
      return exchangeClient;

    this.kraken = new ccxt.kraken( { rateLimit: true } );

    if ( !this.kraken.has['CORS'] )
      this.kraken.proxy = 'https://cors-escape.herokuapp.com/';

    exchangeClient = this;
    Object.seal( exchangeClient );
  }

  /** @returns { ExchangeClient } */
  static get _() { return exchangeClient; }

  /**
   * 
   * @param { string } name
   * 
   */
  getExchangeObject( name ) {
    switch ( name.toUpperCase() ) {
      case 'KRAKEN':
        return this.kraken;
      default:
        return null;
    }
  }

  getRateLimit( exchangeName ) {
    return this.getExchangeObject( exchangeName ).rateLimit;
  }

  /** @returns { string[] } */
  getAllPairs( exchangeName, Callback ) {
    ( async () => {
      await this.getExchangeObject( exchangeName ).loadMarkets();

      return Callback( this.kraken.symbols );
    } )();
  }

  /**
   * 
   * Returns <string> (example):
    {
      'symbol':        string symbol of the market ('BTC/USD', 'ETH/BTC', ...)
      'info':        { the original non-modified unparsed reply from exchange API },
      'timestamp':     int (64-bit Unix Timestamp in milliseconds since Epoch 1 Jan 1970)
      'datetime':      ISO8601 datetime string with milliseconds
      'high':          float, // highest price
      'low':           float, // lowest price
      'bid':           float, // current best bid (buy) price
      'bidVolume':     float, // current best bid (buy) amount (may be missing or undefined)
      'ask':           float, // current best ask (sell) price
      'askVolume':     float, // current best ask (sell) amount (may be missing or undefined)
      'vwap':          float, // volume weighed average price
      'open':          float, // opening price
      'close':         float, // price of last trade (closing price for current period)
      'last':          float, // same as `close`, duplicated for convenience
      'previousClose': float, // closing price for the previous period
      'change':        float, // absolute change, `last - open`
      'percentage':    float, // relative change, `(change/open) * 100`
      'average':       float, // average price, `(last + open) / 2`
      'baseVolume':    float, // volume of base currency traded for last 24 hours
      'quoteVolume':   float, // volume of quote currency traded for last 24 hours
     }
   * @param { string } symbol
   * @param { Function } Callback
   */
  getLastTicker( exchangeName, symbol, Callback ) {
    ( async () => {
      let ticker = undefined;

      try {
        ticker = await this.getExchangeObject( exchangeName ).fetchTicker( symbol );

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      return Callback( ticker );
    } )();
  }

  /**
   * Returns <string> (example):
     [
          1504541580000, // UTC timestamp in milliseconds, integer
          4235.4,        // (O)pen price, float
          4240.6,        // (H)ighest price, float
          4230.0,        // (L)owest price, float
          4230.7,        // (C)losing price, float
          37.72941911    // (V)olume (in terms of the base currency), float
     ]
   * 
   * @param { string } exchangeName The exchange name.
   * @param { string } symbol The asset symbol.
   * @param { string } timeframe 1m, 5m, 15m, 30m, 1h, 4h, 1d, 7d, 1M.
   * @param { Function } Callback Receives a <string> representation of the last OHLC candle.
   */
  getLastOHLCV( exchangeName, symbol, timeframe, Callback ) {
    ( async () => {
      let OHLCV = undefined;

      try {
        OHLCV = await this.getExchangeObject( exchangeName ).fetchOHLCV( symbol, timeframe, null, 10 );

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      return Callback( OHLCV[OHLCV.length - 1] );
    } )();
  }

  /**
   * Returns <string[]> (example):
   * [
         [
              1504541580000, // UTC timestamp in milliseconds, integer
              4235.4,        // (O)pen price, float
              4240.6,        // (H)ighest price, float
              4230.0,        // (L)owest price, float
              4230.7,        // (C)losing price, float
              37.72941911    // (V)olume (in terms of the base currency), float
         ]
     ]
   * 
   * @param { string } exchangeName The exchange name.
   * @param { string } symbol The asset symbol.
   * @param { string } timeframe 1m, 5m, 15m, 30m, 1h, 4h, 1d, 7d, 1M.
   * @param { Function } Callback Receives a <string[]> representation of the last OHLC candle.
   */
  getOHLCV( exchangeName, symbol, timeframe, Callback ) {
    ( async () => {
      let OHLCVArray = undefined;

      try {
        OHLCVArray = await this.getExchangeObject( exchangeName ).fetchOHLCV( symbol, timeframe );

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );

      }

      return Callback( OHLCVArray );
    } )();
  }

  /**
   * 
   * @param { string } symbol
   * @param { Function } Callback Called in the end of the execution. Receives a <string> representation of SpreadPricesModel.
   */
  getCurrentSpreadPrices( exchangeName, symbol, Callback ) {
    ( async () => {
      let orderBook = undefined;

      try {
        orderBook = await this.getExchangeObject( exchangeName ).fetchOrderBook( symbol, 4 );
      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      const bid = orderBook.bids.length > 0 ? orderBook.bids[0][0] : undefined;
      const ask = orderBook.asks.length > 0 ? orderBook.asks[0][0] : undefined;
      const spreadPriceDiff = bid && ask ? ask - bid : undefined;
      const spreadPercentDiff = bid && ask ? 100 * ( spreadPriceDiff / ask ) : undefined;

      return Callback( new SpreadPricesModel( bid, ask, spreadPriceDiff, spreadPercentDiff ) );
    } )();
  }

  getLastTrade( exchangeName, symbol, Callback ) {
    ( async () => {
      let trades = undefined;

      try {
        trades = await this.getExchangeObject( exchangeName ).fetchTrades( symbol, null, 10 );
        trades = trades[trades.length - 1];

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      return Callback( trades );
    } )();
  }

  getLastPrice( exchangeName, symbol, Callback ) {
    try {

      this.getLastTicker( exchangeName, symbol, ( ticker ) => {
        return Callback( ticker ? ticker.last : undefined );
      } );

    } catch ( e ) {
      console.error( `EXCEPTION: \n${e}` );
    }
  }

  getChange( exchangeName, symbol, Callback ) {
    try {
      this.getLastTicker( exchangeName, symbol, ( ticker ) => {
        if ( !ticker )
          return Callback( undefined );

        const priceChange = exchangeClientUtils.calcPriceChange( ticker.last, ticker.open );
        const percentChange = exchangeClientUtils.calcPercentChange( priceChange, ticker.open );

        return Callback( new ChangeModel( ticker.last, priceChange, percentChange ) );

      } );

    } catch ( e ) {
      console.error( `EXCEPTION: \n${e}` );
    }
  }

}


new ExchangeClient();
