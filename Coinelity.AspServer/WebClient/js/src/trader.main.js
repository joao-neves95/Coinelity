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
  Themes.apply( ThemeType.Dark, NavItemID.Dashboard );

  NavbarController._.mapItem( NavItemID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( NavItemID.Markets, new TradeRoomController() );
  NavbarController._.mapItem( NavItemID.Settings, new SettingsController() );

  NavbarController._.init();

  const cookies = document.cookie.split( ';' );
  const cookieIndex = cookies.length <= 1 ? 0 : cookies.length === 2 ? 1 : 2;
  const requestedPage = cookies[cookieIndex].split( '=' )[1].trim().substring( 3 ).replace( /(%2F)/g, '/' );

  const page = Utils.getNavItemIDFromString( requestedPage );

  if ( !page ) {
    console.info( '404 - Not Found.' ); // Show 404 page.
  }
  else
    document.getElementById( page + '_btn' ).click();

  document.cookie = 'Requested-Path=;expires=Thu, ' + new Date().toISOString() + ';';
  document.cookie = '';
});
