whenDomReady(() => {
  console.log("The DOM is ready");

  NavbarController._.mapItem("dashboard", new DashoardController( "dashboard" ));

  NavbarController._.init();
});
