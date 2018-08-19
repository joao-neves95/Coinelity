﻿class Theme {
  /**
   * 
   * @param { Colors } sidenav
   */
  constructor(sidenav, topbar) {
    this.sidenav = sidenav;
    this.topbar = topbar;
  }
}

let lightTheme = null;
class LightTheme extends Theme {
  constructor() {
    super( Colors.LightBlue, Colors.LightBlue );

    lightTheme = this;
    Object.freeze( lightTheme );
  }
}
new LightTheme();

let darkTheme = null;
class DarkTheme extends Theme {
  constructor() {
    super( Colors.DarkGrey, Colors.DarkGrey );

    darkTheme = this;
    Object.freeze( darkTheme );
  }
}
new DarkTheme();

class Themes {
  constructor() {
    throw new Error( 'Can not create a new instance of Themes (static class).' );
  }

  /**
   * 
   * @param { ThemeType } themeType
   */
  static apply( themeType ) {
    /**
     * @type { Theme }
     */
    let theme = lightTheme;

    if (themeType === ThemeType.Dark)
      theme = darkTheme;

    document.getElementById( 'sidenav' ).style.backgroundColor = theme.sidenav;
    document.getElementsByClassName( 'top-bar' )[0].style.backgroundColor = theme.topbar;
  }
}