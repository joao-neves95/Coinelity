/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// TODO: (FRONTEND) Add the line chart.

let tradeModel = null;

class TradeModel extends ModelBase {
  constructor() {
    if ( tradeModel )
      throw DevErrors.singleIntance( 'TradeModel' );

    super( '', '', '', '' );

    /** @type { UserAccountType } */
    this.currentAccounType;
    this.currentTradeMode = TradingMode.BinaryOptions;
    this.currentSymbol = 'BTC/EUR';
    this.currentFiatSymbol = FiatSymbol.Euro;
    this.currentExchange = 'KRAKEN';
    this.currentTimeframe = ChartTimeframeType.Min1;

    this.chart = {};

    this.chartData = {
      categoryData: [],
      values: []
    };

    // Docs: https://ecomfe.github.io/echarts-doc/public/en/option.html#series-candlestick
    this.chartConfig = {
      backgroundColor: Colors.LighterGrey,// '#21202D',
      title: {
        text: this.currentSymbol,
        left: 'center'
      },
      animation: true,
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      toolbox: {
        show: true,
        right: 10,
        feature: {
          saveAsImage: {
            title: 'Save image as'
          },
          dataZoom: {
            yAxisIndex: 'none',
            title: {
              zoom: 'Area zoom',
              back: 'Restore area zoom'
            }
          },
          restore: {
            title: 'Restore'
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: true
        }
      },
      xAxis: {
        type: 'category',
        data: this.chartData.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 90,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: 50,
          end: 100
        }
      ],
      series: [
        {
          type: 'candlestick',
          data: this.chartData.values,
          itemStyle: {
            // Bullish candles.
            color: Colors.BullishGreen,
            borderColor: Colors.BullishGreen,
            // Bearish candles.
            color0: Colors.BearishRed,
            borderColor0: Colors.BearishRed
          }
        }//,
        //{
        //  name: 'MA10',
        //  type: 'line',
        //  data: calculateMA( 10, data ),
        //  smooth: true,
        //  showSymbol: false,
        //  lineStyle: {
        //    normal: {
        //      width: 1
        //    }
        //  }
        //},
      ]
    };

    this.chartUpdatePriceInterval = null;
    this.chartUpdateCandleInterval = null;

    tradeModel = this;
    Object.seal( tradeModel );
  }

  get _() { return tradeModel; }

  getInitChartData() {
    return new Promise( async ( resolve, reject ) => {
      let OHLCVArray;

      try {
        OHLCVArray = await this.getOHLCV();

      } catch {
        // TODO: Send error notification.
        return console.error( 'There was an error while trying to connect to the data provider.' );
      }

      for ( let i = 0; i < OHLCVArray.length; ++i ) {
        this.chartData.categoryData.push( Utils.unixMilisecondsToHuman( OHLCVArray[i][0] ) );
        //                                 open             close             lowest           highest
        this.chartData.values.push( [OHLCVArray[i][1], OHLCVArray[i][4], OHLCVArray[i][3], OHLCVArray[i][2]] );
      }

      return resolve( [this.chartData] );
    } );
  }

  initEventHandlers() {
    this.chart.on( 'datazoom', ( e ) => {
      if ( e.batch === undefined ) {
        this.chartConfig.dataZoom[0].start = e.start;
        this.chartConfig.dataZoom[0].end = e.end;

      } else {
        const eventValues = e.batch[0];
        this.chartConfig.dataZoom[0].start = eventValues.start;
        this.chartConfig.dataZoom[0].end = eventValues.end;
      }
    } );

    this.chart.on( 'restore', async () => {
      // TODO: Control the restore (rate limit).
      this.chartData.categoryData = [];
      this.chartData.values = [];
      await this.getInitChartData();
      this.chart.setOption( this.chartConfig );
    } );
  }

  /**
   * 
   * @param { Function } Callback Optional (<OHLCV | undefined>)
   * @returns { Promise<string[]> }
   */
  getOHLCV() {
    return new Promise( async ( resolve, reject ) => {
      let success = false;
      let lastError = null;
      let attemptNum = 0;
      let OHLCVArray;

      while ( !success ) {
        try {
          OHLCVArray = await ExchangeClient._.getOHLCV( this.currentExchange, this.currentSymbol, this.currentTimeframe );

        } catch ( e ) {
          ++attemptNum;
          lastError = e;

        } finally {
          if ( attemptNum > FETCH_CHART_DATA_MAX_ATTEMPTS ) {
            console.error( 'There was an error while fetching the data.', lastError );
            return reject( lastError );
          }

          // Just to confirm.
          if ( Array.isArray( OHLCVArray ) )
            success = true;
        }
      }

      return resolve( OHLCVArray );
    } );
  }

  getTicker() {
    return new Promise( async ( resolve, reject ) => {
      let success = false;
      let lastError = null;
      let attemptNum = 0;
      let ticker;

      while ( !success ) {
        try {
          ticker = await ExchangeClient._.getLastTicker( this.currentExchange, this.currentSymbol );

        } catch ( e ) {
          ++attemptNum;
          lastError = e;

        } finally {
          if ( attemptNum > FETCH_CHART_DATA_MAX_ATTEMPTS ) {
            console.error( 'There was an error while fetching the data.', lastError );
            return reject( lastError );
          }

          // Just to confirm.
          if ( typeof ticker === 'object' )
            success = true;
        }
      }

      return resolve( ticker );
    } );
  }
}
