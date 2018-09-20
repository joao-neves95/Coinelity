/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
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

    tradeRoomController = this;
    Object.freeze( tradeRoomController );
  }

  /**
   * @type { TradeRoomController }
   */
  static get _() { return tradeRoomController; }

  // Called from traderRoutes.
  openMarkets() {
    if ( this.model.activeContent === NavItemID.Markets )
      return;

    this.model.id = NavItemID.Markets;
    this.model.activeContentId = NavItemID.Markets;
    console.info( `The TradeRoom markets were opened.` );
    console.debug( this.model.activeItem );
  }

  // Called from traderRoutes.
  tradeAsset( assetID ) {
    if ( this.model.activeContent === NavItemID.Trade )
      return;

    this.model.id = NavItemID.Trade;
    this.model.activeContentId = NavItemID.Trade;
    console.info( `TradeRoom opened to trade ${assetID}.` );
    console.debug( this.model.activeItem );
  }
}
