﻿class NavbarTemplates {
  constructor() {
    throw new Error( 'You can not instantiate NavbarTemplates (static class)' );
  }

  /**
   * Used for NavbarItemType.Pages
   * 
   * @param { string } url The icon image url. White the image extention extention type (".png"/".svg"/etc.)
   * @param { string } label The icon label (E.g.: "Dashboard").
   * @param { string } linkTo The link to the page it links to. Use the traderRoutes/adminRoutes here.
   * @returns { string } HTML string content
   */
  static iconLink(url, label, linkTo) {
    return `
      <li class="cell">
        <a href="${ BASE_URL }/${ linkTo }" class="grid-x align-middle">
          <img class="icon cell large-6" src="${ url }" alt"=${ label } Icon" />
          <figcaption class="icon-label large-6">${ label }</figcaption>
        </a>  
      </li>`;
  }

  static iconButton() {
    throw new Error( 'NavbarTemplates.iconButton() not implemented.' );
  }
}