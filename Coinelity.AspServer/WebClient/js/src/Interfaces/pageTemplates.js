/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

/**
 * These templates depend on the Foundation framework.
 */
class PageTemplates {
  /**
   * 
   * @param { string } content The content to insert inside the global page template.
   * 
   * @returns { string } HTML string.
   */
  static page(content) {
    return `
      <main class="page">
        ${content}
      </main>`;
  }

  static inputElem( label, type, id, placeholder = '', additionalAttributes = '' ) {
    return `
      <label>${label}
        <input type="${type}" placeholder="${placeholder}" id="${id}" ${additionalAttributes}>
      </label>
    `;
  }

  static inputNumElem( label, id, min, max, placeholder = '', additionalAttributes = '' ) {
    return PageTemplates.inputElem( label, 'number', id, placeholder, `min="${min.toString()}" max="${max.toString()}" ` + additionalAttributes );
  }

  static successButton(label, id, addicionalClasses = '') {
    return `
      <a id="${id}" class="success button ${addicionalClasses}">${label}</a>
    `;
  }
}
