class DashboardController extends ControllerBase {
  constructor() {
    super(
      new DashboardModel(),
      new DashboardView()
    );
  }

  onSetActive() { console.info('Dashboard activated.'); };
}
