/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardView = null;

class DashboardView extends ViewBase {
  constructor() {
    if ( dashboardView )
      throw DevErrors.singleIntance( 'DashboardView' );

    super( '<h1>Dashboard</h1>' );

    dashboardView = this;
    Object.freeze( dashboardView );
  }

  static get _() { return dashboardView; }
}
