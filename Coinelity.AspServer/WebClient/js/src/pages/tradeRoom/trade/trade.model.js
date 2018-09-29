/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeModel = null;

class TradeModel extends ModelBase {
  constructor() {
    if ( tradeModel )
      throw DevErrors.singleIntance( 'TradeModel' );

    super( '', '', '', '' );

    this.chart = null;

    tradeModel = this;
    Object.seal( tradeModel );
  }

  getLastOHLCV( symbol, Callback ) {
    ExchangeClient._.getOHLCV( 'KRAKEN', symbol, '1m', ( lastOHLCV ) => {
      return Callback( lastOHLCV );
    } );
  }
}
