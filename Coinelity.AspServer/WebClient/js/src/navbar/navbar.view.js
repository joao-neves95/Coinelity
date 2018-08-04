/**
 * This stores the NavbarView instance.
 * Do not use this variable directly. Use NavbarView._ instead.
 * 
 * @type { NavbarView }
 * */
let navbarView = null;

/**
 * The NavbarView singleton. Access it with NavbarView._
 * */
class NavbarView {
  constructor() {
    if (navbarView)
      throw new Error("There can only be one instance of NavBarController.")

    navbarView = this;
    Object.freeze( navbarView );
  }

  /**
   * Returns the current NavbarController instance.
   * @returns { NavbarView }
   */
  static get _() { return navbarView };

  get element() { return document.getElementById('') };

  injectIcon(iconURL) {
    // Inject.
    this.element.innerHTML += NavbarTemplates.navIcon( iconURL );
  }
}