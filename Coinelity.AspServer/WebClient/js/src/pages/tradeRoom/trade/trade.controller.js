/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// Add chart candlesticks with Plotly.extendTraces
// Update existing chart candlesticks with Plotly.restyle

let tradeController = null;

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
      this.model.initEventHandlers();
      this.startChartPriceUpdate();
      this.startChartCandleUpdate();

      resolve();
    } );
  }

  startChartCandleUpdate() {
    setTimeout( () => {
      this.__updateCandles();

      this.model.chartUpdateCandleInterval = setInterval( async () => {
        await this.__updateCandles();
      }, Utils.getMilisecondsFromChartTimeframe( this.model.currentTimeframe ) );

    }, Utils.getTimeToNextTimeframe( this.model.currentTimeframe ) );
  }

  startChartPriceUpdate() {
    this.model.chartUpdatePriceInterval = setInterval( async () => {
      let ticker = undefined;

      try {
        ticker = await this.model.getTicker();

        if ( ticker === undefined )
          throw new Error();

        const lastPrice = parseFloat( ticker.last );
        const allCandles = this.model.chartConfig.series[0].data;
        const lastCandle = allCandles[allCandles.length - 1];
        // Close
        lastCandle[1] = lastPrice;
        // Low
        if ( lastPrice < parseFloat( lastCandle[2] ) )
          lastCandle[2] = lastPrice;
        // High
        if ( lastPrice > parseFloat( lastCandle[3] ) )
          lastCandle[3] = lastPrice;
       
        this.model.chart.setOption( this.model.chartConfig );
        this.model.updateTradingToolsCurrPrice( lastPrice.toString() );

      } catch {
        // TODO: Send error notification.
        return console.error( 'There was an error while trying to connect to the data provider.' );
      }
    }, TRADE_PRICE_UPDATE_RATE );
  }

  stopChartUpdate() {
    if ( this.model.chartUpdateCandleInterval )
      clearInterval( this.model.chartUpdateCandleInterval );

    if ( this.model.chartUpdatePriceInterval )
      clearInterval( this.model.chartUpdatePriceInterval );
  }

  injectTradeTools() {
    this.view.injectTradingTools( this.model.currentTradeMode );
  }

  async __updateCandles() {
    let OHLCVArray = undefined;

    try {
      OHLCVArray = await this.model.getOHLCV();

      if ( OHLCVArray === undefined )
        throw new Error();

      const lastOHLCV = OHLCVArray[OHLCVArray.length - 1];
      const allDates = this.model.chartConfig.xAxis.data;
      allDates.shift();
      allDates.push( Utils.unixMilisecondsToHuman( lastOHLCV[0] ) );
      const allCandles = this.model.chartConfig.series[0].data;
      allCandles.shift();
      allCandles.push( [lastOHLCV[1], lastOHLCV[4], lastOHLCV[3], lastOHLCV[2]] );
      this.model.chart.setOption( this.model.chartConfig );

    } catch {
      // TODO: Send error notification.
      return console.error( 'There was an error while trying to connect to the data provider.' );
    }
  }
}
