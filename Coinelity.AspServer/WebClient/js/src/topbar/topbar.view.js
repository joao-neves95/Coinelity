let topbarView = null;

class TopbarView {
  constructor() {
    if ( topbarView )
      throw DevErrors.singleIntance( 'TopbarView' );

    topbarView = this;
    Object.freeze( topbarView );
  }
}
