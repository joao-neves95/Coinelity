/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let marketsView = null;

class MarketsView extends ViewBase {
  constructor() {
    if ( marketsView )
      throw DevErrors.singleIntance( 'MarketsView' );

    super( '' );

    marketsView = this;
    Object.freeze( marketsView );
  }

  get element() { return document.getElementById( 'markets' ); }

  get marketsContent() { return document.getElementsByClassName( 'markets-cards-wrapper' )[0]; }

  injectContainer() {
    document.getElementById( NavItemID.Markets ).innerHTML = MarketsTemplates.container();
  }

  /**
   * 
   * @param { string } coinName For display and logic purposes.
   * @param { string } coinImgUrl The coin logo image url.
   * @param { number } price
   * @param { string } fiatSymbol
   * @param { number } priceChange
   * @param { number } percentChange
   * 
   * @returns { void }
   */
  addCoinCard( coinName, coinImgUrl, price, fiatSymbol, priceChange, percentChange ) {
    this.marketsContent.innerHTML += MarketsTemplates.coinCard( coinName, coinImgUrl, price.toString(), fiatSymbol, priceChange.toString(), percentChange.toString() );
  }

  removeCoinCard( coinName ) {
    document.getElementById( coinName + '-coin-card' ).remove();
  }

  clearContent() {
    this.marketsContent.innerHTML = '';
  }
}
