/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

/**
 * Available events:
 * - onSetActive(): Event fired when the page/item is injected into the DOM.
 * - onBeforeDestroy(): Fired just before the page/item is destroyed (removed) from the DOM.
 * */
class ControllerBase extends NavbarItemBase {
  /**
   * 
   * @param { ModelBase } model An extended ModelBase.
   * @param { ViewBase } view An extended ViewBase.
   */
  constructor( model, view ) {
    super( model, view );

    this.model = model;
    this.view = view;
  }
}
