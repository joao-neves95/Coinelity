/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeModel = null;

class TradeModel extends ModelBase {
  constructor() {
    if ( tradeModel )
      throw DevErrors.singleIntance( 'TradeModel' );

    super( '', '', '', '' );

    this.currentTradeMode = TradingMode.BinaryOptions;
    this.currentSymbol = 'BTC/EUR';
    this.currentExchange = 'KRAKEN';
    this.currentTimeframe = '1d';

    this.chart = {};

    this.chartData = {
      categoryData: [],
      values: []
    };

    // Docs: https://ecomfe.github.io/echarts-doc/public/en/option.html#series-candlestick
    this.chartConfig = {
      //backgroundColor: '#21202D',
      title: {
        text: 'BTC/EUR',
        left: 0 // 'center'
      },
      animation: true,
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
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
            color: '#26A69A',
            // Bearish candles.
            color0: '#EF5350'
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
        // TODO: Send notification.
        return console.error( 'There was an error while trying to connect to the data provider. Please, try again.' );
      }

      for ( let i = 0; i < OHLCVArray.length; ++i ) {
        const humanDate = moment.unix( OHLCVArray[i][0] / 1000 ).format( "YYYY/MM/DD" );
        this.chartData.categoryData.push( humanDate );
        // date, open，close, lowest, highest.
        this.chartData.values.push( [ OHLCVArray[i][1], OHLCVArray[i][4], OHLCVArray[i][3], OHLCVArray[i][2] ] );
      }

      return resolve( [this.chartData] );
    } );
  }

  /**
   * 
   * @param { Function } Callback Optional (<OHLCV | undefined>)
   * @returns { Promise<string[]> }
   */
  getOHLCV() {
    let success = false;
    let lastError = null;
    let attemptNum = 0;
    let OHLCVArray;

    return new Promise( async ( resolve, reject ) => {

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
}
