/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class MarketsTemplates {
  constructor() {
    DevErrors.cantInstantiateStatic( 'MarketsTemplates' );
  }

  static container( content ) {
    return `
      <section id="markets" class=""> ${ content } <h3>Markets</h3> </section>
    `;
  }
}
