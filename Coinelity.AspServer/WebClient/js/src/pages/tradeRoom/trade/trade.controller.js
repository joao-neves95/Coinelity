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

      resolve();
    } );
  }

  // TODO: REDO.
  startChartCandleUpdate() {
    this.model.chartUpdateCandleInterval = setInterval( () => {
      this.model.getOHLCV( ( OHLCV ) => {
        if ( OHLCV )
          this.model.chart.series[0].addPoint( OHLCV[OHLCV.length - 1], true, true );

        // option.xAxis.data.shift();
        // option.xAxis.data.push( date );
        // option.series[0].data.shift();
        // option.series[0].data.push( newCandle );
        // chart.setOption( option );

      } );
    }, 1000 * 60 );
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
}
