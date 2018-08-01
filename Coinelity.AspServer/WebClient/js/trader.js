// @import '/services/externalLibs'
// @import '/services/utils'
// @import '/services/router'
// @import '/pages/dashboard/dashboard.templates'
// @import '/pages/dashboard/dashboard.controller'
// @import '/navbar/navbarController'
// @import 'trader.main'
'use strict'
﻿// when-dom-ready
// https://github.com/lukechilds/when-dom-ready
!function (e, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.whenDomReady = n() }(this, function () { "use strict"; var e = ["interactive", "complete"], n = function (n, t) { return new Promise(function (o) { n && "function" != typeof n && (t = n, n = null), t = t || window.document; var i = function () { return o(void (n && setTimeout(n))) }; -1 !== e.indexOf(t.readyState) ? i() : t.addEventListener("DOMContentLoaded", i) }) }; return n.resume = function (e) { return function (t) { return n(e).then(function () { return t }) } }, n });
﻿/*

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
﻿// https://developer.mozilla.org/en-US/docs/Web/API/History
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

﻿﻿class DashoardController {
  constructor() {

  }
}﻿// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if (navbarController)
      throw new Error("There can only be one instance of NavBarController.")

    /**
     * Dictionary mapping the pages and components.
     * key: string (unique id of the page/component. To be used by the router)
     * value: object (instance of the page/component)
     */
    this.items = new Dictionary( true );

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure code.
   * @returns { NavbarController }
   */
  static get _() { return navbarController };

  /**
  * Map a page ID to its instance.
  * key: string (unique id of the page/component. To be used by the router)
  * value: object (instance of the page/component)
  * @returns {void}
  */
  mapItem(key, value) {
    this.items.add(key, value);
  }

  /**
  * @returns {void}
  */
  init() {
    // Initialize all items.
  }
}

new NavbarController();
﻿whenDomReady(() => {
  console.log("The DOM is ready");

  NavbarController._.mapItem("dashboard", new DashoardController());

  NavbarController._.init();
});
