/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

const BASE_PORT = '33623';
const BASE_URL = `http://localhost:${BASE_PORT}`;

const corsOptions = Object.freeze( {
  origin: BASE_URL,
  methods: 'GET,POST',
  credentials: true
} );

module.exports = corsOptions;
