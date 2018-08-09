// @import '/enums/navbarItemType'
// @import '/services/externalLibs'
// @import '/services/utils'
// @import '/services/DOM'
// @import '/services/router'
// @import '/navbar/navbarItemBase'
// @import '/pages/pageViewBase'
// @import '/pages/pageModelBase'
// @import '/pages/pageControllerBase'
// @import '/pages/dashboard/dashboard.templates'
// @import '/pages/dashboard/dashboard.view'
// @import '/pages/dashboard/dashboard.model'
// @import '/pages/dashboard/dashboard.controller'
// @import '/navbar/navbar.templates'
// @import '/navbar/navbar.view'
// @import '/navbar/navbar.controller'
// @import '/services/traderRoutes'
// @import 'trader.main'
'use strict'
﻿const NavbarItemType = Object.freeze({
  Page: 1,
  NavbarPanelItem: 2,
  Modal: 3
});
﻿// when-dom-ready
// https://github.com/lukechilds/when-dom-ready
!function (e, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.whenDomReady = n() }(this, function () { "use strict"; var e = ["interactive", "complete"], n = function (n, t) { return new Promise(function (o) { n && "function" != typeof n && (t = n, n = null), t = t || window.document; var i = function () { return o(void (n && setTimeout(n))) }; -1 !== e.indexOf(t.readyState) ? i() : t.addEventListener("DOMContentLoaded", i) }) }; return n.resume = function (e) { return function (t) { return n(e).then(function () { return t }) } }, n });

// Page.js
// https://github.com/visionmedia/page.js/
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.page = e() }(this, function () { "use strict"; var p = Array.isArray || function (t) { return "[object Array]" == Object.prototype.toString.call(t) }, n = h, t = a, e = function (t) { return o(a(t)) }, r = o, i = c, x = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"), "g"); function a(t) { for (var e, n, r = [], i = 0, o = 0, a = ""; null != (e = x.exec(t));) { var s = e[0], c = e[1], h = e.index; if (a += t.slice(o, h), o = h + s.length, c) a += c[1]; else { a && (r.push(a), a = ""); var p = e[2], f = e[3], u = e[4], l = e[5], d = e[6], m = e[7], v = "+" === d || "*" === d, g = "?" === d || "*" === d, y = p || "/", w = u || l || (m ? ".*" : "[^" + y + "]+?"); r.push({ name: f || i++, prefix: p || "", delimiter: y, optional: g, repeat: v, pattern: (n = w, n.replace(/([=!:$\/()])/g, "\\$1")) }) } } return o < t.length && (a += t.substr(o)), a && r.push(a), r } function o(c) { for (var h = new Array(c.length), t = 0; t < c.length; t++)"object" == typeof c[t] && (h[t] = new RegExp("^" + c[t].pattern + "$")); return function (t) { for (var e = "", n = t || {}, r = 0; r < c.length; r++) { var i = c[r]; if ("string" != typeof i) { var o, a = n[i.name]; if (null == a) { if (i.optional) continue; throw new TypeError('Expected "' + i.name + '" to be defined') } if (p(a)) { if (!i.repeat) throw new TypeError('Expected "' + i.name + '" to not repeat, but received "' + a + '"'); if (0 === a.length) { if (i.optional) continue; throw new TypeError('Expected "' + i.name + '" to not be empty') } for (var s = 0; s < a.length; s++) { if (o = encodeURIComponent(a[s]), !h[r].test(o)) throw new TypeError('Expected all "' + i.name + '" to match "' + i.pattern + '", but received "' + o + '"'); e += (0 === s ? i.prefix : i.delimiter) + o } } else { if (o = encodeURIComponent(a), !h[r].test(o)) throw new TypeError('Expected "' + i.name + '" to match "' + i.pattern + '", but received "' + o + '"'); e += i.prefix + o } } else e += i } return e } } function f(t) { return t.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1") } function s(t, e) { return t.keys = e, t } function u(t) { return t.sensitive ? "" : "i" } function c(t, e) { for (var n = (e = e || {}).strict, r = !1 !== e.end, i = "", o = t[t.length - 1], a = "string" == typeof o && /\/$/.test(o), s = 0; s < t.length; s++) { var c = t[s]; if ("string" == typeof c) i += f(c); else { var h = f(c.prefix), p = c.pattern; c.repeat && (p += "(?:" + h + p + ")*"), i += p = c.optional ? h ? "(?:" + h + "(" + p + "))?" : "(" + p + ")?" : h + "(" + p + ")" } } return n || (i = (a ? i.slice(0, -2) : i) + "(?:\\/(?=$))?"), i += r ? "$" : n && a ? "" : "(?=\\/|$)", new RegExp("^" + i, u(e)) } function h(t, e, n) { return p(e = e || []) ? n || (n = {}) : (n = e, e = []), t instanceof RegExp ? function (t, e) { var n = t.source.match(/\((?!\?)/g); if (n) for (var r = 0; r < n.length; r++)e.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, pattern: null }); return s(t, e) }(t, e) : p(t) ? function (t, e, n) { for (var r = [], i = 0; i < t.length; i++)r.push(h(t[i], e, n).source); return s(new RegExp("(?:" + r.join("|") + ")", u(n)), e) }(t, e, n) : function (t, e, n) { for (var r = a(t), i = c(r, n), o = 0; o < r.length; o++)"string" != typeof r[o] && e.push(r[o]); return s(i, e) }(t, e, n) } n.parse = t, n.compile = e, n.tokensToFunction = r, n.tokensToRegExp = i; var l = L; (L.default = L).Context = P, L.Route = S, L.sameOrigin = N; var d, m, v, g = "undefined" != typeof document, y = "undefined" != typeof window, w = "undefined" != typeof history, b = "undefined" != typeof process, E = g && document.ontouchstart ? "touchstart" : "click", R = y && !(!window.history.location && !window.location), k = !0, A = !0, T = "", O = !1, C = !1; function L(t, e) { if ("function" == typeof t) return L("*", t); if ("function" == typeof e) for (var n = new S(t), r = 1; r < arguments.length; ++r)L.callbacks.push(n.middleware(arguments[r])); else "string" == typeof t ? L["string" == typeof e ? "redirect" : "show"](t, e) : L.start(t) } function U(t) { return "string" != typeof t ? t : A ? decodeURIComponent(t.replace(/\+/g, " ")) : t } function P(t, e) { var n = I(); "/" === t[0] && 0 !== t.indexOf(n) && (t = n + (C ? "#!" : "") + t); var r = t.indexOf("?"); if (this.canonicalPath = t, this.path = t.replace(n, "") || "/", C && (this.path = this.path.replace("#!", "") || "/"), this.title = g && v.document.title, this.state = e || {}, this.state.path = t, this.querystring = ~r ? U(t.slice(r + 1)) : "", this.pathname = U(~r ? t.slice(0, r) : t), this.params = {}, this.hash = "", !C) { if (!~this.path.indexOf("#")) return; var i = this.path.split("#"); this.path = this.pathname = i[0], this.hash = U(i[1]) || "", this.querystring = this.querystring.split("#")[0] } } function S(t, e) { (e = e || {}).strict = e.strict || O, this.path = "*" === t ? "(.*)" : t, this.method = "GET", this.regexp = n(this.path, this.keys = [], e) } L.callbacks = [], L.exits = [], L.current = "", L.len = 0, L.base = function (t) { if (0 === arguments.length) return T; T = t }, L.strict = function (t) { if (0 === arguments.length) return O; O = t }, L.start = function (t) { if (t = t || {}, !d && (d = !0, v = t.window || y && window, !1 === t.dispatch && (k = !1), !1 === t.decodeURLComponents && (A = !1), !1 !== t.popstate && y && v.addEventListener("popstate", $, !1), !1 !== t.click && g && v.document.addEventListener(E, j, !1), (C = !!t.hashbang) && y && !w && v.addEventListener("hashchange", $, !1), k)) { var e; if (R) { var n = v.location; e = C && ~n.hash.indexOf("#!") ? n.hash.substr(2) + n.search : C ? n.search + n.hash : n.pathname + n.search + n.hash } L.replace(e, null, !0, k) } }, L.stop = function () { d && (L.current = "", L.len = 0, d = !1, g && v.document.removeEventListener(E, j, !1), y && v.removeEventListener("popstate", $, !1), y && v.removeEventListener("hashchange", $, !1)) }, L.show = function (t, e, n, r) { var i = new P(t, e), o = m; return L.current = (m = i).path, !1 !== n && L.dispatch(i, o), !1 !== i.handled && !1 !== r && i.pushState(), i }, L.back = function (t, e) { 0 < L.len ? (w && v.history.back(), L.len--) : t ? setTimeout(function () { L.show(t, e) }) : setTimeout(function () { L.show(I(), e) }) }, L.redirect = function (t, e) { "string" == typeof t && "string" == typeof e && L(t, function (t) { setTimeout(function () { L.replace(e) }, 0) }), "string" == typeof t && void 0 === e && setTimeout(function () { L.replace(t) }, 0) }, L.replace = function (t, e, n, r) { var i = new P(t, e), o = m; return L.current = (m = i).path, i.init = n, i.save(), !1 !== r && L.dispatch(i, o), i }, L.dispatch = function (e, n) { var r = 0, i = 0; function o() { var t = L.callbacks[r++]; if (e.path === L.current) return t ? void t(e, o) : function (t) { if (t.handled) return; var e; e = C ? R && I() + v.location.hash.replace("#!", "") : R && v.location.pathname + v.location.search; if (e === t.canonicalPath) return; L.stop(), t.handled = !1, R && (v.location.href = t.canonicalPath) }(e); e.handled = !1 } n ? function t() { var e = L.exits[i++]; if (!e) return o(); e(n, t) }() : o() }, L.exit = function (t, e) { if ("function" == typeof t) return L.exit("*", t); for (var n = new S(t), r = 1; r < arguments.length; ++r)L.exits.push(n.middleware(arguments[r])) }, (L.Context = P).prototype.pushState = function () { L.len++ , w && v.history.pushState(this.state, this.title, C && "/" !== this.path ? "#!" + this.path : this.canonicalPath) }, P.prototype.save = function () { w && "file:" !== v.location.protocol && v.history.replaceState(this.state, this.title, C && "/" !== this.path ? "#!" + this.path : this.canonicalPath) }, (L.Route = S).prototype.middleware = function (n) { var r = this; return function (t, e) { if (r.match(t.path, t.params)) return n(t, e); e() } }, S.prototype.match = function (t, e) { var n = this.keys, r = t.indexOf("?"), i = ~r ? t.slice(0, r) : t, o = this.regexp.exec(decodeURIComponent(i)); if (!o) return !1; for (var a = 1, s = o.length; a < s; ++a) { var c = n[a - 1], h = U(o[a]); void 0 === h && hasOwnProperty.call(e, c.name) || (e[c.name] = h) } return !0 }; var $ = function () { var r = !1; if (y) return g && "complete" === document.readyState ? r = !0 : window.addEventListener("load", function () { setTimeout(function () { r = !0 }, 0) }), function (t) { if (r) if (t.state) { var e = t.state.path; L.replace(e, t.state) } else if (R) { var n = v.location; L.show(n.pathname + n.hash, void 0, void 0, !1) } } }(); function j(t) { var e; if (1 === (null == (e = (e = t) || y && window.event).which ? e.button : e.which) && !(t.metaKey || t.ctrlKey || t.shiftKey || t.defaultPrevented)) { var n = t.target, r = t.path || (t.composedPath ? t.composedPath() : null); if (r) for (var i = 0; i < r.length; i++)if (r[i].nodeName && "A" === r[i].nodeName.toUpperCase() && r[i].href) { n = r[i]; break } for (; n && "A" !== n.nodeName.toUpperCase();)n = n.parentNode; if (n && "A" === n.nodeName.toUpperCase()) { var o = "object" == typeof n.href && "SVGAnimatedString" === n.href.constructor.name; if (!n.hasAttribute("download") && "external" !== n.getAttribute("rel")) { var a = n.getAttribute("href"); if ((C || !function (t) { if (!R) return !1; var e = v.location; return t.pathname === e.pathname && t.search === e.search }(n) || !n.hash && "#" !== a) && !(a && -1 < a.indexOf("mailto:")) && (o ? !n.target.baseVal : !n.target) && (o || N(n.href))) { var s = o ? n.href.baseVal : n.pathname + n.search + (n.hash || ""); s = "/" !== s[0] ? "/" + s : s, b && s.match(/^\/[a-zA-Z]:\//) && (s = s.replace(/^\/[a-zA-Z]:\//, "/")); var c = s, h = I(); 0 === s.indexOf(h) && (s = s.substr(T.length)), C && (s = s.replace("#!", "")), h && c === s || (t.preventDefault(), L.show(c)) } } } } } function N(t) { if (!t || !R) return !1; var e = function (t) { if ("function" == typeof URL && R) return new URL(t, location.toString()); if (g) { var e = document.createElement("a"); return e.href = t, e } }(t), n = v.location; return n.protocol === e.protocol && n.hostname === e.hostname && n.port === e.port } function I() { if (T) return T; var t = y && v && v.location; return y && C && t && "file:" === t.protocol ? t.pathname : T } return L.sameOrigin = N, l });
﻿// #region COLLECTIONS

/*

https://github.com/joao-neves95/Exercises_Challenges_Courses/blob/master/JavaScript/Collections.js

Class Dictionary(): let dictionary = new Dictionary(uniqueKeys = false)

Type safe Class List(): let list = new List('string' | 'number' | 'int' | 'float' | 'boolean')

*/

class Errors {
  static get existingKey() { throw new Error('An item with the same key has already been added.'); };

  static get noTypeProvided() { throw new Error('No type provided on Collection instantiation.') };

  static wrongType(type) { throw new Error(`The value is not from the same type as the List<${type}>`); };
}

class Collection {
  constructor(uniqueKeys, type) {
    this.elements = [];
    this.uniqueKeys = (uniqueKeys || false);

    if (!type) throw Errors.noTypeProvided;
    this.type = type;
  }


  get length() {
    return this.elements.length;
  };

  /**
   * Get all elements from the Collection.
   * Returns elements[]
   */
  getAll() {
    return this.elements;
  }

  /**
   * Remove all elements from the Collection.
   */
  clear() {
    this.elements = [];
  };

  /**
   * (private)
   * No type safety. For private class use.
   * @param {Type} value
   */
  push(value) {
    this.elements.push(value);
  }

  /**
    * (private)
    * No checks. For private class use.
    * @param {Number} index
    */
  splice(index) {
    this.elements.splice(index, 1);
  }
}

class Dictionary extends Collection {
  /**
   * Dictionary of key-value pairs.
   * @param {Boolean} uniqueKeys Whether the keys should be unique or not.
   * Optional. It defaults to false
   * @default {false}
   */
  constructor(uniqueKeys) {
    super(uniqueKeys, 'any');
  };

  getAllValues() {
    let allValues = [];

    for (let i = 0; i < this.elements.length; ++i) {
      allValues.push(Object.values(this.elements[i])[0]);
    }

    return allValues;
  }

  add(key, value) {
    if (this.uniqueKeys && this.findIndexOfKey(key) !== false)
      throw new Error(Errors.existingKey);

    this.push({ [key]: value });
  };

  remove(key) {
    const index = this.findIndexOfKey(key);
    if (!index)
      return false;

    this.splice(index);
  };

  /**
   * Get a value with its index. Returns an array with the values.
   * @param {number} index
   * @return {any[]}
   */
  getByIndex(index) {
    return Object.values(this.elements[index])[0];
  };

  /**
   * Get a key with its index.
   * @param {number} index
   * @return {any}
   */
  getKeyByIndex(index) {
    return Object.keys(this.elements[index])[0];
  }

  getByKey(key) {
    try {
      return this.elements[this.findIndexOfKey(key)][key];
    } catch (e) {
      console.error(e);
    }
  };

  findIndexOfKey(key, Callback) {
    for (let i = 0; i < this.elements.length; i++) {
      if (Object.keys(this.elements[i])[0] === key) {
        return i;
      }
    }
    return false;
  }
}

// Type safe list.
class List extends Collection {
  /**
   * 
   * The Type of the list.
   * ('string' | 'number' | 'int' | 'float' | 'boolean')
   * @param {String} type
   */
  constructor(type) {
    super(false, type);
  }

  /**
   * Add a new item to the List<T>.
   * @param {Type} value
   */
  add(value) {
    switch (this.type) {
      case 'int':
        if (this.isInt(value)) {
          this.push(value);
          break;
        }
      case 'float':
        if (this.isFloat(value)) {
          this.push(value);
          break;
        }
      default:
        if (typeof value === this.type && value !== 'float' && value !== 'int')
          this.push(value);
        else
          throw Errors.wrongType(this.type);
    }
  };

  /**
   * Remove an new item from the List<T> by index.
   * @param {Number} index
   */
  remove(index) {
    this.splice(index);
  };

  /**
   * (private)
   * @param {Number} value
   */
  isInt(value) {
    if (typeof value !== 'number')
      return false;

    return value % 1 === 0;
  }

  /**
   * (private)
   * @param {Number} value
   */
  isFloat(value) {
    if (typeof value !== 'number')
      return false;

    return value % 1 !== 0;
  }
}

// #endregion
﻿class DOM {
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
﻿// https://developer.mozilla.org/en-US/docs/Web/API/History
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// Examples: https://html5demos.com/history/, http://krasimirtsonev.com/blog/article/deep-dive-into-client-side-routing-navigo-pushstate-hash
// .pushState()

// Using Page.js for routing. Don't reinvent the wheel.

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

  notFound() {

  }

  addStyleSheet(url) {

  }

  addScript(url) {

  }

}

﻿/**
  * Every class that extends PageBase MUST implement all properties and methods present in IPage.
  */
class NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    this.id = model.id;
    this.navbarItemType = model.navbarItemType;
    this.navIconURL = model.navIconURL;
    this.content = view.initContent;
    this.targetElement = view.targetElement;

    this.model = model;
    this.view = view;
  }

  injectContent() {
    this.targetElement().innerHTML = this.content;
  }
}
﻿class PageViewBase {
  /**
   * 
   * @param { () => HTMLElement } targetElement (optional) Function to select the DOM injection target element.
   * @param { string } initContent
   */
  constructor(initContent, targetElement = () => { return document.getElementById('page-container'); }) {
    this.initContent = initContent;
    this.targetElement = targetElement;
  }
}
﻿class PageModelBase {
  /**
   * @param { string } id
   * @param { NavbarItemType } id
   * @param { string } title
   * @param { string } navIconURL
   */
  constructor(id, navbarItemType, title, navIconURL) {
    this.id = id;
    this.navbarItemType = navbarItemType;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}
﻿/**
  * Every class that extends PageControllerBase MUST implement all properties and methods present in IPage.
  */
class PageControllerBase extends NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    super(model, view);

    this.model = model;
    this.view = view;
    this.title = model.title;
  }
}
﻿class DashboardTemplates {
  constructor() {
    throw new Error( "You can not instantiate DashboardTemplates (static class)" );
  }

  static page() {
    return `
      <main class="page" id="dashboard-page">
        <h1>DASHBOARD</h1>
      </main>`;
  }
}
﻿/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardView = null;

class DashboardView extends PageViewBase {
  constructor() {
    if (dashboardView)
      throw new Error("There can only be one instance of DashboardView.");

    super( DashboardTemplates.page() );

    dashboardView = this;
    Object.freeze( dashboardView );
  }

  static get _() { return dashboardView; }
}
﻿/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardModel = null;

class DashboardModel extends PageModelBase {
  constructor() {
    if (dashboardModel)
      throw new Error("There can only be one instance of DashboardModel.");

    super('Dashboard', NavbarItemType.Page, '', '');

    dashboardModel = this;
    Object.freeze( dashboardModel );
  }

  static get _() { return dashboardModel; }
}
﻿class DashboardController extends PageControllerBase {
  constructor() {
    super(
      new DashboardModel(),
      new DashboardView()
    );
  }

  onSetActive() { console.info('Dashboard activated.'); };
}
﻿class NavbarTemplates {
  constructor() {
    throw new Error("You can not instantiate NavbarTemplates (static class)");
  }

  static navIcon(iconURL) {
    // Demo.
    return `<img src="${iconURL}" alt=""/>`;
  }
}﻿/**
 * This stores the NavbarView instance.
 * Do not use this variable directly. Use NavbarView._ instead.
 * 
 * @type { NavbarView }
 * */
let navbarView = null;

/**
 * The NavbarView singleton. Access it with NavbarView._
 * */
class NavbarView {
  constructor() {
    if (navbarView)
      throw new Error("There can only be one instance of NavBarController.")

    navbarView = this;
    Object.freeze( navbarView );
  }
  // #region PROPERTIES

  /**
   * Returns the current NavbarController instance.
   * @returns { NavbarView }
   */
  static get _() { return navbarView };

  get element() { return document.getElementById('sidenav-container') };

  static get pageContainer() { return document.getElementById('page-container') };

  // #endregion

  // #region METHODS

  injectIcon(iconURL) {
    // Inject.
    // this.element.innerHTML += NavbarTemplates.navIcon( iconURL );
    return;
  }

  removeActivePage() {
    NavbarView.pageContainer.innerHTML = '';
  }

  // #endregion
}﻿// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * 
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if (navbarController)
      throw new Error( 'There can only be one instance of NavBarController.' );

    this.view = new NavbarView();

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     */
    this.items = new Dictionary(true);
    this.activePage = null;
    this.activeNavbarPanelItem = null;

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure (error free) code.
   * @returns { NavbarController }
   */
  static get _() { return navbarController };

  /**
  * Map a page ID to its instance.
  * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
  * value: object (instance of the Page | NavbarPanelItem)
  * @param { string } key Unique id of the Page | NavbarPanelItem.
  * @param { object } value Instance of Page | NavbarPanelItem.
  * @returns { void }
  */
  mapItem(key, value) {
    this.items.add(key, value);
  }

  /**
  * @returns {void}
  */
  init() {
    for (let i = 0; i < this.items.length; ++i) {
      this.injectIcon( this.items.getByIndex(i).navIconURL );
    }

    this.activateItem( 'dashboard' );
  }

  injectIcon(iconURL) {
    this.view.injectIcon( iconURL );
  }

  /**
   * Activate an item stored in the navbarController.
   * You must pass one of the two.
   * 
   * @param { string } itemId
   * @param { NavbarItemBase } thisItem Instance of Page | NavbarPanelItem.
   * 
   * @return {NavbarItem}
   */
  activateItem(itemId = null, thisItem = null) {
    console.debug('activate item')
    if (!thisItem)
      thisItem = this.items.getByKey( itemId );

    if (thisItem.navbarItemType === NavbarItemType.Page)
      this.view.removeActivePage();

    thisItem.injectContent();
    thisItem.onSetActive();
  }
}

new NavbarController();
﻿page();

page('/dashboard', () => {
  NavbarController._.activateItem('dashboard');
  console.info('Dashboard page.');
});

page('/trade-room', () => {
  console.info('Trade Room page.');
  throw new Error('Route "/trade-room" not yet implemented.')
});

page('/settings', () => {
  console.info('Settings page.');
  throw new Error('Route "/settings" not yet implemented.')
});
﻿whenDomReady(() => {
  console.log('The DOM is ready');

  NavbarController._.mapItem('dashboard', new DashboardController( 'dashboard' ));

  NavbarController._.init();
});
