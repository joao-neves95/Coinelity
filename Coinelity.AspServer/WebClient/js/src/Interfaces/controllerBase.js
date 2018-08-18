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

  /**
   * Event fired when the page/item is injected.
   * */
  onSetActive() {
    this.injectIDInView();
  }

  injectIDInView() {
    this.view.injectID( this.model.id );
  }
}
