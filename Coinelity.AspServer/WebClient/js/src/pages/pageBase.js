/**
  * Every class that extends PageBase MUST implement all properties and methods present in IPage.
  */
class PageBase extends NavbarItemBase {
  constructor(title, slug, navIconURL, content, targetElement) {
    super(navIconURL, content, targetElement);

    this.title = pageTitle;
    this.slug = slug;
  }
}
