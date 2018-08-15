whenDomReady(() => {
  console.log( 'The DOM is ready' );

  $( document ).foundation();
  Themes.apply( ThemeType.Dark );

  NavbarController._.mapItem( PageID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( PageID.Settings, new SettingsController() );

  NavbarController._.init();
});
