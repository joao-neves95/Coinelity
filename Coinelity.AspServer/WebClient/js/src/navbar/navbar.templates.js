/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class NavbarTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'NavbarTemplates' );
  }

  static toggleButton() {
    return `
      <li class="cell li-toggle">
        <a id="sidenav-toggle">
          <p id="sidenav-toggle-p"> &laquo; </p>
        </a>
      </li>
    `;
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
        <a href="${ BASE_URL + linkTo}" class="grid-x align-middle" id="${linkTo}_btn">
          <img class="icon cell large-6" src="${ url }" alt"=${ label } Icon" />
          <figcaption class="icon-label large-6">${ label }</figcaption>
        </a>  
      </li>`;
  }

  static iconButton() {
    throw DevErrors.notImplemented();
  }
}
