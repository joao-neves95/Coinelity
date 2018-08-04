/**
  * Every class that extends PageBase MUST implement all properties and methods present in IPage.
  */
class NavbarItemBase {
  constructor(navIconURL, content, targetElement) {
    this.navIconURL = navIconURL;
    this.content = content;
    this.targetElement = targetElement;

  }

  injectContent() {
    this.targetElement.innerHTML = this.content();
  }
}
