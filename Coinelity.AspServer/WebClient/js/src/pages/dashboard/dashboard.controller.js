class DashboardController extends PageControllerBase {
  constructor() {
    super(
      new DashboardModel(),
      new DashboardView()
    );
  }

  onSetActive() { console.info('Dashboard activated.'); };
}
