﻿/*
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
      
          <section class="cell trading-chart-wrapper">
          </section>
        
          <section class="cell trading-tools-wrapper">
          </section>

        </div>
      </section>
    `;
  }

  static chart() {
    return `
        <article id="${TradeTemplates.chartElemId}">
        </article>
    `;
  }

  static binaryOptionsTools() {
    return `
      <form class="cell">
        <p>Current Price <span id="current-price">5048</span>€<p>
        ${
          PageTemplates.selectInput( 'trade-mode', 'Trade Mode', [new SelectInputOptions( 'Binary Option', TradingMode.BinaryOptions ), new SelectInputOptions( 'CFD', TradingMode.CFD )], 'round-borders-1' ) +
          PageTemplates.selectInput( 'option-lifetime', 'Option Lifetime', [new SelectInputOptions( '1m', '1m' ), new SelectInputOptions( '15m', '15m' ), new SelectInputOptions( '1h', '1h' )], 'round-borders-1' ) +
          PageTemplates.inputNumElem( 'Investement Amount', 'investment-amount', 1, '', '1', 'class = "round-borders-1"') +
          PageTemplates.button( '<span class="icon call"></span>Call', 'call-btn', ButtonType.Success, 'btn round-borders-1' ) +
          PageTemplates.button( '<span class="icon put"></span>Put', 'put-btn', ButtonType.Alert, 'btn round-borders-1' )
         }
      </form>
    `;
  }

  static CFDTools() {
    return `
      <article class="cell">
      </article>
    `;
  }
}
