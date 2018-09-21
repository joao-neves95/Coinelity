﻿/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let tradeRoomView = null;

class TradeRoomView extends ViewBase {
  constructor() {
    if ( tradeRoomView )
      throw DevErrors.singleIntance( 'TradeRoomView' );

    super( '' );

    tradeRoomView = this;
    Object.freeze( tradeRoomView );
  }

  static get _() { return tradeRoomView; }

  get element() { return document.getElementById( NavItemID.Markets ); }

  injectContent( content ) {
    this.element.innerHTML = content;
  }

  addContent( content ) {
    this.element.innerHTML += content;
  }

  clearContent() {
    this.element.innerHTML = '';
  }
}
