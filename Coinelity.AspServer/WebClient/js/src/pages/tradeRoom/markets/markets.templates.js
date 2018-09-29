/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class MarketsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'MarketsTemplates' );
  }

  static get idPostfix() { return '-coin-card'; }

  static container() {
    return `
      <section id="markets" clas="grid-container">
        <h3>Markets</h3>
        <div class="grid-x grid-padding-x markets-cards-wrapper">

        </div>
      </section>
    `;
  }

  /**
   * 
   * @param { string } coinName For display and logic (id) purposes.
   * @param { string } coinImgUrl The coin logo image url.
   * @param { string } price
   * @param { fiatSymbol } fiatSymbol
   * @param { string } priceChange
   * @param { string } percentChange
   * 
   * @returns { string } HTMLElement string.
   */
  static coinCard(coinName, coinImgUrl, price, fiatSymbol, priceChange, percentChange) {
    return `
      <article class="cell small-12 medium-6 large-2 coin-card" id="${coinName}${MarketsTemplates.idPostfix}">
        <div class="card">
          <img class="float-center" src="${coinImgUrl}" alt="${coinName} Logo">
          <div class="card-section">
            <h4 class="name">${coinName}</h4>
            <p>
              <span class="price">
                <span id="${coinName}-curr-price">${price}</span>${fiatSymbol}
              </span>
              <span class="change">
                <span id="${coinName}-price-change">${priceChange}</span>
                (<span id="${coinName}-percent-change">${percentChange}</span>&#37;)
              </span>
            </p>
          </div>
        </div>
      </article>
    `;
  }
}
