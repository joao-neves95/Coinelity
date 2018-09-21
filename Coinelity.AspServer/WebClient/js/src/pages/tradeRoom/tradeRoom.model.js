/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeRoomModel = null;

class TradeRoomModel extends ModelBase {
  constructor() {
    if ( tradeRoomModel )
      throw new Error( 'There can only be one instance of TradeRoomModel.' );

    super( NavItemID.Markets, NavbarItemType.Page, 'Trade Room', TRADE_ROOM_ICON_URL );

    this.activeContentId = NavItemID.Markets;

    tradeRoomModel = this;
    Object.seal( tradeRoomModel );
  }

  static get _() { return tradeRoomModel; }
}
