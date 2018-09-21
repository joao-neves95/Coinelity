/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class ModelBase {
  /**
   * @param { NavItemID } id NavItemID enum
   * Used for storing in Dictionaries and as the URL slug for pages.
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   * @param { string } title Used as label on the navbar.
   * @param { string } navIconURL
   */
  constructor( id, navbarItemType, title, navIconURL ) {
    this.id = id;
    this.navbarItemType = navbarItemType;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}
