class ModelBase {
  /**
   * @param { PageID } id PageID enum
   * @param { NavbarItemType } id NavbarItemType enum
   * @param { string } title
   * @param { string } navIconURL
   */
  constructor( id, navbarItemType, title, navIconURL ) {
    this.id = id;
    this.navbarItemType = navbarItemType;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}
