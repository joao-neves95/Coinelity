class PageModelBase {
  /**
   * 
   * @param { string } title
   * @param { string } navIconURL
   */
  constructor(id, title, navIconURL) {
    this.id = id;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}
