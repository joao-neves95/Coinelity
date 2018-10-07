/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
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
