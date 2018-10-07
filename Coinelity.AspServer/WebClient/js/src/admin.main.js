/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

whenDomReady(() => {
  console.log('The DOM is ready');
  console.log( 'User has ADMIN rigths.' );

  NavbarController._.mapItem('app-analitics-dashboard', new AppAnaliticsBoardController());
});
