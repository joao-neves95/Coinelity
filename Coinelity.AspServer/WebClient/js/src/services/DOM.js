﻿class DOM {
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
}
