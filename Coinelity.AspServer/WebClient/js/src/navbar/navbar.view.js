/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

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
    this.resize( SIDEBAR_MOBILE_WIDTH, '&raquo;', 'none' );
  }

  maximize() {
    this.resize( SIDEBAR_DESKTOP_WIDTH, '&laquo;', 'inline-block' );
  }

  resize( width, toggleButtonLabel, iconLabelsDisplay ) {
    this.element.style.maxWidth = width;
    this.element.style.minWidth = width;
    this.element.style.width = width;
    this.toggleButtonPElem.innerHTML = toggleButtonLabel;
    NavbarView.pageContainer.style.marginLeft = width;

    const labels = this.getIconLabels();
    for ( let i = 0; i < labels.length; ++i ) {
      labels[i].style.display = iconLabelsDisplay;
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