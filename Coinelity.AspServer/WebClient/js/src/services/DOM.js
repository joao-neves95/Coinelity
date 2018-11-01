/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class DOM {

  static changeDocTitle( title ) {

  }

  /**
   * 
   * @param { string } scriptCode The script code string.
   * @param { HTMLElement } target Default: <body> element.
   */
  static addScript( scriptCode, target = document.body) {
    let newScript = document.createElement('script');
    newScript.text = scriptCode;
    newScript.setAttribute('type', 'application/javascript');

    target.insertAdjacentElement('beforeend', newScript);
  }

  /**
 * 
 * @param { string } url The script's URL.
 * @param { HTMLElement } target Default: <body> element.
 */
  static addScriptUrl( url, target = document.body ) {
    let newScript = document.createElement( 'script' );
    newScript.setAttribute( 'src', url );
    newScript.setAttribute( 'type', 'application/javascript' );

    target.insertAdjacentElement( 'beforeend', newScript );
  }

  /**
   * Create a new Event Listener on the provided HTMLElement.
   * The Callback receives the Event object.
   * 
   * @param { HTMLElement } htmlElement
   * @param { EventListenerOptions } eventType
   * @param { Function } CallbackEventHandler
   * 
   * @returns { void }
   */
  static on( eventType, htmlElement, CallbackEventHandler ) {
    htmlElement.addEventListener( eventType, ( e ) => {
      CallbackEventHandler( e );
    } );
  }

  static byId( id ) {
    return document.getElementById( id );
  }

  /**
   * 
   * @param { string } className
   * @param { string } element Defaults to document
   * @returns { HTMLElement }
   */
  static byClass( className, element = document ) {
    return element.getElementsByClassName( className );
  }

  /**
   * 
   * @param { number } px
   * @param { number } bodyTextSizePx
   */
  static pxToEm( px, bodyTextSizePx = 16 ) {
    return px / bodyTextSizePx;

  }

  /**
   * 
   * @param { number } em
   * @param { number } bodyTextSizePx
   */
  static emToPx( em, bodyTextSizePx = 16 ) {
    return em * bodyTextSizePx;
  }
}
