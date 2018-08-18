let tradeRoomView = null;

class TradeRoomView extends ViewBase {
  constructor() {
    if ( tradeRoomView )
      throw new Error( 'There can only be one instance of TradeRoomView.' );

    super( PageTemplates.page( '<h1>Trade Room</h1>' ) );

    tradeRoomView = this;
    Object.freeze( tradeRoomView );
  }

  static get _() { return tradeRoomView; }
}
