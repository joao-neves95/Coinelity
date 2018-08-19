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
    if ( this.model.activeContent === NavItemID.Markets )
      return;

    this.model.id = NavItemID.Markets;
    this.model.activeContent = NavItemID.Markets;
    console.info( `The TradeRoom markets were opened.` );
    console.debug( this.model.activeItem );
  }

  tradeAsset( assetID ) {
    if ( this.model.activeContent === NavItemID.Trade )
      return;

    this.model.id = NavItemID.Trade;
    this.model.activeContent = NavItemID.Trade;
    console.info( `TradeRoom opened to trade ${assetID}.` );
    console.debug( this.model.activeItem );
  }

  onSetActive() {
    console.debug( 'onSetActive fired at TradeRoomController.' );
  }
}
