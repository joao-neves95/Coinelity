const ccxt = require( 'ccxt' );

//  publicGetOHLC() or fetchOHLCV()
// publicGetSpread()

let exchangeClient = null;

class ExchangeClient {
  constructor() {
    if ( exchangeClient )
      return exchangeClient;

    this.kraken = new ccxt.kraken( { rateLimit: true } );

    exchangeClient = this;
    Object.seal( exchangeClient );
  }


  // TODO: Return a promise instead of invoking a callback.

  /** @returns { ExchangeClient } */
  static get _() { return exchangeClient; }

  /** @returns { string[] } */
  getAllPairs(Callback) {
    ( async () => {
      // console.debug( this.kraken );
      await this.kraken.loadMarkets();

      return Callback( this.kraken.symbols );
    } ) ();
  }

  getLastTicker( pair, Callback ) {
    ( async () => {
      // console.debug( this.kraken );
      // await this.kraken.loadMarkets();
      const ticker = await this.kraken.fetchTicker( pair );

      return Callback( ticker );
    } )();
  }

  getLastOHLCV( pair, timeframe, Callback ) {
    ( async () => {
      // console.debug( this.kraken );
      // await this.kraken.loadMarkets();
      const ticker = await this.kraken.fetchOHLCV( pair, timeframe );

      return Callback( ticker );
    } )();
  }
}

module.exports = ExchangeClient;
