/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let topbarModel = null;

class TopbarModel {
  constructor() {
    if ( topbarModel )
      throw DevErrors.singleIntance( 'TopbarModel' );

    this.currentAccountType = UserAccountType.PaperBalance;

    this.realBalance = 0;
    this.creditsBalance = 0;
    this.paperBalance = 0;

    topbarModel = this;
    Object.seal( topbarModel );
  }

  fetchUserBalances() {
    return new Promise( async ( resolve, reject ) => {
      try {
        const userBalances = await HttpClient.get( BASE_API_URL + 'users/balances' );
        this.realBalance = userBalances.realBalance;
        this.creditsBalance = userBalances.creditsBalance;
        this.paperBalance = userBalances.paperBalance;
        return resolve( userBalances );

      } catch ( e ) {
        return reject( e );
      }
    } );
  }
}
