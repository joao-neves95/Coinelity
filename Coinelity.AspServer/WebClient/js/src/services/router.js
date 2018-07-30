// https://developer.mozilla.org/en-US/docs/Web/API/History
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// Examples: https://html5demos.com/history/, http://krasimirtsonev.com/blog/article/deep-dive-into-client-side-routing-navigo-pushstate-hash
// .pushState()

/**
 * This stores the Router instance.
 * Do not use this variable directly. Use Router._ instead.
 * */
let router = null;

/**
 * The Router singleton.
 * */
class Router {
  constructor() {
    if (router)
      throw new Error("There can only be one instance of Router.")

    router = this;
    Object.freeze( router );
  }

  /**
 * Return the current Router instance.
 * Same as using router, but don't use it a more secure code.
 * @returns { NavbarController }
 */
  static get _() { return navbarController };

  setTile(title) {

  }

  on(path, callback) {

  }

  notFound() {

  }

  addStyleSheet(url) {

  }

  addScript(url) {

  }

}

