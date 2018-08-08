/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardView = null;

class DashboardView extends PageViewBase {
  constructor() {
    if (dashboardView)
      throw new Error("There can only be one instance of DashboardView.");

    super( DashboardTemplates.page() );

    dashboardView = this;
    Object.freeze( dashboardView );
  }

  static get _() { return dashboardView; }
}
