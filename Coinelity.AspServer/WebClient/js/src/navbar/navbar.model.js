let navbarModel = null;

class NavbarModel {
  constructor() {
    if ( navbarModel )
      throw new Error( 'There can only be one instance of NavBarModel.' );

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     * 
     * @type { Dictionary }
     */
    this.items = new Dictionary( true );
    /** 
     * The ID of the active page. 
     * @type { string } 
     */
    this.activePageId = null;
    this.activeNavbarPanelItem = null;
    /** @type { boolean } */
    this.toggled = false;

    navbarModel = this;
    Object.seal( navbarModel );
  }

  static get _() { return navbarModel; }
}
