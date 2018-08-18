/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardView = null;

class DashboardView extends ViewBase {
  constructor() {
    if (dashboardView)
      throw new Error( 'There can only be one instance of DashboardView.' );

    super( PageTemplates.page( '<h1>Dashboard</h1>' ));

    dashboardView = this;
    Object.freeze( dashboardView );
  }

  static get _() { return dashboardView; }
}
