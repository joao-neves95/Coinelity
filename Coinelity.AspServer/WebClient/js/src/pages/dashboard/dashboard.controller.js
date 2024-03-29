﻿/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let dashboardController = null;

/**
 * The Dashboard page controller.
 */
class DashboardController extends ControllerBase {
  constructor() {
    if ( dashboardController )
      throw new Error( 'There can only be one instance of DashboardController.' );

    super(
      new DashboardModel(),
      new DashboardView()
    );

    dashboardController = this;
    Object.freeze( dashboardController );
  }

  static get _() { return dashboardController; }
}
