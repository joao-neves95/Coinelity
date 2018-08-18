page();

page( `/${NavItemID.Dashboard}`, () => {
  NavbarController._.activateItem( NavItemID.Dashboard );
  console.info( 'Dashboard page.' );
} );

page( `/${NavItemID.TradeRoom}`, () => {
  NavbarController._.activateItem( NavItemID.TradeRoom );
  page.redirect( `/${ NavItemID.Markets }` );
} );

page( `/${NavItemID.Markets}`, () => {
  NavbarController._.activateItem( NavItemID.TradeRoom );
  TradeRoomController._.openMarkets();
} );

page( `/${NavItemID.Trade}/:assetID`, ( ctx ) => {
  TradeRoomController._.tradeAsset( ctx.params.assetID );
} );

page( `/${NavItemID.Settings}`, () => {
  NavbarController._.activateItem( NavItemID.Settings );
  console.info( 'Settings page.' );
} );
