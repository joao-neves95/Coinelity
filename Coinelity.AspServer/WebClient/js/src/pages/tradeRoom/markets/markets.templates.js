class MarketsTemplates {
  constructor() {
    DevErrors.cantInstantiateStatic( 'MarketsTemplates' );
  }

  static container( content ) {
    return `
      <section id="markets" class=""> ${ content } <h3>Markets</h3> </section>
    `;
  }
}
