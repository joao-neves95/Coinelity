let navbarModel = null;

class NavbarModel {
  constructor() {
    if ( navbarModel )
      throw new Error( 'There can only be one instance of NavBarModel.' );

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     */
    this.items = new Dictionary( true );
    this.activePage = null;
    this.activeNavbarPanelItem = null;

    navbarModel = this;
    Object.seal( navbarModel );
  }

  static get _() { return navbarModel; }
}
