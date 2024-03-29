﻿/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * 
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if ( navbarController )
      throw DevErrors.singleIntance( 'NavBarController' );

    /**
     * @type { NavbarView }
     * */
    this.view = new NavbarView();

    /**
     * @type { NavbarModel }
     * */
    this.model = new NavbarModel();

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure (error free) code.
   * @returns { NavbarController } NavbarController
   */
  static get _() { return navbarController; }

  /**
  * Map a page/item ID to its instance.
  * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
  * value: object (instance of the Page | NavbarPanelItem)
  * @param { string } key Unique id of the Page | NavbarPanelItem.
  * @param { object } value Instance of Page | NavbarPanelItem.
  * @returns { void }
  */
  mapItem( key, value ) {
    this.model.items.add( key, value );
  }

  /**
  * @returns {void}
  */
  init() {
    this.view.injectToggleButton();

    const thisItems = this.model.items;
    for (let i = 0; i < thisItems.length; ++i) {
      const thisItemModel = thisItems.getByIndex( i ).model;
      this.injectIcon( thisItemModel.navIconURL, thisItemModel.title, thisItemModel.id );
    }

    DOM.on( 'click', this.view.toggleButtonElem, ( e ) => {
      e.preventDefault();

      if ( this.model.toggled ) {
        this.view.maximize();
        this.model.toggled = false;
      } else {
        this.view.minimize();
        this.model.toggled = true;
      }
    } );

    this.activateItem( NavItemID.Dashboard );
  }

  injectIcon(url, label, linkTo = null) {
    this.view.injectIcon( url, label, linkTo );
  }

  /**
   * Activate an item stored in the navbarController.
   * You must pass one of the two.
   * 
   * @param { NavItemID } itemId NavItemID enum
   * @param { NavbarItemBase } thisItem Instance of Page | NavbarPanelItem.
   */
  activateItem( itemId = null, thisItem = null ) {
    if ( !thisItem ) {
      thisItem = this.model.items.getByKey( itemId );
    }

    if ( thisItem.navbarItemType === NavbarItemType.Page ) {
      if ( this.model.activePageId === itemId )
        return;

      else {
        if ( this.model.activePageId !== null ) {
          /** @type { NavbarItemBase } */
          const lastActiveItem = this.model.items.getByKey( this.model.activePageId );
          this.view.removeActiveClassFromItem( this.model.activePageId );
          lastActiveItem.onBeforeDestroyBase();
        }
      }

      this.view.removeActivePage();
      this.model.activePageId = itemId;
      this.view.addActiveClassToItem( itemId );

    } else if ( thisItem.navbarItemType === NavbarItemType.NavbarPanelItem ) {
      if ( this.model.activeNavbarPanelItemId === itemId )
        return;

      else {
        if ( this.model.activeNavbarPanelItemId !== null ) {
          /** @type { NavbarItemBase } */
          const lastActiveItem = this.model.items.getByKey( this.model.activeNavbarPanelItemId );
          lastActiveItem.onBeforeDestroyBase();
        }
      }

      //this.view.removeActivePanelItem();
      this.model.activeNavbarPanelItemId = itemId;
    }

    thisItem.onSetActiveBase( thisItem.navbarItemType );
  }
}

new NavbarController();
