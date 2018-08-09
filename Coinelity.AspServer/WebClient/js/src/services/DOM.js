class DOM {
  /**
   * 
   * @param { string } url
   * @param { HTMLElement } target Default: <body>
   */
  static addScript(url, target = document.getElementsByTagName('body')[0]) {
    let newScript = document.createElement('script');
    newScript.setAttribute('src', url);
    newScript.setAttribute('type', 'application/javascript');

    target.insertAdjacentElement('beforeend', newScript);
  }
}
