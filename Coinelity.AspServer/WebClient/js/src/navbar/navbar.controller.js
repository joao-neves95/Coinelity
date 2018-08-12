﻿// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * 
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if (navbarController)
      throw new Error( 'There can only be one instance of NavBarController.' );

    this.view = new NavbarView();

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     */
    this.items = new Dictionary(true);
    this.activePage = null;
    this.activeNavbarPanelItem = null;

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure (error free) code.
   * @returns { NavbarController }
   */
  static get _() { return navbarController };

  /**
  * Map a page ID to its instance.
  * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
  * value: object (instance of the Page | NavbarPanelItem)
  * @param { string } key Unique id of the Page | NavbarPanelItem.
  * @param { object } value Instance of Page | NavbarPanelItem.
  * @returns { void }
  */
  mapItem(key, value) {
    this.items.add(key, value);
  }

  /**
  * @returns {void}
  */
  init() {
    for (let i = 0; i < this.items.length; ++i) {
      const thisItemModel = this.items.getByIndex(i).model;
      this.injectIcon(thisItemModel.navIconURL, thisItemModel.title, thisItemModel.id);
    }

    this.activateItem( 'dashboard' );
  }

  injectIcon(url, label, linkTo = null) {
    this.view.injectIcon(url, label, linkTo);
  }

  /**
   * Activate an item stored in the navbarController.
   * You must pass one of the two.
   * 
   * @param { string } itemId
   * @param { NavbarItemBase } thisItem Instance of Page | NavbarPanelItem.
   * 
   * @return {NavbarItem}
   */
  activateItem(itemId = null, thisItem = null) {
    console.debug('activate item')
    if (!thisItem)
      thisItem = this.items.getByKey( itemId );

    if (thisItem.navbarItemType === NavbarItemType.Page)
      this.view.removeActivePage();

    thisItem.injectContent();
    thisItem.onSetActive();
  }
}

new NavbarController();
