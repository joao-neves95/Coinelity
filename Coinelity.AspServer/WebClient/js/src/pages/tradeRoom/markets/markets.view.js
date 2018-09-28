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
  coinPriceElem( symbol ) { return document.getElementById( symbol + '-curr-price' ); }
  coinPriceChangeElem( symbol ) { return document.getElementById( symbol + '-price-change' ); }
  coinPercentChangeElem( symbol ) { return document.getElementById( symbol + '-percent-change' ); }

  injectContainer() {
    document.getElementById( NavItemID.Markets ).innerHTML = MarketsTemplates.container();
  }

  /**
   * 
   * @param { string } coinSymbol For display and logic purposes.
   * @param { string } coinImgUrl The coin logo image url.
   * @param { number } price
   * @param { string } fiatSymbol
   * @param { number } priceChange
   * @param { number } percentChange
   * 
   * @returns { void }
   */
  addCoinCard( coinSymbol, coinImgUrl, price, fiatSymbol, priceChange, percentChange ) {
    this.marketsContent.innerHTML += MarketsTemplates.coinCard( coinSymbol, coinImgUrl, price.toString(), fiatSymbol, priceChange.toString(), percentChange.toString() );
  }

  updateCoinCard( coinSymbol, price, priceChange, percentChange ) {
    this.coinPriceElem( coinSymbol ).innerText = price.toString();
    this.coinPriceChangeElem( coinSymbol ).innerText = priceChange.toString();
    this.coinPercentChangeElem( coinSymbol ).innerText = percentChange.toString();
  }

  removeCoinCard( coinSymbol ) {
    document.getElementById( coinSymbol + MarketsTemplates.idPostfix ).remove();
  }

  clearContent() {
    this.marketsContent.innerHTML = '';
  }
}
