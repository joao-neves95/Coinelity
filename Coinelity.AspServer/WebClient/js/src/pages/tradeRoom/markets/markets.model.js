/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

let marketsModel = null;

class MarketsModel extends ModelBase {
  constructor() {
    if ( marketsModel )
      throw DevErrors.singleIntance( 'MarketsModel' );

    super( '', '', '', '' );

    marketsView = this;
    Object.freeze( marketsView );
  }
}
