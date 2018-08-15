class NavbarTemplates {
  constructor() {
    throw new Error("You can not instantiate NavbarTemplates (static class)");
  }

  static iconLink(url, label, linkTo) {
    return `
      <li class="cell">
        <a href="./${ linkTo }" class="grid-x align-middle">
          <img class="icon cell large-6" src="${ url }" alt"=${ label } Icon" />
          <figcaption class="icon-label large-6">${ label }</figcaption>
        </a>  
      </li>`;
  }

  static iconButton() {
    throw new Error('NavbarTemplates.iconButton() not implemented.');
  }

}
