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
}
