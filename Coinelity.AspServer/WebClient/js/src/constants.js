/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
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
const MARKETS_UPDATE_RATE = 5000;
const TRADE_OHLCV_UPDATE_RATE = 2000;

// Images URL'S:
const DASHBOARD_ICON_URL = `${PUBLIC_IMGS_URL}dashboard-icon-white.svg`;
const TRADE_ROOM_ICON_URL = `${PUBLIC_IMGS_URL}chart-icon-white.svg`;
const SETTINGS_ICON_URL = `${PUBLIC_IMGS_URL}settings-icon-white.svg`;

// This sizes are the same as in "variables.less".
const SIDEBAR_MOBILE_WIDTH = '3em';
const SIDEBAR_DESKTOP_WIDTH = '10em';
