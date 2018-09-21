/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let marketsController = null;

class MarketsController extends ControllerBase {
  constructor() {
    if ( marketsController )
      throw DevErrors.singleIntance( 'MarketsController' );

    super(
      new MarketsModel(),
      new MarketsView()
    );

    marketsController = this;
    Object.freeze( marketsController );
  }

  get _() { return marketsController; }

  injectContent() {
    this.view.injectContainer();

    // Simulation. Temporary.
    const thisCoinName = 'BTCEUR';
    this.model.instruments.add( thisCoinName );
    this.view.addCoinCard( thisCoinName, 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png', 7000, 1.3 ); 
  }
}
