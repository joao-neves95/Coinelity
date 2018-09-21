﻿/*
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

    tradeRoomController = this;
    Object.freeze( tradeRoomController );
  }

  /**
   * @type { TradeRoomController }
   */
  static get _() { return tradeRoomController; }

  // Called from traderRoutes.
  openMarkets() {
    //if ( this.model.activeContentId === NavItemID.Markets )
    //  return;

    this.marketsController.injectContent();

    this.model.id = NavItemID.Markets;
    this.model.activeContentId = NavItemID.Markets;
    console.info( `The TradeRoom markets were opened.` );
    console.debug( this.model.activeContentId );
  }

  // Called from traderRoutes.
  tradeAsset( assetID ) {
    if ( this.model.activeContentId === NavItemID.Trade )
      return;

    this.model.id = NavItemID.Trade;
    this.model.activeContentId = NavItemID.Trade;
    console.info( `TradeRoom opened to trade ${assetID}.` );
    console.debug( this.model.activeContentId );
  }
}
