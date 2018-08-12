whenDomReady(() => {
  console.log('The DOM is ready');
  $(document).foundation();

  const newDashboardController = new DashboardController();
  NavbarController._.mapItem(newDashboardController.model.id, newDashboardController);

  NavbarController._.init();
});
