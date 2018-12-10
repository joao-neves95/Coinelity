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

    this.optionsConnection;
    this.openOrders = new Dictionary( true );

    this.chartUpdatePriceInterval = null;
    this.chartUpdateCandleInterval = null;

    this.chart = {};
    this.chartData = {
      categoryData: [],
      values: []
    };
    this.chartConfig = CHART_CONFIG;

    tradeModel = this;
    Object.seal( tradeModel );
  }

  get _() { return tradeModel; }

  /**
   * It populates the model with the initial price data.
   */
  initChartData() {
    return new Promise( async ( resolve, reject ) => {
      let OHLCVArray;

      try {
        OHLCVArray = await this.getOHLCV();

      } catch {
        Notifications.errorToast( 'There was an error connecting to the data provider. Trying again...' );
        return this.getInitChartData();
      }

      for ( let i = 0; i < OHLCVArray.length; ++i ) {
        this.chartData.categoryData.push( Utils.unixMilisecondsToHuman( OHLCVArray[i][0] ) );
        //                                 open             close             lowest           highest
        this.chartData.values.push( [OHLCVArray[i][1], OHLCVArray[i][4], OHLCVArray[i][3], OHLCVArray[i][2]] );
      }

      return resolve();
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
   * It returns the promise when it finishes connecting or gets in an infinite loop.
   * @returns { Promise<void> }
   */
   connectToOptionsHub() {
    return new Promise( async (resolve, reject) => { 
      this.optionsConnection = new signalR.HubConnectionBuilder()
        .withUrl( 'options' )
        // TODO: (FRONTEND) (PRODUCTION) Change to only show errors.
        // .configureLogging( signalR.LogLevel.Error )
        .configureLogging( signalR.LogLevel.Trace )
        .build();

      this.__initOptionsHubListeners();

      // Reconnection loop.
      this.optionsConnection.onclose( async () => {
        Notifications.warningToast( 'The connection dropped. Trying to reconnect...' );
        return await this.__startOptionsHubConnection();
      } );

      await this.__startOptionsHubConnection();
      return resolve();
    } );
  }

  async __startOptionsHubConnection() {
    try {
      return await this.optionsConnection.start();

    } catch ( e ) {
      console.error( e );
      setTimeout( () => this.__startOptionsHubConnection(), 5000 );
    }
  }

  async stopOptionsHubConnection() {
    try {
      await this.optionsConnection.stop();

    } catch ( e ) {
      console.error( e );
      setTimeout( () => this.stopOptionsHubConnection(), 5000 );
    }
  }

  __initOptionsHubListeners() {
    this.optionsConnection.on( 'ReceivePlaceOptionResult', ( res ) => {
      console.debug( res );
    } );

    this.optionsConnection.on( 'ReceiveCheckOptionResult', ( res ) => {
      console.debug( res );
    } );

    this.optionsConnection.on( 'ReceiveSyncResult', ( res ) => {
      console.debug( res );
    } );
  }

  placeOrder( placeOptionDTO ) {
    this.optionsConnection.invoke( 'PlaceOrder', placeOptionDTO )
      .catch( e => {
        console.error( e );
        return Notifications.errorToast( 'There was an error while placing the trade.' );
      } );

    return Notifications.successToast( 'Order successfuly placed!' );
  }

  checkOrder( checkOrderDTO ) {
    this.optionsConnection.invoke( 'CheckOrder', checkOrderDTO ) 
      .catch( e => console.error( e ) );
  }

  syncOrders() {
    this.optionsConnection.invoke( 'SyncOrders' )
      .catch( e => console.error( e ) );
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
            Notifications.errorToast( 'There was an error while fetching the chart data.' );
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
            Notifications.errorToast( 'There was an error while fetching the chart data.' );
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
