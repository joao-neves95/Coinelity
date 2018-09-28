/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
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

module.exports = SpreadPricesModel;
