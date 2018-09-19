/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

let dashboardController = null;

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
