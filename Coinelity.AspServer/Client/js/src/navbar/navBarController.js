// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if (navbarController)
      throw new Error("There can only be one instance of NavBarController.")

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the page/component. To be used by the router)
     * value: object (instance of the page/component)
     */
    this.items = new Dictionary( true );

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure code.
   * @returns { NavbarController }
   */
  static get _() { return navbarController };

  /**
  * Map a page ID to its instance.
  * key: string (unique id of the page/component. To be used by the router)
  * value: object (instance of the page/component)
  * @returns {void}
  */
  mapItem(key, value) {
    this.items.add(key, value);
  }

  /**
  * @returns {void}
  */
  init() {
    // Initialize all items.
  }
}

new NavbarController();
