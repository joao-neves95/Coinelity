﻿let tradeRoomView = null;

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
