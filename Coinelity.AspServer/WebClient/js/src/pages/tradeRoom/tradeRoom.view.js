/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

let tradeRoomView = null;

class TradeRoomView extends ViewBase {
  constructor() {
    if ( tradeRoomView )
      throw new Error( 'There can only be one instance of TradeRoomView.' );

    super( `<h1>Trade Room</h1><br/>${MarketsTemplates.container( '' )}` );

    tradeRoomView = this;
    Object.freeze( tradeRoomView );
  }

  static get _() { return tradeRoomView; }
}
