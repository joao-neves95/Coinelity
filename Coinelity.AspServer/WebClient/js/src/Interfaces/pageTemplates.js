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
}
