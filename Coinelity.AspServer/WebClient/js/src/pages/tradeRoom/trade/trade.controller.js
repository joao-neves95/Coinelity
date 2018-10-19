/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

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
      const chartData = await this.model.getChartData();

      Plotly.plot( TradeTemplates.chartElemId, chartData, this.model.chartLayout,
        {
          responsive: true,
          scrollZoom: true,
          showLink: false,
          displaylogo: false,
          modeBarButtonsToRemove: ['sendDataToCloud']
        } );

      resolve();
    } );
  }

  startChartCandleUpdate() {
    chartUpdatePriceInterval = setInterval( () => {
      this.model.getOHLCV( ( OHLCV ) => {
        if ( OHLCV )
          // TODO: Update for the new charting lib.
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
