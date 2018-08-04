class NavbarTemplates {
  constructor() {
    throw new Error("You can not instantiate NavbarTemplates (static class)");
  }

  static navIcon(iconURL) {
    // Demo.
    return `<img src="${iconURL}" alt=""/>`;
  }
}