/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeController = null;
let chartUpdateInterval = null;

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
  injectContent( assetID ) {
    this.view.injectContainer();
    this.injectTradeTools();
    this.injectChart( assetID );
  }

  injectChart( assetID ) {
    this.view.injectChart();

    ExchangeClient._.getOHLCV( 'KRAKEN', assetID, '1m', ( OHLCVArray ) => {
      console.debug( OHLCVArray );

      if ( !OHLCVArray )
        return console.error( 'ERROR GETTING THE HISTORICAL CANDLE DATA.' );

      this.model.chart = Highcharts.stockChart( 'trading-chart', {

        rangeSelector: {
          buttons: [
            {
              type: 'second',
              count: 1,
              text: '1s'
            },
            {
              type: 'hour',
              count: 1,
              text: '1h'
            }, {
              type: 'day',
              count: 1,
              text: '1D'
            }, {
              type: 'all',
              count: 1,
              text: 'All'
            }
          ],
          selected: 1,
        },

        title: {
          text: assetID,
          events: {
            load: this.updateChart( assetID )
          }
        },

        credits: {
          enabled: false
        },

        series: [{
          type: 'candlestick',
          name: assetID,
          data: OHLCVArray,
          dataGrouping: {
            units: [
              [
                'minute',
                [1]
              ],
              [
                'week', // unit name
                [1] // allowed multiples
              ],
              [
                'month',
                [1, 2, 3, 4, 6]
              ]
            ]
          },
          tooltip: {
            valueDecimals: 2
          }
        }]

      } );

    } );
  }

  updateChart( symbol ) {
    chartUpdateInterval = setInterval( () => {
      this.model.getLastOHLCV( symbol, ( OHLCV ) => {
        if ( OHLCV )
          this.model.chart.series[0].addPoint( OHLCV[OHLCV.length - 1], true, true );

      } );
    }, 1000 * 60 );    
  }

  stopChartUpdate() {
    if ( chartUpdateInterval )
      clearInterval( chartUpdateInterval );
  }

  injectTradeTools() {

  }

}
