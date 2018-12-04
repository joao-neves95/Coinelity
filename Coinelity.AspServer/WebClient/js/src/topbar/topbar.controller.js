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

  init() {
    this.model.fetchUserBalances();
  }
}
