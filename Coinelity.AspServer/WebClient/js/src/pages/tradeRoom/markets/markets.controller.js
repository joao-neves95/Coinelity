/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let marketsController = null;

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
      // TODO: Add [symbols + fiatSymbol + exchange + images] to the database and get them from there.
      // Simulation. Temporary.
      const thisCoinSymbol = 'BTC/EUR' + i.toString();
      this.model.symbols.add( thisCoinSymbol );
      this.view.addCoinCard( thisCoinSymbol, 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png', 7000, FiatSymbol.Euro, 230.73, 3.68 );
    }

    this.setCardUpdate();
    this.addCardListeners();
  }

  setCardUpdate() {
    /** @type { List } */
    const symbols = this.model.symbols;

    this.model.cardUpdateInterval = setInterval( () => {
      for ( let i = 0; i < symbols.length; ++i ) {
        const thisSymbol = symbols.get( i );

        this.model.getCoinChange( thisSymbol.substring( 0, thisSymbol.length - 1), ( coinChange ) => {
          this.view.updateCoinCard( thisSymbol, coinChange.currentPrice, coinChange.price.toFixed(2), coinChange.percent.toFixed(2) );
        } );

      }
    }, MARKETS_UPDATE_RATE );
  }

  addCardListeners() {
    /** @type { List } */
    const symbols = this.model.symbols;

    for ( let i = 0; i < symbols.length; ++i ) {
      const thisSymbol = symbols.get( i );

      DOM.on( 'click', DOM.elemById( thisSymbol + MarketsTemplates.idPostfix ), ( e ) => {
        e.preventDefault();
        page( `/${NavItemID.Trade}/${Utils.encondeCoinSymbolUri( thisSymbol.substring( 0, thisSymbol.length - 1 ) )}` );

        return false;
      } );

    }
  }

  stopCardUpdate() {
    if ( this.model.cardUpdateInterval ) {
      clearInterval( this.model.cardUpdateInterval );
    }
  }
}
