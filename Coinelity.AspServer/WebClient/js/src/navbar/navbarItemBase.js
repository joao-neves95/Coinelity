/**
 * Extended by ControllerBase.
 */
class NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    this.id = model.id;
    this.navbarItemType = model.navbarItemType;
    this.navIconURL = model.navIconURL;
    this.content = view.initContent;
    this.targetElement = view.targetElement;

    this.model = model;
    this.view = view;
  }

  injectContent() {
    this.targetElement().innerHTML = this.content;
  }

  injectIDInView() {
    this.view.injectID( this.model.id );
  }

  /**
   * Event fired when the page/item is injected.
   * */
  onSetActiveBase() {
    this.injectContent();
    this.injectIDInView();

    // "in" operator to test for properties that are inherited.
    if ( 'onSetActive' in this )
      this.onSetActive();
  }
}
