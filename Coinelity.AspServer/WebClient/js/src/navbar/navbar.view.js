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
  // #region PROPERTIES

  /**
   * Returns the current NavbarController instance.
   * @returns { NavbarView }
   */
  static get _() { return navbarView };

  get element() { return document.getElementById('sidenav-container') };

  static get pageContainer() { return document.getElementById('page-container') };

  // #endregion

  // #region METHODS

  injectIcon(iconURL) {
    // Inject.
    // this.element.innerHTML += NavbarTemplates.navIcon( iconURL );
    return;
  }

  removeActivePage() {
    NavbarView.pageContainer.innerHTML = '';
  }

  // #endregion
}