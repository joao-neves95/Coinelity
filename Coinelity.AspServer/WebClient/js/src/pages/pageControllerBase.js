/**
  * Every class that extends PageControllerBase MUST implement all properties and methods present in IPage.
  */
class PageControllerBase extends NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    super(model, view);

    this.model = model;
    this.view = view;
    this.title = model.title;
  }
}
