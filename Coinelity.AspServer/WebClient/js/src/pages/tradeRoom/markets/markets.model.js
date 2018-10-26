/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let marketsModel = null;

class MarketsModel extends ModelBase {
  constructor() {
    if ( marketsModel )
      throw DevErrors.singleIntance( 'MarketsModel' );

    super( '', '', '', '' );

    this.symbols = new List( 'string' );
    this.cardUpdateInterval = null;

    marketsModel = this;
    Object.seal( marketsModel );
  }

  get lastPriceRoute() { return 'last-price'; }
  get changeRoute() { return 'change'; }

  getLastCoinPrice( symbol, Callback ) {
    ExchangeClient._.getLastPrice( 'KRAKEN', symbol, ( lastPrice ) => {
      return Callback( lastPrice );
    } );
  }

  /**
   * 
   * @param { string } symbol
   * 
   * @param { Function } Callback ChangeModel
   */
  getCoinChange( symbol, Callback ) {
    ExchangeClient._.getChange( 'KRAKEN', symbol, ( changeModel ) => {
      return Callback( changeModel );
    } );
  }
}
