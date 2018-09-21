/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

class DevErrors {
  constructor() {
    DevErrors.cantInstantiate( 'DevErrors' );
  }

  /**
   * 
   * @param { string } message Error message to throw.
   * 
   * @returns { Error }
   */
  static throw( message ) {
    if ( ENV === EnvironmentType.Production )
      return;

    throw new Error( message );
  }

  /**
   * 
   * @param { string } className The name of the static class that can not be intantiated.
   */
  static cantInstantiateStatic( className ) {
    DevErrors.throw( `Can not create an intance of ${className} (static class).` );
  }

  static singleIntance( singletonClassName ) {
    DevErrors.throw( `There can only be one instance of ${className} (singleton class).` );
  }

  static notImplemented( additionalInfo = '' ) {
    DevErrors.throw( `The function, method, class or opertion has not yet been implemented.\n${additionalInfo}` );
  }
}
