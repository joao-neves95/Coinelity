﻿// Singleton.
// This variable is a hack because there can be no static properties in JavaScript...
// Do not use it as it would break the singleton concept.

/**
 * Do not use this variable directly. Use NavbarController.instance instead.
 * */
let navBarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController.instance
 * */
class NavbarController {
  constructor() {
    if (navBarController)
      throw new Error("There can only be one instance of NavBarController.")

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the page/component. To be used by the router)
     * value: object (instance of the page/component)
     */
    this.items = new Dictionary( true );

    navBarController = this;
    Object.freeze( navBarController );
  }

  /**
   * Return the current NavbarController instance.
   * Same as using navBarController, but don't use it.
   * @returns { NavbarController }
   */
  static get instance() { return navBarController };

  /**
  * Map a page ID to its instance.
  * key: string (unique id of the page/component. To be used by the router)
  * value: object (instance of the page/component)
  */
  mapItem(key, value) {
    this.items.add(key, value);
  }

  init() {
    // Initialize all items.
  }
}

new NavbarController();
