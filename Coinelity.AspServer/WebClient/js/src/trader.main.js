/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

whenDomReady(() => {
  console.log( 'The DOM is ready' );

  $( document ).foundation();
  Themes.apply( ThemeType.Dark );

  NavbarController._.mapItem( NavItemID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( NavItemID.Markets, new TradeRoomController() );
  NavbarController._.mapItem( NavItemID.Settings, new SettingsController() );

  NavbarController._.init();
});
