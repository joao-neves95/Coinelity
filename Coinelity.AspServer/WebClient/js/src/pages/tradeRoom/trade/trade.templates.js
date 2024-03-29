/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class TradeTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'TradeTemplates' );
  }

  static get chartElemId() { return 'trading-chart'; }

  /**
   * The page content container (grid).
   */
  static container() {
    return `
      <section id="trade" class="grid-container fluid">
        <div class="grid-x trade-content-wrapper">
      
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

  static binaryOptionsTools( userAccountType ) {
    /**
     * (Refactor the inputs: Add plus/minus signs to the money inputs and the option lifetimes; ).
     * Here inject the rigth tools based on the user account type (real or demo).
     * Real: erous and credits.
     * Demo: paper euros.
     */
    return `
      <form class="cell">
        ${
          // PageTemplates.selectInput( 'trade-mode', 'Trade Mode', [new SelectInputOptions( 'Binary Option', TradingMode.BinaryOptions ), new SelectInputOptions( 'CFD', TradingMode.CFD )], 'round-borders-1' ) +
          PageTemplates.selectInput( 'option-lifetime', 'Option Lifetime', [new SelectInputOptions( '1m', '1m' ), new SelectInputOptions( '15m', '15m' ), new SelectInputOptions( '1h', '1h' )], 'round-borders-1' ) +
          TradeTemplates.realAccountInputs() +
          PageTemplates.button( `
            <span class="icon call"></span>
            <span class="lbl">Call</span>`,
          'call-btn', ButtonType.Success, 'btn round-borders-1' ) +

          `<p class="curr-price">
             <span id="trading-tools_current-price"></span>
             <span id="trading-tools_fiat-symbol"></span>
           </p>` +

          PageTemplates.button( `
            <span class="icon put"></span>
            <span class= "lbl">Put</span>`,
            'put-btn', ButtonType.Alert, 'btn round-borders-1' )
         }
      </form>
    `;
  }

  static realAccountInputs {
    return PageTemplates.inputNumElem( 'Investment Amount', 'investment-amount', 1, '', '1', 'class = "round-borders-1"') +
  }
  
  static demoAccountInputs {
    return '';
  }

  static CFDTools() {
    return `
      <article class="cell">
      </article>
    `;
  }
}
