class PageModelBase {
  /**
   * @param { string } id
   * @param { NavbarItemType } id
   * @param { string } title
   * @param { string } navIconURL
   */
  constructor(id, navbarItemType, title, navIconURL) {
    this.id = id;
    this.navbarItemType = navbarItemType;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}
