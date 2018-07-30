// @import 'pages/appAnaliticsBoard/appAnaliticsBoard.templates'
// @import 'pages/appAnaliticsBoard/appAnaliticsBoard.controller'
// @import 'admin.main'
'use strict'
﻿﻿class AppAnaliticsBoardController {
  constructor() {

  }
}﻿whenDomReady(() => {
  console.log("The DOM is ready");
  console.log("User has ADMIN rigths.")

  NavbarController.instance.mapItem("app-analitics-dashboard", new AppAnaliticsBoardController());
});
