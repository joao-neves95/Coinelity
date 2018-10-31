/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let navbarModel = null;

class NavbarModel {
  constructor() {
    if ( navbarModel )
      throw DevErrors.singleIntance( 'NavbarModel' );

    /**
     * Dictionary mapping the pages and panel items.
     * 
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     * 
     * @type { Dictionary }
     */
    this.items = new Dictionary( true );
    /** 
     * The ID of the active page. 
     * @type { string? } 
     */
    this.activePageId = null;
    /** @type { string? } */
    this.activeNavbarPanelItemId = null;
    this.toggled = false;

    navbarModel = this;
    Object.seal( navbarModel );
  }

  static get _() { return navbarModel; }
}
