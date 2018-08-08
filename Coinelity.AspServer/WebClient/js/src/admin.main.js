whenDomReady(() => {
  console.log('The DOM is ready');
  console.log('User has ADMIN rigths.')

  NavbarController._.mapItem('app-analitics-dashboard', new AppAnaliticsBoardController());
});
