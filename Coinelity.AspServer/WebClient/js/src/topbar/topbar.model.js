let topbarModel = null;

class TopbarModel {
  constructor() {
    if ( topbarModel )
      throw DevErrors.singleIntance( 'TopbarModel' );

    this.userAccountType = UserAccountType.PaperBalance;

    this.realBalance = 0;
    this.creditsBalance = 0;
    this.paperBalance = 0;

    topbarModel = this;
    Object.freeze( topbarModel );
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
