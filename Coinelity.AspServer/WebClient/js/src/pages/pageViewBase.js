class PageViewBase {
  /**
   * 
   * @param { () => HTMLElement } targetElement (optional) Function to select the DOM injection target element.
   * @param { string } initContent
   */
  constructor(initContent, targetElement = () => { return document.getElementById('page-container'); }) {
    this.initContent = initContent;
    this.targetElement = targetElement;
  }
}
