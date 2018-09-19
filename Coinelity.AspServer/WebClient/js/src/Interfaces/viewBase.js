/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

class ViewBase {
  /**
   * 
   * @param { string } initContent The content to inject when the page/navbar panel item get activated.
   * @param { () => HTMLElement } targetElement (optional) Function to select the DOM injection target element.
   * Default: (id) 'page-container'
   */
  constructor( initContent, targetElement = () => { return document.getElementById( 'page-container' ); } ) {
    this.initContent = initContent;
    this.targetElement = targetElement;
  }

  injectID( id ) {
    document.getElementById( 'page-container' ).firstElementChild.id = id;
  }
}
