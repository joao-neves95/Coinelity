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

  addCard( coinName, coinImgUrl, price, priceChange ) {
    this.marketsContent.innerHTML += MarketsTemplates.coinCard( coinName, coinImgUrl, price, priceChange );
  }

  removeCard( coinName ) {
    document.getElementById( coinName + '-coin-card' ).remove();
  }

  clearContent() {
    this.marketsContent.innerHTML = '';
  }
}
