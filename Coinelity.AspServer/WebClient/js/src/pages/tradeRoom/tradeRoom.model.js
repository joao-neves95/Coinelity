let tradeRoomModel = null;

class TradeRoomModel extends ModelBase {
  constructor() {
    if ( tradeRoomModel )
      throw new Error( 'There can only be one instance of TradeRoomModel.' );

    super( NavItemID.Markets, NavbarItemType.Page, 'Trade Room', '' );

    this.activeItem = NavItemID.Markets;

    tradeRoomModel = this;
    Object.seal( tradeRoomModel );
  }

  static get _() { return tradeRoomModel; }
}
