/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeRoomController = null;

class TradeRoomController extends ControllerBase {
  constructor() {
    if ( tradeRoomController )
      throw DevErrors.singleIntance( 'TradeRoomController' );

    super(
      new TradeRoomModel(),
      new TradeRoomView()
    );

    this.marketsController = new MarketsController();
    this.tradeController = new TradeController();

    tradeRoomController = this;
    Object.freeze( tradeRoomController );
  }

  /**
   * @type { TradeRoomController }
   */
  static get _() { return tradeRoomController; }

  /** 
    "traderoom/markets". Called from traderRoutes.
   */
  openMarkets() {
    this.tradeController.stopChartUpdate();
    this.marketsController.injectContent();
    this.model.activeContentId = NavItemID.Markets;
  }

  /** 
    "traderoom/trade/:assetID". Called from traderRoutes.
   * @param { string } assetID The asset symbol. E.g.: "BTC-EUR" == (BTC/EUR).
   */
  tradeAsset( assetID ) {
    if ( this.model.activeContentId === NavItemID.Trade )
      return;

    this.marketsController.stopCardUpdate();
    this.tradeController.injectContent( Utils.decodeCoinSymbolUri( assetID ) );
    this.model.activeContentId = NavItemID.Trade;
  }

  onBeforeDestroy() {
    this.marketsController.stopCardUpdate();
    this.tradeController.stopChartUpdate();
  }
}
