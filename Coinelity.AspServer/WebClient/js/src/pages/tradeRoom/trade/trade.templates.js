/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class TradeTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'TradeTemplates' );
  }

  static get chartElemId() { return 'trading-chart'; }

  static container() {
    return `
      <section id="trade" clas="grid-container">
        <div class="grid-x grid-padding-x trade-content-wrapper">

        </div>
      </section>
    `;
  }

  static chart() {
    return `
      <section class="cell">
        <article id="${TradeTemplates.chartElemId}">
        </article>
      </section>
    `;
  }

  static toolsWrapper() {
    return `
      <section class="cell trading-tools-wrapper"></section>
    `;
  }

  static binaryOptionsTools() {
    return `
      <article class="cell"></article>
    `;
  }

  static CFDTools() {
    return `
      <article class="cell"></article>
    `;
  }
}
