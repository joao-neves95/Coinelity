/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
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
  get toggleButtonElem() { return document.getElementById( 'sidenav-toggle' ); }
  get toggleButtonPElem() { return document.getElementById( 'sidenav-toggle-p' ); }
  static get pageContainer() { return document.getElementById( 'page-container' ); }

  getIconLabels() { return document.getElementsByClassName( 'icon-label' ); }

  // #endregion

  // #region METHODS

  injectToggleButton() {
    this.iconContainer.innerHTML += NavbarTemplates.toggleButton();
  }

  minimize() {
    // "&raquo;" == "»"
    this.resize( true, SIDEBAR_MOBILE_WIDTH, '&raquo;', 'none' );
  }

  maximize() {
    // "&laquo;" == "«"
    this.resize( false, SIDEBAR_DESKTOP_WIDTH, '&laquo;', 'inline-block' );
  }

  resize( isToMinimize, width, toggleButtonLabel, iconLabelsDisplay ) {
    let toAdd;
    let toRemove;
    let pageToAdd;
    let pageToRemove;

    if ( isToMinimize ) {
      toAdd = 'sidenav-min';
      toRemove = 'sidenav-max';
      pageToAdd = 'page-max';
      pageToRemove = 'page-min';
    } else {
      toAdd = 'sidenav-max';
      toRemove = 'sidenav-min';
      pageToAdd = 'page-min';
      pageToRemove = 'page-max';
    }

    this.element.classList.remove( toRemove );
    this.element.classList.add( toAdd );
    NavbarView.pageContainer.classList.add( pageToAdd );
    NavbarView.pageContainer.classList.remove( pageToRemove );
    this.toggleButtonPElem.innerHTML = toggleButtonLabel;

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

  addActiveClassToItem( id ) {
    document.getElementById( id + '_btn' ).classList.add( 'active' );
  }

  removeActiveClassFromItem( id ) {
    document.getElementById( id + '_btn' ).classList.remove( 'active' );
  }

  // #endregion
}