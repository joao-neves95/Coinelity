/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardModel = null;

class DashboardModel extends ModelBase {
  constructor() {
    if (dashboardModel)
      throw new Error("There can only be one instance of DashboardModel.");

    super( PageID.Dashboard, NavbarItemType.Page, 'Dashboard', 'public/img/dashboard-icon-white.svg' );

    dashboardModel = this;
    Object.freeze( dashboardModel );
  }

  static get _() { return dashboardModel; }
}
