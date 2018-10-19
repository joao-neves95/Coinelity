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
    this.currentSymbol = null;
    this.currentTimeframe = '1d';

    this.chartLayout = {
      dragmode: 'zoom',
      heigth: 2000,
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        // range: [1000, 2000],
        type: 'linear'
      }
    };

    this.chartTrace = {
      type: 'candlestick',
      increasing: { line: { color: '#26A69A' } },
      decreasing: { line: { color: '#EF5350' } },
      xaxis: 'x',
      yaxis: 'y',
      // DATA:
      x: [],
      open: [],
      high: [],
      low: [],
      close: []
    };


    tradeModel = this;
    Object.seal( tradeModel );
  }

  get _() { return tradeModel; }

  getChartData() {
    return new Promise( async ( resolve, reject ) => {
      const OHLCVArray = await this.getOHLCV();
      
      if ( !OHLCVArray )
        return console.error( 'ERROR GETTING THE HISTORICAL CANDLE DATA.' );

      for ( let i = 0; i < OHLCVArray.length; ++i ) {
        this.chartTrace.x.push( moment.unix( OHLCVArray[i][0] / 1000 ).format( "YYYY-MM-DD" ) );
        this.chartTrace.open.push( OHLCVArray[i][1] );
        this.chartTrace.high.push( OHLCVArray[i][2] );
        this.chartTrace.low.push( OHLCVArray[i][3] );
        this.chartTrace.close.push( OHLCVArray[i][4] );
      }

      return resolve( [this.chartTrace] );
    } );
  }

  /**
   * 
   * @param {any} symbol
   * @param { Function } Callback Optional (<OHLCV | undefined>)
   * 
   */
  getOHLCV( Callback ) {
    return new Promise( ( resolve, reject ) => {

      ExchangeClient._.getOHLCV( 'KRAKEN', this.currentSymbol, this.currentTimeframe, ( OHLCVArray ) => {
        if ( Callback )
          return Callback( OHLCVArray );

        resolve( OHLCVArray );
      } );
    } );
  }
}
