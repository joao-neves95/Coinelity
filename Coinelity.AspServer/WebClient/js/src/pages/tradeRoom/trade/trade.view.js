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

  injectContainer() {
    document.getElementById( NavItemID.Markets ).innerHTML = TradeTemplates.container();
  }

  injectChart() {
    this.tradeContentWrapper.innerHTML += TradeTemplates.chart();
  }

  /**
   * 
   * @param { TradingToolsType } tradingToolsType
   */
  injectTradingTools( tradingToolsType ) {
    const tradingToolsWrapper = document.getElementsByClassName( 'trading-tools-wrapper' );

    if ( tradingToolsWrapper.length <= 0 )
      this.tradeContentWrapper.innerHTML += TradeTemplates.toolsWrapper();

    tradingToolsWrapper = tradingToolsWrapper[0];

    if ( tradingToolsType === TradingToolsType.BinaryOption )
      this.tradingToolsWrapper.innerHTML = TradeTemplates.binaryOptionsTools();
    else
      this.tradingToolsWrapper.innerHTML = TradeTemplates.CFDTools();
  }
}
