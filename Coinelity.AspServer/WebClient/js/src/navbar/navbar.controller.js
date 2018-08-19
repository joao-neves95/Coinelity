// This variable is a hack because there can be no static properties in JavaScript classes...
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

    /**
     * @type { NavbarView }
     * */
    this.view = new NavbarView();

    /**
     * @type { NavbarModel }
     * */
    this.model = new NavbarModel();

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     */
    //this.items = new Dictionary(true);
    //this.activePage = null;
    //this.activeNavbarPanelItem = null;

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure (error free) code.
   * @returns { NavbarController } NavbarController
   */
  static get _() { return navbarController; }

  /**
  * Map a page/item ID to its instance.
  * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
  * value: object (instance of the Page | NavbarPanelItem)
  * @param { string } key Unique id of the Page | NavbarPanelItem.
  * @param { object } value Instance of Page | NavbarPanelItem.
  * @returns { void }
  */
  mapItem( key, value ) {
    this.model.items.add( key, value );
  }

  /**
  * @returns {void}
  */
  init() {
    const thisItems = this.model.items;
    for (let i = 0; i < thisItems.length; ++i) {
      const thisItemModel = thisItems.getByIndex(i).model;
      this.injectIcon(thisItemModel.navIconURL, thisItemModel.title, thisItemModel.id);
    }

    this.activateItem( NavItemID.Dashboard );
  }

  injectIcon(url, label, linkTo = null) {
    this.view.injectIcon(url, label, linkTo);
  }

  /**
   * Activate an item stored in the navbarController.
   * You must pass one of the two.
   * 
   * @param { NavItemID } itemId NavItemID enum
   * @param { NavbarItemBase } thisItem Instance of Page | NavbarPanelItem.
   */
  activateItem( itemId = null, thisItem = null ) {
    if ( !thisItem ) {
      thisItem = this.model.items.getByKey( itemId );
      itemId = thisItem.id;
    }

    if ( thisItem.navbarItemType === NavbarItemType.Page ) {
      if ( this.model.activePage === itemId )
        return;

      this.view.removeActivePage();
      this.model.activePage = itemId;
    } else if ( thisItem.navbarItemType === NavbarItemType.NavbarPanelItem ) {
      if ( this.model.activeNavbarPanelItem === itemId )
        return;

      this.model.activeNavbarPanelItem = itemId;
    }

    thisItem.onSetActiveBase();
  }
}

new NavbarController();
