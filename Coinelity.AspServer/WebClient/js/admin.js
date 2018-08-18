// MergerJS imports:
//
// @import 'pages/appAnalyticsBoard/appAnalyticsBoard.templates'
// @import 'pages/appAnalyticsBoard/appAnalyticsBoard.controller'
// @import 'admin.main'
'use strict';
﻿﻿class AppAnaliticsBoardController {
  constructor() {

  }
}﻿whenDomReady(() => {
  console.log('The DOM is ready');
  console.log('User has ADMIN rigths.')

  NavbarController._.mapItem('app-analitics-dashboard', new AppAnaliticsBoardController());
});
