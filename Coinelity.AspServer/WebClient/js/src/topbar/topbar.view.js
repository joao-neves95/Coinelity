/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let topbarView = null;

class TopbarView {
  constructor() {
    if ( topbarView )
      throw DevErrors.singleIntance( 'TopbarView' );

    topbarView = this;
    Object.freeze( topbarView );
  }

  get realAccountBtn() { return document.getElementById( 'real-account-btn' ); }
  get demoAccountBtn() { return document.getElementById( 'demo-account-btn' ); }
  get logoutBtn() { return document.getElementById( 'prof-logout-btn' ); }

  activateRealAccountBtn() {
    this.__activateBtn( this.realAccountBtn );
    this.__deactivateBtn( this.demoAccountBtn );
  }

  activateRealDemoBtn() {
    this.__activateBtn( this.demoAccountBtn );
    this.__deactivateBtn( this.realAccountBtn );
  }

  /**
   * 
   * @param { HTMLElement } btnElem
   */
  __activateBtn( btnElem ) {
    btnElem.classList.add( 'active' );
    btnElem.focus();
  }

  /**
   * 
   * @param { HTMLElement } btnElem
   */
  __deactivateBtn( btnElem ) {
    btnElem.classList.remove( 'active' );
  }
}
