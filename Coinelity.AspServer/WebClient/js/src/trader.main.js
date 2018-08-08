whenDomReady(() => {
  console.log('The DOM is ready');

  NavbarController._.mapItem('dashboard', new DashboardController( 'dashboard' ));

  NavbarController._.init();
});
