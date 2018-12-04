/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let topnavController = null;

class TopnavController {
  constructor() {
    if ( topnavController )
      throw DevErrors.singleIntance( 'TopnavController' );

    this.model = new TopbarModel();
    this.view = new TopbarView();

    topnavController = this;
    Object.freeze( topnavController );
  }

  /**
   * @returns { TopnavController }
   */
  static get _() { return topnavController; }

  init() {
    this.__addListeners();
    this.model.fetchUserBalances();
  }

  __addListeners() {
    DOM.on( 'click', this.view.realAccountBtn, () => {
      this.view.activateRealAccountBtn();
      this.model.currentAccountType = UserAccountType.RealBalance;
    } );

    DOM.on( 'click', this.view.demoAccountBtn, () => {
      this.view.activateRealDemoBtn();
      this.model.currentAccountType = UserAccountType.PaperBalance;
    } );

    DOM.on( 'click', this.view.logoutBtn, () => {
      Authentication._.logout();
    } );
  }
}

new TopnavController();
