whenDomReady(() => {
  console.log("The DOM is ready");
  console.log("User has ADMIN rigths.")

  NavbarController.instance.mapItem("app-analitics-dashboard", new AppAnaliticsBoardController());
});
