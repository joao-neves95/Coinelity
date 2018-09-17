class PageTemplates {
  /**
   * 
   * @param { string } content The content to insert inside the global page template.
   * 
   * @returns { string }
   */
  static page(content) {
    return `
      <main class="page">
        ${content}
      </main>`;
  }

  static inputElem( label, type, id, placeholder = '' ) {
    return `
      <label>${ label}
        <input type="${ type}" id="${id}">
      </label>
    `;
  }
}
