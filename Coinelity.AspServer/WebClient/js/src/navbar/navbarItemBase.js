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
 * Extended by ControllerBase.
 */
class NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    this.id = model.id;
    this.navbarItemType = model.navbarItemType;
    this.navIconURL = model.navIconURL;
    this.content = view.initContent;
    this.targetElement = view.targetElement;

    this.model = model;
    this.view = view;
  }

  injectContent( navbarItemType ) {
    if ( navbarItemType === NavbarItemType.Page )
      this.targetElement().innerHTML = PageTemplates.page( this.content );
    else if ( navbarItemType === NavbarItemType.NavbarPanelItem )
      throw DevErrors.notImplemented();
  }

  injectIDInView() {
    this.view.injectID( this.model.id );
  }

  // #region EVENTS

  /**
   * Event fired when the page/item is injected into the DOM.
   * 
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   */
  onSetActiveBase( navbarItemType ) {
    this.injectContent( navbarItemType );
    this.injectIDInView();

    // "in" operator to test for properties that are inherited by child classes.
    if ( 'onSetActive' in this )
      this.onSetActive();
  }

  /**
   * Event fired just before the page/item is destroyed (removed) from the DOM.
   */
  onBeforeDestroyBase() {
    if ( 'onBeforeDestroy' in this )
      this.onBeforeDestroy();
  }

  // #endregion
}
