/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let marketsController = null;
let cardUpdateInterval = null;

class MarketsController extends ControllerBase {
  constructor() {
    if ( marketsController )
      throw DevErrors.singleIntance( 'MarketsController' );

    super(
      new MarketsModel(),
      new MarketsView()
    );

    marketsController = this;
    Object.freeze( marketsController );
  }

  get _() { return marketsController; }

  injectContent() {
    this.view.injectContainer();

    for ( let i = 0; i < 10; ++i ) {
      // TODO: Add [symbols + fiatSymbol + exchange + images] to the database and get from there.
      // Simulation. Temporary.
      const thisCoinSymbol = 'BTC/EUR' + i.toString();
      this.model.symbols.add( thisCoinSymbol );
      this.view.addCoinCard( thisCoinSymbol, 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png', 7000, FiatSymbol.Euro, 230.73, 3.68 ); 
    }

    this.setCardUpdate();
  }

  setCardUpdate() {
    /** @type { List } */
    const symbols = this.model.symbols;

    cardUpdateInterval = setInterval( () => {
      for ( let i = 0; i < symbols.length; ++i ) {
        let thisSymbol = symbols.get( i );
        thisSymbol = thisSymbol.substring( 0, thisSymbol.length - 1 );

        this.model.getCoinChange( thisSymbol, ( coinChange ) => {
          this.view.updateCoinCard( thisSymbol + i.toString(), coinChange.currentPrice, coinChange.price.toFixed(2), coinChange.percent.toFixed(2) );
        } );

      }
    }, MARKETS_UPDATE_RATE );
  }

  stopCardUpdate() {
    clearInterval( cardUpdateInterval );
  }
}
