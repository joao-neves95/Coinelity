/**
  * Every class that extends PageBase MUST implement all properties and methods present in IPage.
  */
class PageBase {
  constructor(navIcon, content, targetElement) {
    this.navIcon = navIcon;
    this.content = content;
    this.targetElement = targetElement;
  }

  injectContent() {
    this.targetElement.innerHTML = this.content();
  }
}
