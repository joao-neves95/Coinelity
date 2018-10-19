/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeView = null;

class TradeView extends ViewBase {
  constructor() {
    if ( tradeView )
      throw DevErrors.singleIntance( 'TradeView' );

    super( '' );

    tradeView = this;
    Object.freeze( tradeView );
  }

  get tradeContentWrapper() { return document.getElementsByClassName('trade-content-wrapper')[0]; }
  get tradingChartWrapper() { return document.getElementsByClassName('trading-chart-wrapper')[0]; }

  injectContainer() {
    document.getElementById( NavItemID.Markets ).innerHTML = TradeTemplates.container();
  }

  injectChartTemplate() {
    this.tradingChartWrapper.innerHTML += TradeTemplates.chart();
  }

  /**
   * 
   * @param { TradingMode } tradingToolsType
   */
  injectTradingTools( tradingToolsType ) {
    let tradingToolsWrapper = document.getElementsByClassName( 'trading-tools-wrapper' )[0];

    if ( tradingToolsType === TradingMode.BinaryOptions )
      tradingToolsWrapper.innerHTML = TradeTemplates.binaryOptionsTools();
    else
      tradingToolsWrapper.innerHTML = TradeTemplates.CFDTools();
  }
}
