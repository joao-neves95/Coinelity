let tradeRoomController = null;

class TradeRoomController extends ControllerBase {
  constructor() {
    if ( tradeRoomController )
      throw new Error( 'There can only be one instance of TradeRoomController.');

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

  openMarkets() {
    this.model.id = NavItemID.TradeRoom + NavItemID.Markets;
    this.model.activeItem = NavItemID.Markets;
    console.info( `The TradeRoom markets were opened.` );
    console.debug( this.model.activeItem );
  }

  tradeAsset( assetID ) {
    this.model.id = NavItemID.TradeRoom + NavItemID.Trade;
    this.model.activeItem = NavItemID.Trade;
    console.info( `TradeRoom opened to trade ${assetID}.` );
    console.debug( this.model.activeItem );
  }
}
