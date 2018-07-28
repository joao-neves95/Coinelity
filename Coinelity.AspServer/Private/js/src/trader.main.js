whenDomReady(() => {
  console.log("The DOM is ready");

  NavbarController.instance.mapItem("dashboard", new DashoardController());

  NavbarController.instance.init();
});
