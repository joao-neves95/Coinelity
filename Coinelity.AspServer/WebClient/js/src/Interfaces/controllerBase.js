/**
  * Every class that extends ControllerBase MUST implement all properties and methods present in IController.
  */
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
