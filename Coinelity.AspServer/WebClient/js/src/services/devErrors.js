class DevErrors {
  constructor() {
    DevErrors.cantInstantiate( 'DevErrors' );
  }

  /**
   * 
   * @param { string } message Error message to throw.
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
}
