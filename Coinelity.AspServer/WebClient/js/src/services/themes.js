/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class Theme {
  /**
   * 
   * @param { Colors } sidenav
   */
  constructor( sidenav, topbar, tradingTools, chartBG) {
    this.sidenav = sidenav;
    this.topbar = topbar;
    this.tradingToolsBG = tradingTools;
    this.chartBG = chartBG;
  }
}

let lightTheme = null;
class LightTheme extends Theme {
  constructor() {
    if ( lightTheme )
      throw DevErrors.singleIntance( 'LightTheme' );

    super(
      Colors.LightBlue,
      Colors.LightBlue,
      Colors.LightBlue,
      Colors.LightBlue
    );

    lightTheme = this;
    Object.freeze( lightTheme );
  }
}
new LightTheme();

let darkTheme = null;
class DarkTheme extends Theme {
  constructor() {
    if ( darkTheme )
      throw DevErrors.singleIntance( 'DarkTheme' );

    super(
      Colors.DarkGrey,
      Colors.DarkGrey,
      Colors.LightGrey,
      Colors.LighterGrey
    );

    darkTheme = this;
    Object.freeze( darkTheme );
  }
}
new DarkTheme();

class Themes {
  constructor() {
    throw new Error( 'Can not create a new instance of Themes (static class).' );
  }

  // TODO: Apply theme in each page element (by page).
  /**
   * 
   * @param { ThemeType } themeType
   * @param { NavItemID } page A page from the NavItemId enum
   */
  static apply( themeType, page ) {
    /**
     * @type { Theme }
     */
    let theme = lightTheme;

    if (themeType === ThemeType.Dark)
      theme = darkTheme;

    // COMMON
    document.getElementById( 'sidenav' ).style.backgroundColor = theme.sidenav;
    document.getElementsByClassName( 'top-bar' )[0].style.backgroundColor = theme.topbar;

    // BY PAGE
    switch ( page ) {
      case NavItemID.Dashboard:
        break;
      case NavItemID.Settings:
        break;
      case NavItemID.Markets:
        break;
      case NavItemID.Trade:
        DOM.byClass( 'trading-tools-wrapper' )[0].style.backgroundColor = theme.tradingToolsBG;
        TradeModel._.chartConfig.backgroundColor = theme.chartBG;
        TradeModel._.chart.setOption( TradeModel._.chartConfig );
        break;
    }
  }

  static update() {}
}
