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
    if ( navbarView )
      throw new Error( 'There can only be one instance of NavBarController.' );

    navbarView = this;
    Object.freeze( navbarView );
  }

  // #region PROPERTIES

  /**
   * Returns the current NavbarController instance.
   * 
   * @returns { NavbarView } The current NavbarView instance.
   */
  static get _() { return navbarView; };

  get element() { return document.getElementById( 'sidenav' ); }

  get iconContainer() { return document.getElementById( 'icon-container' ); }

  static get pageContainer() { return document.getElementById( 'page-container' ); }

  get toggleButtonElem() { return document.getElementById( 'sidenav-toggle' ); }
  get toggleButtonPElem() { return document.getElementById( 'sidenav-toggle-p' ); }

  getIconLabels() { return document.getElementsByClassName( 'icon-label' ); }

  // #endregion

  // #region METHODS

  injectToggleButton() {
    this.iconContainer.innerHTML += NavbarTemplates.toggleButton();
  }

  minimize() {
    this.element.style.maxWidth = SIDEBAR_MOBILE_WIDTH;
    this.element.style.minWidth = SIDEBAR_MOBILE_WIDTH;
    this.element.style.width = SIDEBAR_MOBILE_WIDTH;
    this.toggleButtonPElem.innerHTML = '&raquo;';
    NavbarView.pageContainer.style.marginLeft = SIDEBAR_MOBILE_WIDTH;

    const labels = this.getIconLabels();
    for ( let i = 0; i < labels.length; ++i ) {
      labels[i].style.display = 'none';
    }
  }

  maximize() {
    this.element.style.maxWidth = SIDEBAR_DESKTOP_WIDTH;
    this.element.style.minWidth = SIDEBAR_DESKTOP_WIDTH;
    this.element.style.width = SIDEBAR_DESKTOP_WIDTH;
    this.toggleButtonPElem.innerHTML = '&laquo;';
    NavbarView.pageContainer.style.marginLeft = SIDEBAR_DESKTOP_WIDTH;

    const labels = this.getIconLabels();
    for ( let i = 0; i < labels.length; ++i ) {
      labels[i].style.display = 'inline-block';
    }
  }

  injectIcon( url, label, linkTo = null ) {
    if ( !linkTo )
      linkTo = label.toLowerCase();

    this.iconContainer.innerHTML += NavbarTemplates.iconLink(url, label, linkTo);
  }

  removeActivePage() {
    NavbarView.pageContainer.innerHTML = '';
  }

  // #endregion
}