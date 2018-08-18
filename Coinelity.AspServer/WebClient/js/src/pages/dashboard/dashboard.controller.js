let dashboardController = null;

class DashboardController extends ControllerBase {
  constructor() {
    if ( dashboardController )
      throw new Error( 'There can only be one instance of DashboardController.' );

    super(
      new DashboardModel(),
      new DashboardView()
    );

    dashboardController = this;
    Object.freeze( dashboardController );
  }

  static get _() { return dashboardController; }
}
