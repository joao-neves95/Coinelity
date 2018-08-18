whenDomReady(() => {
  console.log( 'The DOM is ready' );

  $( document ).foundation();
  Themes.apply( ThemeType.Dark );

  NavbarController._.mapItem( NavItemID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( NavItemID.TradeRoom, new TradeRoomController() );
  NavbarController._.mapItem( NavItemID.Settings, new SettingsController() );

  NavbarController._.init();
});
