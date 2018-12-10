/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// MergerJS imports:
//
// @import<<DIR '/enums/'
// @import<<DIR '/models/'
// @import 'constants'
// @import '/services/externalLibs'
// @import '/services/devErrors'
// @import '/services/DOM'
// @import '/services/utils'
// @import '/services/errorHandler'
// @import '/services/httpClient'
// @import '/services/exchangeClient'
// @import '/services/authentication'
// @import '/services/traderRoutes'
// @import '/services/notifications'
// @import '/services/loadingPage'
// @import '/navbar/navbarItemBase'
// @import<<DIR '/interfaces/'
// @import '/pages/dashboard/dashboard.templates'
// @import '/pages/dashboard/dashboard.model'
// @import '/pages/dashboard/dashboard.view'
// @import '/pages/dashboard/dashboard.controller'
// @import '/pages/tradeRoom/trade/trade.templates'
// @import '/pages/tradeRoom/trade/trade.model'
// @import '/pages/tradeRoom/trade/trade.view'
// @import '/pages/tradeRoom/trade/trade.controller'
// @import '/pages/tradeRoom/markets/markets.templates'
// @import '/pages/tradeRoom/markets/markets.model'
// @import '/pages/tradeRoom/markets/markets.view'
// @import '/pages/tradeRoom/markets/markets.controller'
// @import '/pages/tradeRoom/tradeRoom.templates'
// @import '/pages/tradeRoom/tradeRoom.model'
// @import '/pages/tradeRoom/tradeRoom.view'
// @import '/pages/tradeRoom/tradeRoom.controller'
// @import '/pages/settings/settings.templates'
// @import '/pages/settings/settings.model'
// @import '/pages/settings/settings.view'
// @import '/pages/settings/settings.controller'
// @import '/navbar/navbar.templates'
// @import '/navbar/navbar.model'
// @import '/navbar/navbar.view'
// @import '/navbar/navbar.controller'
// @import '/topbar/topbar.model'
// @import '/topbar/topbar.view'
// @import '/topbar/topbar.controller'
// @import '/services/themes'
// @import 'trader.main'
// @import '/services/traderRoutes'
'use strict';

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const ButtonType = Object.freeze( {
  /** Green */
  Success: 'success',
  /** Red */
  Alert: 'alert',
  /** Yellow */
  Warning: 'warning'
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/** 1m, 5m, 15m, 30m, 1h, 4h, 1d, 7d, 1M. */
const ChartTimeframeType = Object.freeze( {
  Min1: '1m',
  Min5: '5m',
  Min15: '15m',
  Min30: '30m',
  H1: '1h',
  H4: '4h',
  D1: '1d',
  D7: '7d',
  Mon1: '1M'
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const Colors = Object.freeze({
  DarkGrey: '#3D3D3D',
  LightGrey: '#5a5a5a',
  LighterGrey: '#767676',
  LightBlue: '#78BBFF',
  BullishGreen: '#0DFFAA',
  BearishRed: '#EF5350'
});

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const EnvironmentType = Object.freeze( {
  Development: 'DEVELOPMENT',
  Production: 'PRODUCTION'
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const FiatSymbol = Object.freeze( {
  Euro: '&euro;',
  Dolar: '&dollar;',
  Cent: '&cent;',
  Pound: '&pound;',
  Yen: '&yen;'
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const GridOrientationType = Object.freeze( {
  Y: 'grid-y',
  X: 'grid-x'
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const NavbarItemType = Object.freeze({
  Page: 1,
  NavbarPanelItem: 2,
  Modal: 3
});

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * Used for storing navbar items in Dictionaries and as the URL slug in case of beeing a page.
 */
const NavItemID = Object.freeze( {
  Dashboard: 'dashboard',
  TradeRoom: 'trade-room',
  Markets: 'trade-room/markets',
  Trade: 'trade-room/trade',
  Settings: 'settings'
});

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const RequestType = Object.freeze( {
  Post: 'POST',
  Get: 'GET',
  Put: 'PUT',
  Delete: 'DELETE'
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const ThemeType = Object.freeze({
  Light: 1,
  Dark: 2
});

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const TradingMode = Object.freeze( {
  BinaryOptions: 1,
  CFD: 2
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const UserAccountType = Object.freeze( {
  RealBalance: 1,
  CreditsBalance: 2,
  PaperBalance: 3
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class AssetModel {
  constructor(id, symbol, exchange, fiatSymbol, cryptoSymbol, logoURL) {
    this.id = id;
    this.symbol = symbol;
    this.exchange = exchange;
    this.fiatSymbol = fiatSymbol;
    this.cryptoSymbol = cryptoSymbol;
    this.logoURL = logoURL;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class ChangeModel {
  constructor( currentPrice, price, percent ) {
    this.currentPrice = currentPrice;
    this.price = price;
    this.percent = percent;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class ChangePasswordDTO {
  constructor( currentPassword, newPassword ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class HttpClientResponse {
  constructor( error, data ) {
    this.error = error;
    this.data = data;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class SelectInputOptions {
  constructor( label, value ) {
    this.label = label;
    this.value = value;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class SpreadPricesModel {
  constructor( bid, ask, spreadPriceDiff, spreadPercentDiff ) {
    this.bid = bid;
    this.ask = ask;
    this.spreadPriceDiff = spreadPriceDiff;
    this.spreadPercentDiff = spreadPercentDiff;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const ENV = EnvironmentType.Development;

const BASE_PORT = ':33623';
const BASE_URL = `http://localhost${BASE_PORT}/`;
const BASE_API_URL = BASE_URL + 'api/';
const PUBLIC_IMGS_URL = BASE_URL + 'public/img/';
const AUTH_TOKEN_ID = 'auth-token';

const BASE_NODEJS_PORT = '3003';
const BASE_NODEJS_URL = `http://localhost:${BASE_NODEJS_PORT}/`;
const BASE_NODEJS_API = BASE_NODEJS_URL + 'api/';

const FETCH_CHART_DATA_MAX_ATTEMPTS = 3;
const MARKETS_UPDATE_RATE = 8000;
const TRADE_PRICE_UPDATE_RATE = 2000;
const TRADE_CANDLE_UPDATE_RATE = 2000;

// Images URL'S:
const DASHBOARD_ICON_URL = `${PUBLIC_IMGS_URL}dashboard-icon-white.svg`;
const TRADE_ROOM_ICON_URL = `${PUBLIC_IMGS_URL}chart-icon-white.svg`;
const SETTINGS_ICON_URL = `${PUBLIC_IMGS_URL}settings-icon-white.svg`;

// This sizes are the same as in "variables.less".
const SIDEBAR_MOBILE_WIDTH = '3em';
const SIDEBAR_DESKTOP_WIDTH = '10em';

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// Page.js
// https://github.com/visionmedia/page.js/
!function ( t, e ) { "object" === typeof exports && "undefined" !== typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define( e ) : t.page = e() }( this, function () { "use strict"; var p = Array.isArray || function ( t ) { return "[object Array]" == Object.prototype.toString.call( t ) }, n = h, t = a, e = function ( t ) { return o( a( t ) ) }, r = o, i = c, x = new RegExp( ["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join( "|" ), "g" ); function a( t ) { for ( var e, n, r = [], i = 0, o = 0, a = ""; null != ( e = x.exec( t ) ); ) { var s = e[0], c = e[1], h = e.index; if ( a += t.slice( o, h ), o = h + s.length, c ) a += c[1]; else { a && ( r.push( a ), a = "" ); var p = e[2], f = e[3], u = e[4], l = e[5], d = e[6], m = e[7], v = "+" === d || "*" === d, g = "?" === d || "*" === d, y = p || "/", w = u || l || ( m ? ".*" : "[^" + y + "]+?" ); r.push( { name: f || i++, prefix: p || "", delimiter: y, optional: g, repeat: v, pattern: ( n = w, n.replace( /([=!:$\/()])/g, "\\$1" ) ) } ) } } return o < t.length && ( a += t.substr( o ) ), a && r.push( a ), r } function o( c ) { for ( var h = new Array( c.length ), t = 0; t < c.length; t++ )"object" == typeof c[t] && ( h[t] = new RegExp( "^" + c[t].pattern + "$" ) ); return function ( t ) { for ( var e = "", n = t || {}, r = 0; r < c.length; r++ ) { var i = c[r]; if ( "string" != typeof i ) { var o, a = n[i.name]; if ( null == a ) { if ( i.optional ) continue; throw new TypeError( 'Expected "' + i.name + '" to be defined' ) } if ( p( a ) ) { if ( !i.repeat ) throw new TypeError( 'Expected "' + i.name + '" to not repeat, but received "' + a + '"' ); if ( 0 === a.length ) { if ( i.optional ) continue; throw new TypeError( 'Expected "' + i.name + '" to not be empty' ) } for ( var s = 0; s < a.length; s++ ) { if ( o = encodeURIComponent( a[s] ), !h[r].test( o ) ) throw new TypeError( 'Expected all "' + i.name + '" to match "' + i.pattern + '", but received "' + o + '"' ); e += ( 0 === s ? i.prefix : i.delimiter ) + o } } else { if ( o = encodeURIComponent( a ), !h[r].test( o ) ) throw new TypeError( 'Expected "' + i.name + '" to match "' + i.pattern + '", but received "' + o + '"' ); e += i.prefix + o } } else e += i } return e } } function f( t ) { return t.replace( /([.+*?=^!:${}()[\]|\/])/g, "\\$1" ) } function s( t, e ) { return t.keys = e, t } function u( t ) { return t.sensitive ? "" : "i" } function c( t, e ) { for ( var n = ( e = e || {} ).strict, r = !1 !== e.end, i = "", o = t[t.length - 1], a = "string" == typeof o && /\/$/.test( o ), s = 0; s < t.length; s++ ) { var c = t[s]; if ( "string" == typeof c ) i += f( c ); else { var h = f( c.prefix ), p = c.pattern; c.repeat && ( p += "(?:" + h + p + ")*" ), i += p = c.optional ? h ? "(?:" + h + "(" + p + "))?" : "(" + p + ")?" : h + "(" + p + ")" } } return n || ( i = ( a ? i.slice( 0, -2 ) : i ) + "(?:\\/(?=$))?" ), i += r ? "$" : n && a ? "" : "(?=\\/|$)", new RegExp( "^" + i, u( e ) ) } function h( t, e, n ) { return p( e = e || [] ) ? n || ( n = {} ) : ( n = e, e = [] ), t instanceof RegExp ? function ( t, e ) { var n = t.source.match( /\((?!\?)/g ); if ( n ) for ( var r = 0; r < n.length; r++ )e.push( { name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, pattern: null } ); return s( t, e ) }( t, e ) : p( t ) ? function ( t, e, n ) { for ( var r = [], i = 0; i < t.length; i++ )r.push( h( t[i], e, n ).source ); return s( new RegExp( "(?:" + r.join( "|" ) + ")", u( n ) ), e ) }( t, e, n ) : function ( t, e, n ) { for ( var r = a( t ), i = c( r, n ), o = 0; o < r.length; o++ )"string" != typeof r[o] && e.push( r[o] ); return s( i, e ) }( t, e, n ) } n.parse = t, n.compile = e, n.tokensToFunction = r, n.tokensToRegExp = i; var l = L; ( L.default = L ).Context = P, L.Route = S, L.sameOrigin = N; var d, m, v, g = "undefined" != typeof document, y = "undefined" != typeof window, w = "undefined" != typeof history, b = "undefined" != typeof process, E = g && document.ontouchstart ? "touchstart" : "click", R = y && !( !window.history.location && !window.location ), k = !0, A = !0, T = "", O = !1, C = !1; function L( t, e ) { if ( "function" == typeof t ) return L( "*", t ); if ( "function" == typeof e ) for ( var n = new S( t ), r = 1; r < arguments.length; ++r )L.callbacks.push( n.middleware( arguments[r] ) ); else "string" == typeof t ? L["string" == typeof e ? "redirect" : "show"]( t, e ) : L.start( t ) } function U( t ) { return "string" != typeof t ? t : A ? decodeURIComponent( t.replace( /\+/g, " " ) ) : t } function P( t, e ) { var n = I(); "/" === t[0] && 0 !== t.indexOf( n ) && ( t = n + ( C ? "#!" : "" ) + t ); var r = t.indexOf( "?" ); if ( this.canonicalPath = t, this.path = t.replace( n, "" ) || "/", C && ( this.path = this.path.replace( "#!", "" ) || "/" ), this.title = g && v.document.title, this.state = e || {}, this.state.path = t, this.querystring = ~r ? U( t.slice( r + 1 ) ) : "", this.pathname = U( ~r ? t.slice( 0, r ) : t ), this.params = {}, this.hash = "", !C ) { if ( !~this.path.indexOf( "#" ) ) return; var i = this.path.split( "#" ); this.path = this.pathname = i[0], this.hash = U( i[1] ) || "", this.querystring = this.querystring.split( "#" )[0] } } function S( t, e ) { ( e = e || {} ).strict = e.strict || O, this.path = "*" === t ? "(.*)" : t, this.method = "GET", this.regexp = n( this.path, this.keys = [], e ) } L.callbacks = [], L.exits = [], L.current = "", L.len = 0, L.base = function ( t ) { if ( 0 === arguments.length ) return T; T = t }, L.strict = function ( t ) { if ( 0 === arguments.length ) return O; O = t }, L.start = function ( t ) { if ( t = t || {}, !d && ( d = !0, v = t.window || y && window, !1 === t.dispatch && ( k = !1 ), !1 === t.decodeURLComponents && ( A = !1 ), !1 !== t.popstate && y && v.addEventListener( "popstate", $, !1 ), !1 !== t.click && g && v.document.addEventListener( E, j, !1 ), ( C = !!t.hashbang ) && y && !w && v.addEventListener( "hashchange", $, !1 ), k ) ) { var e; if ( R ) { var n = v.location; e = C && ~n.hash.indexOf( "#!" ) ? n.hash.substr( 2 ) + n.search : C ? n.search + n.hash : n.pathname + n.search + n.hash } L.replace( e, null, !0, k ) } }, L.stop = function () { d && ( L.current = "", L.len = 0, d = !1, g && v.document.removeEventListener( E, j, !1 ), y && v.removeEventListener( "popstate", $, !1 ), y && v.removeEventListener( "hashchange", $, !1 ) ) }, L.show = function ( t, e, n, r ) { var i = new P( t, e ), o = m; return L.current = ( m = i ).path, !1 !== n && L.dispatch( i, o ), !1 !== i.handled && !1 !== r && i.pushState(), i }, L.back = function ( t, e ) { 0 < L.len ? ( w && v.history.back(), L.len-- ) : t ? setTimeout( function () { L.show( t, e ) } ) : setTimeout( function () { L.show( I(), e ) } ) }, L.redirect = function ( t, e ) { "string" == typeof t && "string" == typeof e && L( t, function ( t ) { setTimeout( function () { L.replace( e ) }, 0 ) } ), "string" == typeof t && void 0 === e && setTimeout( function () { L.replace( t ) }, 0 ) }, L.replace = function ( t, e, n, r ) { var i = new P( t, e ), o = m; return L.current = ( m = i ).path, i.init = n, i.save(), !1 !== r && L.dispatch( i, o ), i }, L.dispatch = function ( e, n ) { var r = 0, i = 0; function o() { var t = L.callbacks[r++]; if ( e.path === L.current ) return t ? void t( e, o ) : function ( t ) { if ( t.handled ) return; var e; e = C ? R && I() + v.location.hash.replace( "#!", "" ) : R && v.location.pathname + v.location.search; if ( e === t.canonicalPath ) return; L.stop(), t.handled = !1, R && ( v.location.href = t.canonicalPath ) }( e ); e.handled = !1 } n ? function t() { var e = L.exits[i++]; if ( !e ) return o(); e( n, t ) }() : o() }, L.exit = function ( t, e ) { if ( "function" == typeof t ) return L.exit( "*", t ); for ( var n = new S( t ), r = 1; r < arguments.length; ++r )L.exits.push( n.middleware( arguments[r] ) ) }, ( L.Context = P ).prototype.pushState = function () { L.len++ , w && v.history.pushState( this.state, this.title, C && "/" !== this.path ? "#!" + this.path : this.canonicalPath ) }, P.prototype.save = function () { w && "file:" !== v.location.protocol && v.history.replaceState( this.state, this.title, C && "/" !== this.path ? "#!" + this.path : this.canonicalPath ) }, ( L.Route = S ).prototype.middleware = function ( n ) { var r = this; return function ( t, e ) { if ( r.match( t.path, t.params ) ) return n( t, e ); e() } }, S.prototype.match = function ( t, e ) { var n = this.keys, r = t.indexOf( "?" ), i = ~r ? t.slice( 0, r ) : t, o = this.regexp.exec( decodeURIComponent( i ) ); if ( !o ) return !1; for ( var a = 1, s = o.length; a < s; ++a ) { var c = n[a - 1], h = U( o[a] ); void 0 === h && hasOwnProperty.call( e, c.name ) || ( e[c.name] = h ) } return !0 }; var $ = function () { var r = !1; if ( y ) return g && "complete" === document.readyState ? r = !0 : window.addEventListener( "load", function () { setTimeout( function () { r = !0 }, 0 ) } ), function ( t ) { if ( r ) if ( t.state ) { var e = t.state.path; L.replace( e, t.state ) } else if ( R ) { var n = v.location; L.show( n.pathname + n.hash, void 0, void 0, !1 ) } } }(); function j( t ) { var e; if ( 1 === ( null == ( e = ( e = t ) || y && window.event ).which ? e.button : e.which ) && !( t.metaKey || t.ctrlKey || t.shiftKey || t.defaultPrevented ) ) { var n = t.target, r = t.path || ( t.composedPath ? t.composedPath() : null ); if ( r ) for ( var i = 0; i < r.length; i++ )if ( r[i].nodeName && "A" === r[i].nodeName.toUpperCase() && r[i].href ) { n = r[i]; break } for ( ; n && "A" !== n.nodeName.toUpperCase(); )n = n.parentNode; if ( n && "A" === n.nodeName.toUpperCase() ) { var o = "object" == typeof n.href && "SVGAnimatedString" === n.href.constructor.name; if ( !n.hasAttribute( "download" ) && "external" !== n.getAttribute( "rel" ) ) { var a = n.getAttribute( "href" ); if ( ( C || !function ( t ) { if ( !R ) return !1; var e = v.location; return t.pathname === e.pathname && t.search === e.search }( n ) || !n.hash && "#" !== a ) && !( a && -1 < a.indexOf( "mailto:" ) ) && ( o ? !n.target.baseVal : !n.target ) && ( o || N( n.href ) ) ) { var s = o ? n.href.baseVal : n.pathname + n.search + ( n.hash || "" ); s = "/" !== s[0] ? "/" + s : s, b && s.match( /^\/[a-zA-Z]:\// ) && ( s = s.replace( /^\/[a-zA-Z]:\//, "/" ) ); var c = s, h = I(); 0 === s.indexOf( h ) && ( s = s.substr( T.length ) ), C && ( s = s.replace( "#!", "" ) ), h && c === s || ( t.preventDefault(), L.show( c ) ) } } } } } function N( t ) { if ( !t || !R ) return !1; var e = function ( t ) { if ( "function" == typeof URL && R ) return new URL( t, location.toString() ); if ( g ) { var e = document.createElement( "a" ); return e.href = t, e } }( t ), n = v.location; return n.protocol === e.protocol && n.hostname === e.hostname && n.port === e.port } function I() { if ( T ) return T; var t = y && v && v.location; return y && C && t && "file:" === t.protocol ? t.pathname : T } return L.sameOrigin = N, l } );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class DevErrors {
  constructor() {
    DevErrors.cantInstantiate( 'DevErrors' );
  }

  /**
   * 
   * @param { string } message Error message to throw.
   * 
   * @returns { Error }
   */
  static throw( message ) {
    if ( ENV === EnvironmentType.Production )
      return;

    throw new Error( message );
  }

  /**
   * 
   * @param { string } className The name of the static class that can not be intantiated.
   */
  static cantInstantiateStatic( className ) {
    DevErrors.throw( `Can not create an intance of ${className} (static class).` );
  }

  static singleIntance( singletonClassName ) {
    DevErrors.throw( `There can only be one instance of ${singletonClassName} (singleton class).` );
  }

  static notImplemented( additionalInfo = '' ) {
    DevErrors.throw( `The function, method, class or opertion has not yet been implemented.\n${additionalInfo}` );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class DOM {

  static changeDocTitle( title ) {

  }

  /**
   * 
   * @param { string } scriptCode The script code string.
   * @param { HTMLElement } target Default: <body> element.
   */
  static addScript( scriptCode, target = document.body) {
    let newScript = document.createElement('script');
    newScript.text = scriptCode;
    newScript.setAttribute('type', 'application/javascript');

    target.insertAdjacentElement('beforeend', newScript);
  }

  /**
 * 
 * @param { string } url The script's URL.
 * @param { HTMLElement } target Default: <body> element.
 */
  static addScriptUrl( url, target = document.body ) {
    let newScript = document.createElement( 'script' );
    newScript.setAttribute( 'src', url );
    newScript.setAttribute( 'type', 'application/javascript' );

    target.insertAdjacentElement( 'beforeend', newScript );
  }

  /**
   * Create a new Event Listener on the provided HTMLElement.
   * The Callback receives the Event object.
   * 
   * @param { HTMLElement } htmlElement
   * @param { EventListenerOptions } eventType
   * @param { Function } CallbackEventHandler
   * 
   * @returns { void }
   */
  static on( eventType, htmlElement, CallbackEventHandler ) {
    htmlElement.addEventListener( eventType, ( e ) => {
      CallbackEventHandler( e );
    } );
  }

  static byId( id ) {
    return document.getElementById( id );
  }

  /**
   * 
   * @param { string } className
   * @param { string } element Defaults to document
   * @returns { HTMLElement }
   */
  static byClass( className, element = document ) {
    return element.getElementsByClassName( className );
  }

  /**
   * 
   * @param { number } px
   * @param { number } bodyTextSizePx
   */
  static pxToEm( px, bodyTextSizePx = 16 ) {
    return px / bodyTextSizePx;

  }

  /**
   * 
   * @param { number } em
   * @param { number } bodyTextSizePx
   */
  static emToPx( em, bodyTextSizePx = 16 ) {
    return em * bodyTextSizePx;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

Array.prototype.last = () => {
  return this[this.length - 1];
};

class Utils {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'Utils' );
  }

  static encondeCoinSymbolUri( symbol ) {
    return symbol.replace( '/', '-' );
  }

  static decodeCoinSymbolUri( symbol ) {
    return symbol.replace( '-', '/' );
  }

  static unixMilisecondsToHuman( unix ) {
    return Utils.unixSecondsToHuman( unix / 1000 );
  }

  static unixSecondsToHuman( unix ) {
    return moment.unix( unix ).format( "YYYY/MM/DD" );
  }

  /**
   * Get the time in miliseconds to the next timeframe.
   * 
   * @param { ChartTimeframeType } chartTimeframeType
   */
  static getTimeToNextTimeframe( chartTimeframeType ) {
    const now = moment( new Date() );
    let getEndOf = '';

    switch ( chartTimeframeType ) {
      case ChartTimeframeType.Min1:
      case ChartTimeframeType.Min5:
      case ChartTimeframeType.Min15:
      case ChartTimeframeType.Min30:
        getEndOf = 'minute';
        break;
      case ChartTimeframeType.H1:
      case ChartTimeframeType.H4:
        getEndOf = 'minute';
        break;
      case ChartTimeframeType.D1:
      case ChartTimeframeType.D7:
        getEndOf = 'day';
        break;
      case ChartTimeframeType.Mon1:
        getEndOf = 'month';
        break;
    }

    const targetTime = moment( now ).endOf( getEndOf );
    return moment.duration( targetTime.diff( now ) ).asMilliseconds();
  }

  /**
   * 
   * @param { ChartTimeframeType } chartTimeframeType
   */
  static getMilisecondsFromChartTimeframe( chartTimeframeType ) {
    switch ( chartTimeframeType ) {
      case ChartTimeframeType.Min1:
        return 1000 * 60;
      case ChartTimeframeType.Min5:
        return 1000 * 60 * 5;
      case ChartTimeframeType.Min15:
        return 1000 * 60 * 15;
      case ChartTimeframeType.Min30:
        return 1000 * 60 * 30;
      case ChartTimeframeType.H1:
        return 1000 * 60 * 60;
      case ChartTimeframeType.H4:
        return 1000 * 60 * 60 * 4;
      case ChartTimeframeType.D1:
        return 1000 * 60 * 60 * 24;
      case ChartTimeframeType.D7:
        return 1000 * 60 * 60 * 24 * 7;
      case ChartTimeframeType.Mon1:
        return 1000 * 60 * 60 * 24 * 7 * 4.34524;
    }
  }

  /**
   * Returns the corresponding NavItemId or false.
   * 
   * @param { string } stringRepresentation NavItemId string representation.
   * 
   * @returns { NavItemID }
   */
  static getNavItemIDFromString( stringRepresentation ) {
    switch ( stringRepresentation ) {
      case NavItemID.Dashboard:
        return NavItemID.Dashboard;
      case NavItemID.Settings:
        return NavItemID.Settings;
      case NavItemID.Markets:
        return NavItemID.Markets;
      case NavItemID.Trade:
        return NavItemID.Trade;
      case NavItemID.TradeRoom:
        return NavItemID.TradeRoom;

      default:
        return false;
    }
  }
}

// #region COLLECTIONS

/*
Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
Written by João Pedro Martins Neves <joao95neves@gmail.com>
https://github.com/joao-neves95/Exercises_Challenges_Courses/blob/master/JavaScript/Collections.js
Class Dictionary(): let dictionary = new Dictionary(uniqueKeys = false)
Type safe Class List(): let list = new List('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
*/

class Errors {
  static get existingKey() { throw new Error('An item with the same key has already been added.'); };

  static get noTypeProvided() { throw new Error('No type provided on Collection instantiation.') };

  static wrongType(type) { throw new Error(`The value is not from the same type as the List<${type}>`); };
}

class Collection {
  constructor(uniqueKeys = false, type = 'any') {
    this.elements = [];
    this.uniqueKeys = uniqueKeys;

    if (!type) throw Errors.noTypeProvided;
    this.type = type;
  }


  get length() {
    return this.elements.length;
  }

  /**
   * Get all elements from the Collection.
   * Returns elements[]
   */
  getAll() {
    return this.elements;
  }

  /**
   * 
   * @param { number } index
   */
  get(index) {
    return this.elements[index];
  }

  /**
   * Remove all elements from the Collection.
   */
  clear() {
    this.elements = [];
  };

  /**
   * (private)
   * No type safety. For private class use.
   * @param {Type} value
   */
  push(value) {
    this.elements.push(value);
  }

  /**
    * (private)
    * No checks. For private class use.
    * @param {Number} index
    */
  splice(index) {
    this.elements.splice(index, 1);
  }
}

class Dictionary extends Collection {
  /**
   * Dictionary of key-value pairs.
   * @param {Boolean} uniqueKeys Whether the keys should be unique or not.
   * Optional. It defaults to false
   * @default {false}
   */
  constructor(uniqueKeys) {
    super(uniqueKeys, 'any');
  }

  getAllValues() {
    let allValues = [];

    for (let i = 0; i < this.elements.length; ++i) {
      allValues.push(Object.values(this.elements[i])[0]);
    }

    return allValues;
  }

  add(key, value) {
    if (this.uniqueKeys) {
      if (this.findIndexOfKey(key) !== false)
        throw new Error(Errors.existingKey);
    }

    this.push({ [key]: value });
  }

  /*
   * Removes an item in the Dictionary with the provided key.
   * @return { bool }
   */
  remove(key) {
    const index = this.findIndexOfKey(key);
    if (index === false)
      return false;

    this.splice(index);
    return true;
  }

  /*
   * Updates an item in the Dictionary with the provided key.
   * @param { any } key
   * @param { any } newValue
   * @return { bool }
   */
  updateByKey(key, newValue) {
    const index = this.findIndexOfKey(key);
    if (index === false)
      return false;

    return this.updateByIndex(index, newValue);
  }
  /*
   * Updates an item in the Dictionary with the provided index.
   * @param { any } key
   * @param { any } newValue
   * @return { bool }
   */

  updateByIndex(idx, newValue) {
    try {
      Object.defineProperty(this.elements[idx], key, {
        value: newValue
      });

      return true;

    } catch (e) {
      return false;
    }
  }

  /**
   * Get a value with its index. Returns an array with the values.
   * @param {number} index
   * @return {any[]}
   */
  getByIndex(index) {
    return Object.values(this.elements[index])[0];
  }

  /**
   * Get a key with its index.
   * @param {number} index
   * @return {any}
   */
  getKeyByIndex(index) {
    return Object.keys(this.elements[index])[0];
  }

  /**
   * Returns the value by key or <false> if not found.
   * @param { any } key
   * @returns { any | false }
   */
  getByKey(key) {
    try {
      const keyIdx = this.findIndexOfKey(key);

      if (keyIdx === false)
        return false;

      return this.elements[keyIdx][key];

    } catch (e) {
      console.error(e);
    }
  }

  findIndexOfKey(key) {
    for (let i = 0; i < this.elements.length; i++) {
      if (Object.keys(this.elements[i])[0] === key)
        return i;
    }

    return false;
  }
}

// Type safe list.
class List extends Collection {
  /**
   * 
   * The Type of the list.
   * ('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
   * @param {String} type
   */
  constructor(type) {
    super(false, type);
  }

  /**
   * Add a new item to the List<T>.
   * @param {Type} value
   */
  add(value) {
    switch (this.type) {
      case 'any':
        return this.push(value);
      case 'int':
        if (this.isInt(value)) {
          return this.push(value);
        }
        break;
      case 'float':
        if (this.isFloat(value)) {
          return this.push(value);
        }
        break;
      default:
        if (typeof value === this.type)
          return this.push(value);
        break;
    }

    throw Errors.wrongType(this.type);
  }

  /**
   * Remove an new item from the List<T> by index.
   * @param {Number} index
   */
  remove(index) {
    this.splice(index);
  };

  /**
   * (private)
   * @param {Number} value
   */
  isInt(value) {
    if (typeof value !== 'number')
      return false;

    return value % 1 === 0;
  }

  /**
   * (private)
   * @param {Number} value
   */
  isFloat(value) {
    if (typeof value !== 'number')
      return false;

    return value % 1 !== 0;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class ErrorHandler {
  constructor() {
    DevErrors.cantInstantiateStatic( 'ErrorHandler' );
  }

  /**
   * 
   * @param { Response } res Fetch Response object.
   */
  static requestErrors( res ) {
    if ( res.status === 400 ) {
      // TODO: Handle error.
      // Take error from Response object and show notification.
    } else if ( res.status === 500 ) {
      // TODO: Handle error.
      // Show notification of something like "There was an error.".
    }
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * Note: All methods are asynchronous.
 */
class HttpClient {
  constructor() {
    throw new Error( 'Can not instantiate the static classs HttpClient' );
  }

  /**
   * Awaitable (async/await) Fetch JSON object or an error.
   * 
   * @param { string } url
   * @param { boolean } jwtAuth
   * 
   * @return { Promise<JSON | Error> }
   */
  static get( url, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Get, url, null, jwtAuth )
        .then( res => resolve( res.json() ) )
        .catch( e => reject( e ) );
    } );
  }

  /**
   * Returns a Fetch Response object or an error.
   *
   * @param {any} url
   * @param {any} body
   * @param {any} jwtAuth
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static post( url, body, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Post, url, body, jwtAuth )
        .then( res => { resolve( res.json() ); } )
        .catch( err => { reject( err ); } );
    } );
  }

  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param {any} url
   * @param {any} body
   * @param {any} jwtAuth
   * 
   * @return { Promise<JSON | Error> }
   */
  static put( url, body, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Put, url, body, jwtAuth )
        .then( res => { resolve( res.json() ); } )
        .catch( err => { reject( err ); } );
    } );
  }

  static delete( url, jwtAuth = true ) {
    return new Promise( async ( resolve, reject ) => {
      HttpClient.request( RequestType.Delete, url, null, jwtAuth )
        .then( res => { resolve( res.json() ); } )
        .catch( err => { reject( err ); } );
    } );
  }

  /**
   * Returns a Fetch Response object or an error.
   * 
   * @param { RequestType } requestType
   * @param { string } url
   * @param { any } body
   * @param { boolean } jwtAuth Whether or not to use JWT authentication (from localStorage).
   * @param {any} Callback
   * 
   * @return { Response }
   */
  static request( requestType, url, body = null, jwtAuth = true, Callback ) {
    return new Promise( async ( resolve, reject ) => {

      let requestObject = {
        method: requestType,
        headers: {}
      };

      if ( jwtAuth )
        requestObject.headers['Authorization'] = 'Bearer ' + localStorage.getItem( AUTH_TOKEN_ID );

      if ( requestType === RequestType.Post || requestType === RequestType.Put ) {
        requestObject.body = !body ? '' : JSON.stringify( body );
        requestObject.headers['Content-Type'] = 'application/json;charset=utf-8';
      }

      await fetch( url, requestObject )
        //.then( res => { return res.json(); } )
        //.then( jsonData => { return Callback( null, jsonData ); } )
        .then( res => { return resolve( res ); } )
        .catch( err => { return reject( err ); } );
    } );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const exchangeClientUtils = Object.freeze( {
  calcPriceChange: ( lastPrice, openDayPrice ) => {
    return lastPrice - openDayPrice;
  },

  calcPercentChange: ( priceChange, openDayPrice ) => {
    return ( priceChange / openDayPrice ) * 100;
  }
} );

// TODO: Add support for multiple exchanges.

let exchangeClient = null;

class ExchangeClient {
  constructor() {
    if ( exchangeClient )
      return exchangeClient;

    this.kraken = new ccxt.kraken( { rateLimit: true } );

    if ( !this.kraken.has['CORS'] )
      this.kraken.proxy = 'https://coinelity-proxy.glitch.me/'; // 'https://cors-escape.herokuapp.com/';

    exchangeClient = this;
    Object.seal( exchangeClient );
  }

  /** @returns { ExchangeClient } */
  static get _() { return exchangeClient; }

  /**
   * 
   * @param { string } name
   * 
   */
  getExchangeObject( name ) {
    switch ( name.toUpperCase() ) {
      case 'KRAKEN':
        return this.kraken;
      default:
        return null;
    }
  }

  getRateLimit( exchangeName ) {
    return this.getExchangeObject( exchangeName ).rateLimit;
  }

  /** @returns { string[] } */
  getAllPairs( exchangeName, Callback ) {
    ( async () => {
      await this.getExchangeObject( exchangeName ).loadMarkets();

      return Callback( this.kraken.symbols );
    } )();
  }

  /**
   * 
   * Returns Promise<string{} | undefined> (example):
    {
      'symbol':        string symbol of the market ('BTC/USD', 'ETH/BTC', ...)
      'info':        { the original non-modified unparsed reply from exchange API },
      'timestamp':     int (64-bit Unix Timestamp in milliseconds since Epoch 1 Jan 1970)
      'datetime':      ISO8601 datetime string with milliseconds
      'high':          float, // highest price
      'low':           float, // lowest price
      'bid':           float, // current best bid (buy) price
      'bidVolume':     float, // current best bid (buy) amount (may be missing or undefined)
      'ask':           float, // current best ask (sell) price
      'askVolume':     float, // current best ask (sell) amount (may be missing or undefined)
      'vwap':          float, // volume weighed average price
      'open':          float, // opening price
      'close':         float, // price of last trade (closing price for current period)
      'last':          float, // same as `close`, duplicated for convenience
      'previousClose': float, // closing price for the previous period
      'change':        float, // absolute change, `last - open`
      'percentage':    float, // relative change, `(change/open) * 100`
      'average':       float, // average price, `(last + open) / 2`
      'baseVolume':    float, // volume of base currency traded for last 24 hours
      'quoteVolume':   float, // volume of quote currency traded for last 24 hours
     }
   *
   * @param { string } exchangeName
   * @param { string } symbol
   * @param { Function } Callback (string{} | undefined)
   * @returns { Promise<string{} | undefined> }
   */
  getLastTicker( exchangeName, symbol, Callback ) {
    return new Promise( async ( resolve, reject ) => {
      let ticker = undefined;

      try {
        ticker = await this.getExchangeObject( exchangeName ).fetchTicker( symbol );

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      if ( Callback )
        return Callback( ticker );

      return resolve( ticker );
    } );
  }

  /**
   * Returns <string> (example):
     [
          1504541580000, // UTC timestamp in milliseconds, integer
          4235.4,        // (O)pen price, float
          4240.6,        // (H)ighest price, float
          4230.0,        // (L)owest price, float
          4230.7,        // (C)losing price, float
          37.72941911    // (V)olume (in terms of the base currency), float
     ]
   * 
   * @param { string } exchangeName The exchange name.
   * @param { string } symbol The asset symbol.
   * @param { string } timeframe 1m, 5m, 15m, 30m, 1h, 4h, 1d, 7d, 1M.
   * @param { Function } Callback Receives a <string> representation of the last OHLC candle.
   */
  getLastOHLCV( exchangeName, symbol, timeframe, Callback ) {
    ( async () => {
      let OHLCV = undefined;

      try {
        OHLCV = await this.getExchangeObject( exchangeName ).fetchOHLCV( symbol, timeframe, null, 10 );

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      return Callback( OHLCV[OHLCV.length - 1] );
    } )();
  }

  /**
   * Returns <string[]> (example):
   * [
         [
              1504541580000, // UTC timestamp in milliseconds, integer
              4235.4,        // (O)pen price, float
              4240.6,        // (H)ighest price, float
              4230.0,        // (L)owest price, float
              4230.7,        // (C)losing price, float
              37.72941911    // (V)olume (in terms of the base currency), float
         ]
     ]
   * 
   * @param { string } exchangeName The exchange name.
   * @param { string } symbol The asset symbol.
   * @param { string } timeframe 1m, 5m, 15m, 30m, 1h, 4h, 1d, 7d, 1M.
   * @param { Function } Callback Receives a <string[]> representation of the last OHLC candle.
   * 
   * @returns { Promise<string[] | Error> }
   */
  getOHLCV( exchangeName, symbol, timeframe, Callback ) {
    return new Promise( async ( resolve, reject ) => {
      let OHLCVArray = undefined;

      try {
        OHLCVArray = await this.getExchangeObject( exchangeName ).fetchOHLCV( symbol, timeframe );

      } catch ( e ) {
        if ( Callback )
          return Callback( e, undefined );

        return reject( e );
      }

      if ( Callback )
        return Callback( null, OHLCVArray );

      return resolve( OHLCVArray );
    } );
  }

  /**
   * 
   * @param { string } symbol
   * @param { Function } Callback Called in the end of the execution. Receives a <string> representation of SpreadPricesModel.
   */
  getCurrentSpreadPrices( exchangeName, symbol, Callback ) {
    ( async () => {
      let orderBook = undefined;

      try {
        orderBook = await this.getExchangeObject( exchangeName ).fetchOrderBook( symbol, 4 );
      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      const bid = orderBook.bids.length > 0 ? orderBook.bids[0][0] : undefined;
      const ask = orderBook.asks.length > 0 ? orderBook.asks[0][0] : undefined;
      const spreadPriceDiff = bid && ask ? ask - bid : undefined;
      const spreadPercentDiff = bid && ask ? 100 * ( spreadPriceDiff / ask ) : undefined;

      return Callback( new SpreadPricesModel( bid, ask, spreadPriceDiff, spreadPercentDiff ) );
    } )();
  }

  getLastTrade( exchangeName, symbol, Callback ) {
    ( async () => {
      let trades = undefined;

      try {
        trades = await this.getExchangeObject( exchangeName ).fetchTrades( symbol, null, 10 );
        trades = trades[trades.length - 1];

      } catch ( e ) {
        console.error( `EXCEPTION: \n${e}` );
      }

      return Callback( trades );
    } )();
  }

  getLastPrice( exchangeName, symbol, Callback ) {
    try {

      this.getLastTicker( exchangeName, symbol, ( ticker ) => {
        return Callback( ticker ? ticker.last : undefined );
      } );

    } catch ( e ) {
      console.error( `EXCEPTION: \n${e}` );
    }
  }

  getChange( exchangeName, symbol, Callback ) {
    try {
      this.getLastTicker( exchangeName, symbol, ( ticker ) => {
        if ( !ticker )
          return Callback( undefined );

        const priceChange = exchangeClientUtils.calcPriceChange( ticker.last, ticker.open );
        const percentChange = exchangeClientUtils.calcPercentChange( priceChange, ticker.open );

        return Callback( new ChangeModel( ticker.last, priceChange, percentChange ) );

      } );

    } catch ( e ) {
      console.error( `EXCEPTION: \n${e}` );
    }
  }

}


new ExchangeClient();

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let authentication = null;

class Authentication {
  constructor() {
    if ( authentication )
      throw DevErrors.singleIntance( 'Authentication' );

    authentication = this;
    Object.seal( authentication );
  }

  static get _() { return authentication; }

  logout() {
    localStorage.removeItem( AUTH_TOKEN_ID );
    window.location = BASE_URL;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

page();

page( `/${NavItemID.Dashboard}`, () => {
  NavbarController._.activateItem( NavItemID.Dashboard );
} );

//page( `/${NavItemID.TradeRoom}`, () => {
//  NavbarController._.activateItem( NavItemID.TradeRoom );
//  page.redirect( `/${ NavItemID.Markets }` );
//} );

page( `/${NavItemID.Markets}`, () => {
  NavbarController._.activateItem( NavItemID.Markets );
  TradeRoomController._.openMarkets();
} );

page( `/${NavItemID.Trade}/:assetID`, ( ctx ) => {
  TradeRoomController._.tradeAsset( ctx.params.assetID );
} );

page( `/${NavItemID.Settings}`, () => {
  NavbarController._.activateItem( NavItemID.Settings );
} );

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// SweetAlert2
// https://github.com/sweetalert2/sweetalert2

class Notifications {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'Notifications' );
  }

  static successToast( title, description = '' ) {
    swall( { toast: true, timer: 5000, title: title } );
  }

  static successToastAndIcon( title, description = '' ) {
    swall( { type: 'success', timer: 5000, title: title } );
  }

  static successPopUp( title, description = '' ) {
    swall();
  }

  static successPopUpAndIcon( title, description = '' ) {
    swall();
  }

  static infoToast( title, description = '' ) {
    swall();
  }

  static infoToastAndIcon( title, description = '' ) {
    swall();
  }

  static infoPopUp( title, description = '' ) {
    swall();
  }

  static infoPopUpAndIcon( title, description = '' ) {
    swall();
  }

  static errorToast( title, description = '' ) {
    swall();
  }

  static errorToastAndIcon( title, description = '' ) {
    swall();
  }

  static errorPopUp( title, description = '' ) {
    swall();
  }

  static errorPopUpAndIcon( title, description = '' ) {
    swall();
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */


/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * Extended by ControllerBase.
 */
class NavbarItemBase {
  /**
   * 
   * @param { PageModelBase } model An extended PageModelBase.
   * @param { PageViewBase } view An extended PageViewBase.
   */
  constructor(model, view) {
    this.id = model.id;
    this.navbarItemType = model.navbarItemType;
    this.navIconURL = model.navIconURL;
    this.content = view.initContent;
    this.targetElement = view.targetElement;

    this.model = model;
    this.view = view;
  }

  injectContent( navbarItemType ) {
    if ( navbarItemType === NavbarItemType.Page )
      this.targetElement().innerHTML = PageTemplates.page( this.content );
    else if ( navbarItemType === NavbarItemType.NavbarPanelItem )
      throw DevErrors.notImplemented();
  }

  injectIDInView() {
    this.view.injectID( this.model.id );
  }

  // #region EVENTS

  /**
   * Event fired when the page/item is injected into the DOM.
   * 
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   */
  onSetActiveBase( navbarItemType ) {
    this.injectContent( navbarItemType );
    this.injectIDInView();

    // "in" operator to test for properties that are inherited by child classes.
    if ( 'onSetActive' in this )
      this.onSetActive();
  }

  /**
   * Event fired just before the page/item is destroyed (removed) from the DOM.
   */
  onBeforeDestroyBase() {
    if ( 'onBeforeDestroy' in this )
      this.onBeforeDestroy();
  }

  // #endregion
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * Available events:
 * - onSetActive(): Event fired when the page/item is injected into the DOM.
 * - onBeforeDestroy(): Fired just before the page/item is destroyed (removed) from the DOM.
 * */
class ControllerBase extends NavbarItemBase {
  /**
   * 
   * @param { ModelBase } model An extended ModelBase.
   * @param { ViewBase } view An extended ViewBase.
   */
  constructor( model, view ) {
    super( model, view );

    this.model = model;
    this.view = view;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class ModelBase {
  /**
   * @param { NavItemID } id NavItemID enum
   * Used for storing in Dictionaries and as the URL slug for pages.
   * @param { NavbarItemType } navbarItemType NavbarItemType enum.
   * @param { string } title Used as label on the navbar.
   * @param { string } navIconURL
   */
  constructor( id, navbarItemType, title, navIconURL ) {
    this.id = id;
    this.navbarItemType = navbarItemType;
    this.title = title;
    this.navIconURL = navIconURL;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * These templates depend on the Foundation framework.
 */
class PageTemplates {
  /**
   * 
   * @param { string } content The content to insert inside the global page template.
   * 
   * @returns { string } HTML string.
   */
  static page(content) {
    return `
      <main class="page">
        ${content}
      </main>`;
  }

  static inputElem( label, type, id, placeholder = '', additionalAttributes = '' ) {
    return `
      <label>${ label }
        <input type="${ type }" placeholder="${ placeholder }" id="${ id }" name="${ id }" ${ additionalAttributes }>
      </label>
    `;
  }

  static inputNumElem( label, id, min, max, placeholder = '', additionalAttributes = '' ) {
    return PageTemplates.inputElem( label, 'number', id, placeholder, `min="${min.toString()}" max="${max.toString()}" ` + additionalAttributes );
  }

  static successButton(label, id, addicionalClasses = '') {
    return `
      <a id="${id}" class="success button ${addicionalClasses}">${label}</a>
    `;
  }

  /**
   * 
   * @param {any} label
   * @param {any} id
   * @param { ButtonType } buttonType
   * @param {any} addicionalClasses
   */
  static button( label, id, buttonType, addicionalClasses = '' ) {
    return `
      <a id="${id}" class="${buttonType} button ${addicionalClasses}">${label}</a>
    `;
  }

  /**
   * 
   * @param { string } label
   * @param { SelectInputOptions[] } options
   */
  static selectInput( selectId, label, options, selectAddicionalClasses = '' ) {
    let optionsHtml = '';

    for ( let i = 0; i < options.length; ++i ) {
      optionsHtml += `<option value="${ options[i].value }">${ options[i].label }</option>`;
    }

    return `
      <label>${ label }
        <select id="${ selectId }" class="${ selectAddicionalClasses }">
          ${ optionsHtml }
        </select>
      </label>
    `;
  }

  static switchInput( id, leftLabel, rightLabel ) {
    return `
      <div class="switch">
        <label class="s-label" for="${ id }">
          ${ leftLabel }
        </label>

        <input class="switch-input" id="${ id }" type="checkbox" name="${ id }">
        <label class="switch-paddle" for="${ id }">
          <span class="show-for-sr"></span>
        </label>

        <label class="s-label" for="${ id }">
          ${ rightLabel }
        </label>
      </div>
    `;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class ViewBase {
  /**
   * 
   * @param { string } initContent The content to inject when the page/navbar panel item get activated.
   * @param { () => HTMLElement } targetElement (optional) Function to select the DOM injection target element.
   * Default: (id) 'page-container'
   */
  constructor( initContent, targetElement = () => { return document.getElementById( 'page-container' ); } ) {
    this.initContent = initContent;
    this.targetElement = targetElement;
  }

  injectID( id ) {
    document.getElementById( 'page-container' ).firstElementChild.id = id;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class DashboardTemplates {
  constructor() {
    throw new Error( 'You can not instantiate DashboardTemplates (static class)' );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardModel = null;

class DashboardModel extends ModelBase {
  constructor() {
    if (dashboardModel)
      throw new Error("There can only be one instance of DashboardModel.");

    super( NavItemID.Dashboard, NavbarItemType.Page, 'Dashboard', DASHBOARD_ICON_URL );

    dashboardModel = this;
    Object.seal( dashboardModel );
  }

  static get _() { return dashboardModel; }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
  * Do not use this directly.
  * Use "DashboardModel._" or "DashboardController.model" instead.
  */
let dashboardView = null;

class DashboardView extends ViewBase {
  constructor() {
    if ( dashboardView )
      throw DevErrors.singleIntance( 'DashboardView' );

    super( '<h1>Dashboard</h1>' );

    dashboardView = this;
    Object.freeze( dashboardView );
  }

  static get _() { return dashboardView; }
}

/*
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

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class TradeTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'TradeTemplates' );
  }

  static get chartElemId() { return 'trading-chart'; }

  /**
   * The page content container (grid).
   */
  static container() {
    return `
      <section id="trade" class="grid-container fluid">
        <div class="grid-x trade-content-wrapper">
      
          <section class="cell trading-chart-wrapper">
          </section>
        
          <section class="cell trading-tools-wrapper">
          </section>

        </div>
      </section>
    `;
  }

  static chart() {
    return `
        <article id="${TradeTemplates.chartElemId}">
        </article>
    `;
  }

  static binaryOptionsTools( userAccountType ) {
    /**
     * (Refactor the inputs: Add plus/minus signs to the money inputs and the option lifetimes; ).
     * Here inject the rigth tools based on the user account type (real or demo).
     * Real: erous and credits.
     * Demo: paper euros.
     */
    return `
      <form class="cell">
        ${
          // PageTemplates.selectInput( 'trade-mode', 'Trade Mode', [new SelectInputOptions( 'Binary Option', TradingMode.BinaryOptions ), new SelectInputOptions( 'CFD', TradingMode.CFD )], 'round-borders-1' ) +
          PageTemplates.selectInput( 'option-lifetime', 'Option Lifetime', [new SelectInputOptions( '1m', '1m' ), new SelectInputOptions( '15m', '15m' ), new SelectInputOptions( '1h', '1h' )], 'round-borders-1' ) +
          TradeTemplates.realAccountInputs() +
          PageTemplates.button( `
            <span class="icon call"></span>
            <span class="lbl">Call</span>`,
          'call-btn', ButtonType.Success, 'btn round-borders-1' ) +

          `<p class="curr-price">
             <span id="trading-tools_current-price"></span>
             <span id="trading-tools_fiat-symbol"></span>
           </p>` +

          PageTemplates.button( `
            <span class="icon put"></span>
            <span class= "lbl">Put</span>`,
            'put-btn', ButtonType.Alert, 'btn round-borders-1' )
         }
      </form>
    `;
  }

  static realAccountInputs {
    return PageTemplates.inputNumElem( 'Investment Amount', 'investment-amount', 1, '', '1', 'class = "round-borders-1"') +
  }
  
  static demoAccountInputs {
    return '';
  }

  static CFDTools() {
    return `
      <article class="cell">
      </article>
    `;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// TODO: (FRONTEND) Add the line chart.

let tradeModel = null;

class TradeModel extends ModelBase {
  constructor() {
    if ( tradeModel )
      throw DevErrors.singleIntance( 'TradeModel' );

    super( '', '', '', '' );

    /** @type { UserAccountType } */
    this.currentAccounType;
    this.currentTradeMode = TradingMode.BinaryOptions;
    this.currentSymbol = 'BTC/EUR';
    this.currentFiatSymbol = FiatSymbol.Euro;
    this.currentExchange = 'KRAKEN';
    this.currentTimeframe = ChartTimeframeType.Min1;

    this.optionsConnection;
    this.openOrders = new Dictionary( true );

    this.chartUpdatePriceInterval = null;
    this.chartUpdateCandleInterval = null;

    this.chart = {};
    this.chartData = {
      categoryData: [],
      values: []
    };
    this.chartConfig = CHART_CONFIG;

    tradeModel = this;
    Object.seal( tradeModel );
  }

  get _() { return tradeModel; }

  getInitChartData() {
    return new Promise( async ( resolve, reject ) => {
      let OHLCVArray;

      try {
        OHLCVArray = await this.getOHLCV();

      } catch {
        // TODO: Send error notification.
        return console.error( 'There was an error while trying to connect to the data provider.' );
      }

      for ( let i = 0; i < OHLCVArray.length; ++i ) {
        this.chartData.categoryData.push( Utils.unixMilisecondsToHuman( OHLCVArray[i][0] ) );
        //                                 open             close             lowest           highest
        this.chartData.values.push( [OHLCVArray[i][1], OHLCVArray[i][4], OHLCVArray[i][3], OHLCVArray[i][2]] );
      }

      return resolve( [this.chartData] );
    } );
  }

  initEventHandlers() {
    this.chart.on( 'datazoom', ( e ) => {
      if ( e.batch === undefined ) {
        this.chartConfig.dataZoom[0].start = e.start;
        this.chartConfig.dataZoom[0].end = e.end;

      } else {
        const eventValues = e.batch[0];
        this.chartConfig.dataZoom[0].start = eventValues.start;
        this.chartConfig.dataZoom[0].end = eventValues.end;
      }
    } );

    this.chart.on( 'restore', async () => {
      // TODO: Control the restore (rate limit).
      this.chartData.categoryData = [];
      this.chartData.values = [];
      await this.getInitChartData();
      this.chart.setOption( this.chartConfig );
    } );
  }

  /** 
   * It returns the promise when it finishes connecting or gets in an infinite loop.
   */
   connectToOptionsHub() {
    return new Promise( async (resolve, reject) => { 
      this.optionsConnection = new signalR.HubConnectionBuilder()
        .withUrl( 'options' )
        // TODO: (FRONTEND) (PRODUCTION) Change to only show errors.
        // .configureLogging( signalR.LogLevel.Error )
        .configureLogging( signalR.LogLevel.Trace )
        .build();

      this.__initOptionsHubListeners();
      this.__startOptionsHubConnection();

      // Reconnection loop.
      this.optionsConnection.onclose( async () => {
        returns await this.__startOptionsHubConnection();
      } );
    } );
  }

  async __startOptionsHubConnection() {
    try {
      return await this.optionsConnection.start();

    } catch ( e ) {
      console.error( e );
      setTimeout( () => this.__startOptionsHubConnection(), 5000 );
    }
  }

  async stopOptionsHubConnection() {
    try {
      await this.optionsConnection.stop();

    } catch ( e ) {
      console.error( e );
      setTimeout( () => this.stopOptionsHubConnection(), 5000 );
    }
  }

  __initOptionsHubListeners() {
    this.optionsConnection.on( 'ReceivePlaceOptionResult', ( res ) => {
      console.debug( res );
    } );

    this.optionsConnection.on( 'ReceiveCheckOptionResult', ( res ) => {
      console.debug( res );
    } );

    this.optionsConnection.on( 'ReceiveSyncResult', ( res ) => {
      console.debug( res );
    } );
  }

  // TODO: (FRONTEND) Show notification.
  placeOrder( placeOptionDTO ) {
    this.optionsConnection.invoke( 'PlaceOrder', placeOptionDTO )
                          .catch( e => console.error( e ) );
  }

  checkOrder( checkOrderDTO ) {
    this.optionsConnection.invoke( 'CheckOrder', checkOrderDTO ) 
                          .catch( e => console.error( e ) );
  }

  syncOrders() {
    this.optionsConnection.invoke( 'SyncOrders' )
                          .catch( e => console.error( e ) );
  }

  /**
   * 
   * @param { Function } Callback Optional (<OHLCV | undefined>)
   * @returns { Promise<string[]> }
   */
  getOHLCV() {
    return new Promise( async ( resolve, reject ) => {
      let success = false;
      let lastError = null;
      let attemptNum = 0;
      let OHLCVArray;

      while ( !success ) {
        try {
          OHLCVArray = await ExchangeClient._.getOHLCV( this.currentExchange, this.currentSymbol, this.currentTimeframe );

        } catch ( e ) {
          ++attemptNum;
          lastError = e;

        } finally {
          if ( attemptNum > FETCH_CHART_DATA_MAX_ATTEMPTS ) {
            console.error( 'There was an error while fetching the data.', lastError );
            return reject( lastError );
          }

          // Just to confirm.
          if ( Array.isArray( OHLCVArray ) )
            success = true;
        }
      }

      return resolve( OHLCVArray );
    } );
  }

  getTicker() {
    return new Promise( async ( resolve, reject ) => {
      let success = false;
      let lastError = null;
      let attemptNum = 0;
      let ticker;

      while ( !success ) {
        try {
          ticker = await ExchangeClient._.getLastTicker( this.currentExchange, this.currentSymbol );

        } catch ( e ) {
          ++attemptNum;
          lastError = e;

        } finally {
          if ( attemptNum > FETCH_CHART_DATA_MAX_ATTEMPTS ) {
            console.error( 'There was an error while fetching the data.', lastError );
            return reject( lastError );
          }

          // Just to confirm.
          if ( typeof ticker === 'object' )
            success = true;
        }
      }

      return resolve( ticker );
    } );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let tradeView = null;

class TradeView extends ViewBase {
  constructor() {
    if ( tradeView )
      throw DevErrors.singleIntance( 'TradeView' );

    super( '' );

    tradeView = this;
    Object.freeze( tradeView );
  }

  get tradeContentWrapper() { return document.getElementsByClassName('trade-content-wrapper')[0]; }
  get tradingChartWrapper() { return document.getElementsByClassName( 'trading-chart-wrapper' )[0]; }
  get tradingToolsPriceElem() { return document.getElementById( 'trading-tools_current-price' ); }
  get tradingToolsFiatSymbolElem() { return document.getElementById( 'trading-tools_fiat-symbol' ); }

  /** @returns { UserAccountType } */
  getCurrentAccountType() { return document.getElementById( 'account-btns' ).getElementsByClassName( 'active' )[0].id === 'real-account-btn' ? UserAccountType.RealBalance : UserAccountType.PaperBalance; }

  injectContainer() {
    document.getElementById( NavItemID.Markets ).innerHTML = TradeTemplates.container();
  }

  injectChartTemplate() {
    this.tradingChartWrapper.innerHTML += TradeTemplates.chart();
  }

  /**
   * 
   * @param { TradingMode } tradingToolsType
   */
  injectTradingTools( tradingToolsType ) {
    // TODO: (FRONTEND) Get the current account type from the topbar.
    const currentAccountType = this.getCurrentAccountType();
    let tradingToolsWrapper = document.getElementsByClassName( 'trading-tools-wrapper' )[0];

    if ( tradingToolsType === TradingMode.BinaryOptions )
      tradingToolsWrapper.innerHTML = TradeTemplates.binaryOptionsTools();
    else
      tradingToolsWrapper.innerHTML = TradeTemplates.CFDTools();
  }

  updateTradingToolsFiatSymbol( fiatSymbol = FiatSymbol.Euro ) {
    this.tradingToolsFiatSymbolElem.innerHTML = fiatSymbol;
  }

  updateTradingToolsCurrPrice( price ) {
    this.tradingToolsPriceElem.innerText = price;
  }

}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let tradeController = null;

class TradeController extends ControllerBase {
  constructor() {
    if ( tradeController )
      throw DevErrors.singleIntance( 'TradeController' );

    super(
      new TradeModel(),
      new TradeView()
    );

    tradeController = this;
    Object.freeze( tradeController );
  }

  /**
   * 
   * @param { string } assetID The asset symbol.
   */
  async injectContent( symbolId ) {
    this.model.currentSymbol = symbolId;
    this.view.injectContainer();
    await this.__injectChart();
    this.__injectTradeTools();
    this.view.updateTradingToolsFiatSymbol();
    this.model.connectToOptionsHub();
  }

  __injectChart() {
    return new Promise( async ( resolve, reject ) => {
      this.model.currentAccountType = this.view.getCurrentAccountType();
      this.view.injectChartTemplate();
      await this.model.getInitChartData();
      this.model.chart = echarts.init( document.getElementById( TradeTemplates.chartElemId ) );
      this.model.chart.setOption( this.model.chartConfig );
      this.model.initEventHandlers();
      await this.__startChartPriceUpdate();
      this.__startChartCandleUpdate();

      return resolve();
    } );
  }

  __startChartCandleUpdate() {
    setTimeout( () => {
      this.__updateCandles();

      this.model.chartUpdateCandleInterval = setInterval( async () => {
        await this.__updateCandles();
      }, Utils.getMilisecondsFromChartTimeframe( this.model.currentTimeframe ) );

       // Only start at the next timeframe candle.
    }, Utils.getTimeToNextTimeframe( this.model.currentTimeframe ) );
  }

  __startChartPriceUpdate() {
    this.model.chartUpdatePriceInterval = setInterval( async () => {
      let ticker = undefined;

      try {
        ticker = await this.model.getTicker();

        if ( ticker === undefined )
          throw new Error();

        const lastPrice = parseFloat( ticker.last );
        const allCandles = this.model.chartConfig.series[0].data;
        const lastCandle = allCandles[allCandles.length - 1];
        // Close
        lastCandle[1] = lastPrice;
        // Low
        if ( lastPrice < parseFloat( lastCandle[2] ) )
          lastCandle[2] = lastPrice;
        // High
        if ( lastPrice > parseFloat( lastCandle[3] ) )
          lastCandle[3] = lastPrice;
       
        this.model.chart.setOption( this.model.chartConfig );
        this.view.updateTradingToolsCurrPrice( lastPrice.toString() );

      } catch {
        // TODO: (FRONTEND) Show error notification.
        return console.error( 'There was an error while trying to connect to the data provider.' );
      }
    }, TRADE_PRICE_UPDATE_RATE );
  }

  stopChartUpdate() {
    if ( this.model.chartUpdateCandleInterval )
      clearInterval( this.model.chartUpdateCandleInterval );

    if ( this.model.chartUpdatePriceInterval )
      clearInterval( this.model.chartUpdatePriceInterval );
  }

  __injectTradeTools() {
    this.view.injectTradingTools( this.model.currentTradeMode );
  }

  async __updateCandles() {
    let OHLCVArray = undefined;

    try {
      OHLCVArray = await this.model.getOHLCV();

      if ( OHLCVArray === undefined )
        throw new Error();

      const lastOHLCV = OHLCVArray[OHLCVArray.length - 1];
      const allDates = this.model.chartConfig.xAxis.data;
      allDates.shift();
      allDates.push( Utils.unixMilisecondsToHuman( lastOHLCV[0] ) );
      const allCandles = this.model.chartConfig.series[0].data;
      allCandles.shift();
      allCandles.push( [lastOHLCV[1], lastOHLCV[4], lastOHLCV[3], lastOHLCV[2]] );
      this.model.chart.setOption( this.model.chartConfig );

    } catch {
      // TODO: (FRONTEND) Show error notification.
      return console.error( 'There was an error while trying to connect to the data provider.' );
    }
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class MarketsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'MarketsTemplates' );
  }

  static get idPostfix() { return '-coin-card'; }

  static container() {
    return `
      <section id="markets" class="">
        <h3>Markets</h3>
        <div class="grid-x grid-padding-x markets-cards-wrapper">

        </div>
      </section>
    `;
  }

  /**
   * 
   * @param { string } coinName For display and logic (id) purposes.
   * @param { string } coinImgUrl The coin logo image url.
   * @param { string } price
   * @param { fiatSymbol } fiatSymbol
   * @param { string } priceChange
   * @param { string } percentChange
   * 
   * @returns { string } HTMLElement string.
   */
  static coinCard(coinName, coinImgUrl, price, fiatSymbol, priceChange, percentChange) {
    return `
      <article class="cell small-12 medium-6 large-2 coin-card" id="${coinName}${MarketsTemplates.idPostfix}">
        <div class="card">
          <img class="float-center" src="${coinImgUrl}" alt="${coinName} Logo">
          <div class="card-section">
            <h4 class="name">${coinName}</h4>
            <p>
              <span class="price">
                <span id="${coinName}-curr-price">${price}</span>${fiatSymbol}
              </span>
              <span class="change">
                <span id="${coinName}-price-change">${priceChange}</span>
                (<span id="${coinName}-percent-change">${percentChange}</span>&#37;)
              </span>
            </p>
          </div>
        </div>
      </article>
    `;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let marketsModel = null;

class MarketsModel extends ModelBase {
  constructor() {
    if ( marketsModel )
      throw DevErrors.singleIntance( 'MarketsModel' );

    super( '', '', '', '' );

    this.symbols = new List( 'string' );
    this.cardUpdateInterval = null;

    marketsModel = this;
    Object.seal( marketsModel );
  }

  get lastPriceRoute() { return 'last-price'; }
  get changeRoute() { return 'change'; }

  getLastCoinPrice( symbol, Callback ) {
    ExchangeClient._.getLastPrice( 'KRAKEN', symbol, ( lastPrice ) => {
      return Callback( lastPrice );
    } );
  }

  /**
   * 
   * @param { string } symbol
   * 
   * @param { Function } Callback ChangeModel
   */
  getCoinChange( symbol, Callback ) {
    ExchangeClient._.getChange( 'KRAKEN', symbol, ( changeModel ) => {
      return Callback( changeModel );
    } );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let marketsView = null;

class MarketsView extends ViewBase {
  constructor() {
    if ( marketsView )
      throw DevErrors.singleIntance( 'MarketsView' );

    super( '' );

    marketsView = this;
    Object.freeze( marketsView );
  }

  get element() { return document.getElementById( 'markets' ); }
  get marketsContent() { return document.getElementsByClassName( 'markets-cards-wrapper' )[0]; }

  coinPriceElem( symbol ) { return document.getElementById( symbol + '-curr-price' ); }
  coinPriceChangeElem( symbol ) { return document.getElementById( symbol + '-price-change' ); }
  coinPercentChangeElem( symbol ) { return document.getElementById( symbol + '-percent-change' ); }

  injectContainer() {
    document.getElementById( NavItemID.Markets ).innerHTML = MarketsTemplates.container();
  }

  /**
   * 
   * @param { string } coinSymbol For display and logic purposes.
   * @param { string } coinImgUrl The coin logo image url.
   * @param { number } price
   * @param { string } fiatSymbol
   * @param { number } priceChange
   * @param { number } percentChange
   * 
   * @returns { void }
   */
  addCoinCard( coinSymbol, coinImgUrl, price, fiatSymbol, priceChange, percentChange ) {
    this.marketsContent.innerHTML += MarketsTemplates.coinCard( coinSymbol, coinImgUrl, price.toString(), fiatSymbol, priceChange.toString(), percentChange.toString() );
  }

  updateCoinCard( coinSymbol, price, priceChange, percentChange ) {
    this.coinPriceElem( coinSymbol ).innerText = price.toString();
    this.coinPriceChangeElem( coinSymbol ).innerText = priceChange.toString();
    this.coinPercentChangeElem( coinSymbol ).innerText = percentChange.toString();
  }

  removeCoinCard( coinSymbol ) {
    document.getElementById( coinSymbol + MarketsTemplates.idPostfix ).remove();
  }

  clearContent() {
    this.marketsContent.innerHTML = '';
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let marketsController = null;

class MarketsController extends ControllerBase {
  constructor() {
    if ( marketsController )
      throw DevErrors.singleIntance( 'MarketsController' );

    super(
      new MarketsModel(),
      new MarketsView()
    );

    marketsController = this;
    Object.freeze( marketsController );
  }

  get _() { return marketsController; }

  injectContent() {
    this.view.injectContainer();

    for ( let i = 0; i < 10; ++i ) {
      // TODO: Add [symbols + fiatSymbol + exchange + images] to the database and get them from there.
      // Simulation. Temporary.
      const thisCoinSymbol = 'BTC/EUR' + i.toString();
      this.model.symbols.add( thisCoinSymbol );
      this.view.addCoinCard( thisCoinSymbol, 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png', 7000, FiatSymbol.Euro, 230.73, 3.68 );
    }

    this.setCardUpdate();
    this.addCardListeners();
  }

  setCardUpdate() {
    /** @type { List } */
    const symbols = this.model.symbols;

    this.model.cardUpdateInterval = setInterval( () => {
      for ( let i = 0; i < symbols.length; ++i ) {
        const thisSymbol = symbols.get( i );

        this.model.getCoinChange( thisSymbol.substring( 0, thisSymbol.length - 1), ( coinChange ) => {
          this.view.updateCoinCard( thisSymbol, coinChange.currentPrice, coinChange.price.toFixed(2), coinChange.percent.toFixed(2) );
        } );

      }
    }, MARKETS_UPDATE_RATE );
  }

  addCardListeners() {
    /** @type { List } */
    const symbols = this.model.symbols;

    for ( let i = 0; i < symbols.length; ++i ) {
      const thisSymbol = symbols.get( i );

      DOM.on( 'click', DOM.byId( thisSymbol + MarketsTemplates.idPostfix ), ( e ) => {
        e.preventDefault();
        page( `/${NavItemID.Trade}/${Utils.encondeCoinSymbolUri( thisSymbol.substring( 0, thisSymbol.length - 1 ) )}` );

        return false;
      } );

    }
  }

  stopCardUpdate() {
    if ( this.model.cardUpdateInterval ) {
      clearInterval( this.model.cardUpdateInterval );
    }
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class TradeRoomTemplates {
  constructor() {
    DevErrors.cantInstantiateStatic( 'TradeRoomTemplates' );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let tradeRoomModel = null;

class TradeRoomModel extends ModelBase {
  constructor() {
    if ( tradeRoomModel )
      throw DevErrors.singleIntance( 'TradeRoomModel' );

    super( NavItemID.Markets, NavbarItemType.Page, 'Trade Room', TRADE_ROOM_ICON_URL );

    this.activeContentId = '';

    tradeRoomModel = this;
    Object.seal( tradeRoomModel );
  }

  static get _() { return tradeRoomModel; }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let tradeRoomView = null;

class TradeRoomView extends ViewBase {
  constructor() {
    if ( tradeRoomView )
      throw DevErrors.singleIntance( 'TradeRoomView' );

    super( '' );

    tradeRoomView = this;
    Object.freeze( tradeRoomView );
  }

  static get _() { return tradeRoomView; }

  get element() { return document.getElementById( NavItemID.Markets ); }

  injectContent( content ) {
    this.element.innerHTML = content;
  }

  addContent( content ) {
    this.element.innerHTML += content;
  }

  clearContent() {
    this.element.innerHTML = '';
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let tradeRoomController = null;

/**
 * The Trade Room page controller.
 */
class TradeRoomController extends ControllerBase {
  constructor() {
    if ( tradeRoomController )
      throw DevErrors.singleIntance( 'TradeRoomController' );

    super(
      new TradeRoomModel(),
      new TradeRoomView()
    );

    this.marketsController = new MarketsController();
    this.tradeController = new TradeController();

    tradeRoomController = this;
    Object.freeze( tradeRoomController );
  }

  /**
   * @type { TradeRoomController }
   */
  static get _() { return tradeRoomController; }

  /** 
    "traderoom/markets". Called from traderRoutes.
   */
  openMarkets() {
    this.tradeController.stopChartUpdate();
    this.marketsController.injectContent();
    this.model.activeContentId = NavItemID.Markets;
  }

  /** 
    "traderoom/trade/:assetID". Called from traderRoutes.
   * @param { string } assetID The asset symbol. E.g.: "BTC-EUR" == (BTC/EUR).
   */
  tradeAsset( assetID ) {
    if ( this.model.activeContentId === NavItemID.Trade )
      return;

    this.marketsController.stopCardUpdate();
    this.tradeController.injectContent( Utils.decodeCoinSymbolUri( assetID ) );
    this.model.activeContentId = NavItemID.Trade;
  }

  onBeforeDestroy() {
    this.marketsController.stopCardUpdate();
    this.tradeController.stopChartUpdate();
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class SettingsTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'SettingsTemplates' );
  }

  // TODO: Change to an Accordion Menu.

  static theAccordion( content ) {
    return `
      <ul class="accordion" data-accordion data-allow-all-closed="true">
        ${ content }
      </ul>
    `;
  }

  static __accordionItem( tabId, title, content ) {
    return `
      <li class="accordion-item" data-accordion-item>
        <a href="#${tabId}" class="accordion-title"> ${title} </a>
        <div id="${tabId}" class="accordion-content" data-tab-content>
          ${ content }
        </div>
      </li>
    `;
  }

  static __form( gridOrientationType, gridContent, containerBottomContent = '' ) {
    return `
      <form class="cell small-12 medium-6 large-4">
        <div class="grid-container fluid">
          <div class="${ gridOrientationType }">
            ${ gridContent }
          </div>
          ${containerBottomContent}
        </div>
      </form>
    `;
  }

  static changePassword() {
    return SettingsTemplates.__accordionItem(
      'change-password',
      'Change Password',
      SettingsTemplates.__form( 
        GridOrientationType.Y,

        PageTemplates.inputElem( 'Current Password', 'password', 'curr-pass-input' ) +
        PageTemplates.inputElem( 'New Password', 'password', 'new-pass-input' ) +
        PageTemplates.inputElem( 'Confirm New Password', 'password', 'check-new-pass-input' ),

        PageTemplates.successButton( 'Change Password', 'change-password-button' )
    ) );
  }

  static maxLoginFailes() {
    return SettingsTemplates.__accordionItem(
      'max-login-fails',
      'Maximum Login Fails',
      SettingsTemplates.__form(
        GridOrientationType.Y,

        PageTemplates.inputNumElem( 'Maximum Login Fails', 'max-login-fails-input', 0, 100, 'Leave this blank to deactivate this control.' )
    ) );
  }

  static themeSelection() {
    return SettingsTemplates.__accordionItem(
      'theme-selection',
      'Change Color Theme',
      SettingsTemplates.__form(
        GridOrientationType.Y,

        PageTemplates.switchInput( 'theme-checkbox', 'Light Theme', 'Dark Theme' )
      )
    );
  }


  static notifications() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static connectSocialAccounts() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static timezoneSelection() {
    throw DevErrors.notImplemented();
    // return ``;
  }

  static twoFA() {
    throw DevErrors.notImplemented();
    // return ``;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let settingsModel;

class SettingsModel extends ModelBase {
  constructor() {
    if ( settingsModel )
      throw DevErrors.singleIntance( 'SettingsModel' );

    super( NavItemID.Settings, NavbarItemType.Page, 'Settings', SETTINGS_ICON_URL );

    settingsModel = this;
    Object.seal( settingsModel );
  }

  static get _() { return settingsModel; }

  get baseUserApiUrl() { return BASE_API_URL + 'users/'; }

  changePassword( changePasswordDTO ) {
    HttpClient.put( this.baseUserApiUrl + 'password', changePasswordDTO, ( err, res ) => {
      if ( err )
        console.debug( err );

      console.debug( res );
    } );
  }

  setMaxLoginFailes( maxLoginFailes ) {
    HttpClient.put( this.baseUserApiUrl + 'max-login-fails',
      JSON.stringify( { "maxLoginFails": maxLoginFailes } ),
      ( err, res ) => {
        if ( err )
          console.debug( err );

        console.debug( res );
      });
  }

  /**
   * 
   * @param { ThemeType } themeType
   */
  changeTheme( themeType ) {
    localStorage.setItem( 'theme', themeType );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let settingsView;

class SettingsView extends ViewBase {
  constructor() {
    if ( settingsView )
      throw DevErrors.singleIntance( 'SettingsView' );

    super(
      '<h1>Settings</h1>' +
      SettingsTemplates.theAccordion(
        SettingsTemplates.changePassword() +
        SettingsTemplates.maxLoginFailes() +
        SettingsTemplates.themeSelection()
      )
    );

    settingsView = this;
    Object.freeze( settingsView );
  }

  static get _() { return settingsView; }

  get changePasswordButton() { return document.getElementById( 'change-password-button' ); }
  get currPassInput() { return document.getElementById( 'curr-pass-input' ); }
  get newPassInput() { return document.getElementById( 'new-pass-input' ); }
  get checkNewPassInput() { return document.getElementById( 'check-new-pass-input' ); }

  /**
   * Returns a ChangePasswordDTO with the user input.
   * 
   * @returns { ChangePasswordDTO } ChangePasswordDTO
   */
  getChangePasswordInputDTO() {
    const currentPasswordInput = this.currPassInput.value;
    const newPasswordInput = this.newPassInput.value;

    return new ChangePasswordDTO( currentPasswordInput, newPasswordInput );
  }

  /**
   * @returns { ThemeType }
   */
  getCheckedTheme() {
    return DOM.byId( 'theme-checkbox' ).checked ? ThemeType.Dark : ThemeType.Light;
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let settingsController = null;

/**
 * The Settings page controller.
 */
class SettingsController extends ControllerBase {
  constructor() {
    if ( settingsController )
      throw DevErrors.singleIntance( 'SettingsController' );

    super(
      new SettingsModel(),
      new SettingsView()
    );

    settingsController = this;
    Object.freeze( settingsController );
  }

  setEventListeners() {
    DOM.on( 'click', this.view.changePasswordButton, ( e ) => {
      e.preventDefault();

      if ( this.view.newPassInput.value !== this.view.checkNewPassInput.value ) {
        // TODO: Send notification.
        return false;
      }

      const newChangePasswordDTO = this.view.getChangePasswordInputDTO();

      // Update password (API connection - confirm current password).
      this.model.changePassword( newChangePasswordDTO );
    } );

    DOM.on( 'change', DOM.byId( 'theme-checkbox' ), () => {
      this.model.changeTheme( this.view.getCheckedTheme() );
    } );
  }

  onSetActive() {
    this.setEventListeners();
    $( document ).foundation();
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

class NavbarTemplates {
  constructor() {
    throw DevErrors.cantInstantiateStatic( 'NavbarTemplates' );
  }

  static toggleButton() {
    return `
      <li class="cell li-toggle">
        <a id="sidenav-toggle">
          <p id="sidenav-toggle-p"> &laquo; </p>
        </a>
      </li>
    `;
  }

  /**
   * Used for NavbarItemType.Pages
   * 
   * @param { string } url The icon image url. White the image extention extention type (".png"/".svg"/etc.)
   * @param { string } label The icon label (E.g.: "Dashboard").
   * @param { string } linkTo The link to the page it links to. Use the traderRoutes/adminRoutes here.
   * @returns { string } HTML string content
   */
  static iconLink(url, label, linkTo) {
    return `
      <li class="cell">
        <a href="${ BASE_URL + linkTo}" class="grid-x align-middle" id="${linkTo}_btn">
          <img class="icon cell large-6" src="${ url }" alt"=${ label } Icon" />
          <figcaption class="icon-label large-6">${ label }</figcaption>
        </a>  
      </li>`;
  }

  static iconButton() {
    throw DevErrors.notImplemented();
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let navbarModel = null;

class NavbarModel {
  constructor() {
    if ( navbarModel )
      throw DevErrors.singleIntance( 'NavbarModel' );

    /**
     * Dictionary mapping the pages and panel items.
     * 
     * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
     * value:  Instance of Page | NavbarPanelItem.
     * 
     * @type { Dictionary }
     */
    this.items = new Dictionary( true );
    /** 
     * The ID of the active page. 
     * @type { string? } 
     */
    this.activePageId = null;
    /** @type { string? } */
    this.activeNavbarPanelItemId = null;
    this.toggled = false;

    navbarModel = this;
    Object.seal( navbarModel );
  }

  static get _() { return navbarModel; }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

/**
 * This stores the NavbarView instance.
 * Do not use this variable directly. Use NavbarView._ instead.
 * 
 * @type { NavbarView }
 * */
let navbarView = null;

/**
 * The NavbarView singleton. Access it with NavbarView._
 * */
class NavbarView {
  constructor() {
    if ( navbarView )
      throw new Error( 'There can only be one instance of NavBarController.' );

    navbarView = this;
    Object.freeze( navbarView );
  }

  // #region PROPERTIES

  /**
   * Returns the current NavbarController instance.
   * 
   * @returns { NavbarView } The current NavbarView instance.
   */
  static get _() { return navbarView; };

  get element() { return document.getElementById( 'sidenav' ); }
  get iconContainer() { return document.getElementById( 'icon-container' ); }
  get toggleButtonElem() { return document.getElementById( 'sidenav-toggle' ); }
  get toggleButtonPElem() { return document.getElementById( 'sidenav-toggle-p' ); }
  static get pageContainer() { return document.getElementById( 'page-container' ); }

  getIconLabels() { return document.getElementsByClassName( 'icon-label' ); }

  // #endregion

  // #region METHODS

  injectToggleButton() {
    this.iconContainer.innerHTML += NavbarTemplates.toggleButton();
  }

  minimize() {
    // "&raquo;" == "»"
    this.resize( true, SIDEBAR_MOBILE_WIDTH, '&raquo;', 'none' );
  }

  maximize() {
    // "&laquo;" == "«"
    this.resize( false, SIDEBAR_DESKTOP_WIDTH, '&laquo;', 'inline-block' );
  }

  resize( isToMinimize, width, toggleButtonLabel, iconLabelsDisplay ) {
    let toAdd;
    let toRemove;
    let pageToAdd;
    let pageToRemove;

    if ( isToMinimize ) {
      toAdd = 'sidenav-min';
      toRemove = 'sidenav-max';
      pageToAdd = 'page-max';
      pageToRemove = 'page-min';
    } else {
      toAdd = 'sidenav-max';
      toRemove = 'sidenav-min';
      pageToAdd = 'page-min';
      pageToRemove = 'page-max';
    }

    this.element.classList.remove( toRemove );
    this.element.classList.add( toAdd );
    NavbarView.pageContainer.classList.add( pageToAdd );
    NavbarView.pageContainer.classList.remove( pageToRemove );
    this.toggleButtonPElem.innerHTML = toggleButtonLabel;

    const labels = this.getIconLabels();
    for ( let i = 0; i < labels.length; ++i ) {
      labels[i].style.display = iconLabelsDisplay;
    }
  }

  injectIcon( url, label, linkTo = null ) {
    if ( !linkTo )
      linkTo = label.toLowerCase();

    this.iconContainer.innerHTML += NavbarTemplates.iconLink(url, label, linkTo);
  }

  removeActivePage() {
    NavbarView.pageContainer.innerHTML = '';
  }

  addActiveClassToItem( id ) {
    document.getElementById( id + '_btn' ).classList.add( 'active' );
  }

  removeActiveClassFromItem( id ) {
    document.getElementById( id + '_btn' ).classList.remove( 'active' );
  }

  // #endregion
}
/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// This variable is a hack because there can be no static properties in JavaScript classes...
/**
 * This stores the NavbarController instance.
 * Do not use this variable directly. Use NavbarController._ instead.
 * 
 * @type {NavbarController}
 * */
let navbarController = null;

/**
 * The NavbarController singleton. Access it with NavbarController._
 * */
class NavbarController {
  constructor() {
    if ( navbarController )
      throw DevErrors.singleIntance( 'NavBarController' );

    /**
     * @type { NavbarView }
     * */
    this.view = new NavbarView();

    /**
     * @type { NavbarModel }
     * */
    this.model = new NavbarModel();

    navbarController = this;
    Object.freeze( navbarController );
  }

  /**
   * Returns the current NavbarController instance.
   * Same as using navbarController, but don't use it for a more secure (error free) code.
   * @returns { NavbarController } NavbarController
   */
  static get _() { return navbarController; }

  /**
  * Map a page/item ID to its instance.
  * key: string (unique id of the Page | NavbarPanelItem. To be used by the router)
  * value: object (instance of the Page | NavbarPanelItem)
  * @param { string } key Unique id of the Page | NavbarPanelItem.
  * @param { object } value Instance of Page | NavbarPanelItem.
  * @returns { void }
  */
  mapItem( key, value ) {
    this.model.items.add( key, value );
  }

  /**
  * @returns {void}
  */
  init() {
    this.view.injectToggleButton();

    const thisItems = this.model.items;
    for (let i = 0; i < thisItems.length; ++i) {
      const thisItemModel = thisItems.getByIndex( i ).model;
      this.injectIcon( thisItemModel.navIconURL, thisItemModel.title, thisItemModel.id );
    }

    DOM.on( 'click', this.view.toggleButtonElem, ( e ) => {
      e.preventDefault();

      if ( this.model.toggled ) {
        this.view.maximize();
        this.model.toggled = false;
      } else {
        this.view.minimize();
        this.model.toggled = true;
      }
    } );

    this.activateItem( NavItemID.Dashboard );
  }

  injectIcon(url, label, linkTo = null) {
    this.view.injectIcon( url, label, linkTo );
  }

  /**
   * Activate an item stored in the navbarController.
   * You must pass one of the two.
   * 
   * @param { NavItemID } itemId NavItemID enum
   * @param { NavbarItemBase } thisItem Instance of Page | NavbarPanelItem.
   */
  activateItem( itemId = null, thisItem = null ) {
    if ( !thisItem ) {
      thisItem = this.model.items.getByKey( itemId );
    }

    if ( thisItem.navbarItemType === NavbarItemType.Page ) {
      if ( this.model.activePageId === itemId )
        return;

      else {
        if ( this.model.activePageId !== null ) {
          /** @type { NavbarItemBase } */
          const lastActiveItem = this.model.items.getByKey( this.model.activePageId );
          this.view.removeActiveClassFromItem( this.model.activePageId );
          lastActiveItem.onBeforeDestroyBase();
        }
      }

      this.view.removeActivePage();
      this.model.activePageId = itemId;
      this.view.addActiveClassToItem( itemId );

    } else if ( thisItem.navbarItemType === NavbarItemType.NavbarPanelItem ) {
      if ( this.model.activeNavbarPanelItemId === itemId )
        return;

      else {
        if ( this.model.activeNavbarPanelItemId !== null ) {
          /** @type { NavbarItemBase } */
          const lastActiveItem = this.model.items.getByKey( this.model.activeNavbarPanelItemId );
          lastActiveItem.onBeforeDestroyBase();
        }
      }

      //this.view.removeActivePanelItem();
      this.model.activeNavbarPanelItemId = itemId;
    }

    thisItem.onSetActiveBase( thisItem.navbarItemType );
  }
}

new NavbarController();

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let topbarModel = null;

class TopbarModel {
  constructor() {
    if ( topbarModel )
      throw DevErrors.singleIntance( 'TopbarModel' );

    this.currentAccountType = UserAccountType.PaperBalance;

    this.realBalance = 0;
    this.creditsBalance = 0;
    this.paperBalance = 0;

    topbarModel = this;
    Object.seal( topbarModel );
  }

  fetchUserBalances() {
    return new Promise( async ( resolve, reject ) => {
      try {
        const userBalances = await HttpClient.get( BASE_API_URL + 'users/balances' );
        this.realBalance = userBalances.realBalance;
        this.creditsBalance = userBalances.creditsBalance;
        this.paperBalance = userBalances.paperBalance;
        return resolve( userBalances );

      } catch ( e ) {
        return reject( e );
      }
    } );
  }
}

/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let topbarView = null;

class TopbarView {
  constructor() {
    if ( topbarView )
      throw DevErrors.singleIntance( 'TopbarView' );

    topbarView = this;
    Object.freeze( topbarView );
  }

  get realAccountBtn() { return document.getElementById( 'real-account-btn' ); }
  get demoAccountBtn() { return document.getElementById( 'demo-account-btn' ); }
  get logoutBtn() { return document.getElementById( 'prof-logout-btn' ); }

  activateRealAccountBtn() {
    this.__activateBtn( this.realAccountBtn );
    this.__deactivateBtn( this.demoAccountBtn );
  }

  activateRealDemoBtn() {
    this.__activateBtn( this.demoAccountBtn );
    this.__deactivateBtn( this.realAccountBtn );
  }

  /**
   * 
   * @param { HTMLElement } btnElem
   */
  __activateBtn( btnElem ) {
    btnElem.classList.add( 'active' );
    btnElem.focus();
  }

  /**
   * 
   * @param { HTMLElement } btnElem
   */
  __deactivateBtn( btnElem ) {
    btnElem.classList.remove( 'active' );
  }
}

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

let topnavController = null;

class TopnavController {
  constructor() {
    if ( topnavController )
      throw DevErrors.singleIntance( 'TopnavController' );

    this.model = new TopbarModel();
    this.view = new TopbarView();

    topnavController = this;
    Object.freeze( topnavController );
  }

  /**
   * @returns { TopnavController }
   */
  static get _() { return topnavController; }

  init() {
    this.__addListeners();
    this.model.fetchUserBalances();
  }

  __addListeners() {
    DOM.on( 'click', this.view.realAccountBtn, () => {
      this.view.activateRealAccountBtn();
      this.model.currentAccountType = UserAccountType.RealBalance;
    } );

    DOM.on( 'click', this.view.demoAccountBtn, () => {
      this.view.activateRealDemoBtn();
      this.model.currentAccountType = UserAccountType.PaperBalance;
    } );

    DOM.on( 'click', this.view.logoutBtn, () => {
      Authentication._.logout();
    } );
  }
}

new TopnavController();

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

/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

whenDomReady(() => {
  console.log( 'Trader.' );
  console.log( 'The DOM is ready' );

  $( document ).foundation();
  Themes.apply( ThemeType.Dark, NavItemID.Dashboard );

  NavbarController._.mapItem( NavItemID.Dashboard, new DashboardController() );
  NavbarController._.mapItem( NavItemID.Markets, new TradeRoomController() );
  NavbarController._.mapItem( NavItemID.Settings, new SettingsController() );

  NavbarController._.init();
  TopnavController._.init();
  new Authentication();

  // TODO: What a stupid thing to do. Do not use cookies. Fetch the requested page from the document URL -_-
  const cookies = document.cookie.split( ';' );
  const cookieIndex = cookies.length <= 1 ? 0 : cookies.length === 2 ? 1 : 2;
  const requestedPage = cookies[cookieIndex].split( '=' )[1].trim().substring( 3 ).replace( /(%2F)/g, '/' );

  const page = Utils.getNavItemIDFromString( requestedPage );

  if ( !page ) {
    console.info( '404 - Not Found.' ); // Show 404 page.
  }
  else
    document.getElementById( page + '_btn' ).click();

  document.cookie = 'Requested-Path=;expires=Thu, ' + new Date().toISOString() + ';';
  document.cookie = '';

  // Make a request to the Coinelity's proxy to wake it up (it's a free server).
  fetch( 'https://coinelity-proxy.glitch.me/' );
});

