/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

// Add chart candlesticks with Plotly.extendTraces
// Update existing chart candlesticks with Plotly.restyle

let tradeController = null;
let chartUpdateCandleInterval = null;
let chartUpdatePriceInterval = null;

class TradeController extends ControllerBase {
  constructor() {
    if ( tradeController )
      throw DevErrors.singleIntance( 'TradeController' );

    super(
      new TradeModel(),
      new TradeView()
    );

    tradeController = this;
    Object.freeze( tradeController );
  }

  /**
   * 
   * @param { string } assetID The asset symbol.
   */
  async injectContent( symbolId ) {
    this.model.currentSymbol = symbolId;
    this.view.injectContainer();
    await this.injectChart();
    this.injectTradeTools();
  }

  injectChart() {
    return new Promise( async ( resolve, reject ) => {
      this.view.injectChartTemplate();
      await this.model.getInitChartData();
      this.model.chart = echarts.init( document.getElementById( TradeTemplates.chartElemId ) );
      this.model.chart.setOption( this.model.chartConfig );

      resolve();
    } );
  }

  // TODO: REDO.
  startChartCandleUpdate() {
    chartUpdatePriceInterval = setInterval( () => {
      this.model.getOHLCV( ( OHLCV ) => {
        if ( OHLCV )
          this.model.chart.series[0].addPoint( OHLCV[OHLCV.length - 1], true, true );

      } );
    }, 1000 * 60 );
  }

  startChartPriceUpdate() {
    chartUpdatePriceInterval = setInterval();
  }

  stopChartUpdate() {
    if ( chartUpdateCandleInterval )
      clearInterval( chartUpdateCandleInterval );

    if ( chartUpdatePriceInterval )
      clearInterval( chartUpdatePriceInterval );
  }

  injectTradeTools() {
    this.view.injectTradingTools( this.model.currentTradeMode );
  }
}
