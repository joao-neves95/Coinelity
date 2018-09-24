const ExchangeClient = require( '../exchangeClient' );
new ExchangeClient();

module.exports = {
  getAllPairs: () => {
    return ExchangeClient._.getAllPairs();
  },

  getLastTicker: (pair) => {
    return ExchangeClient._.getLastTicker( pair );
  }
};
