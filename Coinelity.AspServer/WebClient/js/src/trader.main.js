/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

whenDomReady(() => {
  console.log( 'Trader.' );
  console.log( 'The DOM is ready' );

  $( document ).foundation();
  Themes.apply( ThemeType.Dark );

  NavbarController._.mapItem( NavItemID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( NavItemID.Markets, new TradeRoomController() );
  NavbarController._.mapItem( NavItemID.Settings, new SettingsController() );

  NavbarController._.init();

  // This gives an error if it exists more than 1 cookie (of course).
  const requestedPage = document.cookie.split( '=' )[1].substring(3).replace( '%2F', '/' );
  const page = Utils.getNavItemIDFromString( requestedPage );

  if ( !page )
    console.info('404 - Not Found.'); // Show 404 page.
  else
    document.getElementById( page + '_btn' ).click();

  document.cookie = 'Requested-Path=;expires=Thu, ' + new Date().toISOString() + ';';
});
