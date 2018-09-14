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

  injectContent( navbarItemType ) {
    if ( navbarItemType === NavbarItemType.Page )
      this.targetElement().innerHTML = PageTemplates.page( this.content );
    else if ( navbarItemType === NavbarItemType.NavbarPanelItem )
      throw DevErrors.notImplemented();
  }

  injectIDInView() {
    this.view.injectID( this.model.id );
  }

  /**
   * Event fired when the page/item is injected into the DOM.
   * 
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   * */
  onSetActiveBase( navbarItemType ) {
    this.injectContent( navbarItemType );
    this.injectIDInView();

    // "in" operator to test for properties that are inherited by child classes.
    if ( 'onSetActive' in this )
      this.onSetActive();
  }
}
