/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class ErrorHandler {
  constructor() {
    DevErrors.cantInstantiateStatic( 'ErrorHandler' );
  }

  /**
   * 
   * @param { Response } res Fetch Response object.
   */
  static requestErrors( res ) {
    if ( res.status === 400 ) {
      // TODO: Handle error.
      // Take error from Response object and show notification.
    } else if ( res.status === 500 ) {
      // TODO: Handle error.
      // Show notification of something like "There was an error.".
    }
  }
}
