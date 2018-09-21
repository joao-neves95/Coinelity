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

  static container( content ) {
    return `
      <section id="markets" clas="grid-container">
        <h3>Markets</h3>
        <section class="grid-x markets-cards-wrapper">
        
        </section>
      </section>
    `;
  }

  /**
   * 
   * @param { string } coinName For display and logic purposes.
   * @param { string } coinImgUrl The coin logo image url.
   * @param { string } price Temporary.
   * @param { string } priceChange Temporary.
   * 
   * @returns { string } HTMLElement string.
   */
  static coinCard(coinName, coinImgUrl, price, priceChange) {
    return `
      <article class="cell small-12 medium-6 large-4" id="${coinName}-coin-card">
        <div class="card">
          <img src="${coinImgUrl}" alt="${coinName} Logo">
          <div class="card-section">
            <h4>${coinName}</h4>
            <p>Current Price: <span id="${coinName}-curr-price">${price}</span> | Price Change: <span id="${coinName}-price-change">${priceChange}</span>%</p>
          </div>
        </div>
      </article>
    `;
  }
}
