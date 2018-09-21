/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

page();

page( `/${NavItemID.Dashboard}`, () => {
  NavbarController._.activateItem( NavItemID.Dashboard );
} );

//page( `/${NavItemID.TradeRoom}`, () => {
//  NavbarController._.activateItem( NavItemID.TradeRoom );
//  page.redirect( `/${ NavItemID.Markets }` );
//} );

page( `/${NavItemID.Markets}`, () => {
  NavbarController._.activateItem( NavItemID.Markets );
  TradeRoomController._.openMarkets();
} );

page( `/${NavItemID.Trade}/:assetID`, ( ctx ) => {
  TradeRoomController._.tradeAsset( ctx.params.assetID );
} );

page( `/${NavItemID.Settings}`, () => {
  NavbarController._.activateItem( NavItemID.Settings );
} );
