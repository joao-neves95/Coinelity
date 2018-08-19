class ViewBase {
  /**
   * 
   * @param { string } initContent The content to inject when the page/navbar panel item get activated.
   * @param { () => HTMLElement } targetElement (optional) Function to select the DOM injection target element.
   * Default: (id) 'page-container'
   */
  constructor( initContent, targetElement = () => { return document.getElementById( 'page-container' ); } ) {
    this.initContent = initContent;
    this.targetElement = targetElement;
  }

  injectID( id ) {
    document.getElementById( 'page-container' ).firstElementChild.id = id;
  }
}
