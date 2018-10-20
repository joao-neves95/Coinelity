/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ExchangeSharp;

namespace Coinelity.Core.Data
{
    public class Exchange : IDisposable
    {
        public ExchangeAPI API { get; }

        public Exchange(string exchange)
        {
            switch (exchange.ToUpper())
            {
                case "KRAKEN":
                    this.API = new ExchangeKrakenAPI();
                    break;
                case "BINANCE":
                    this.API = new ExchangeBinanceAPI();
                    break;
                case "BITTREX":
                    this.API = new ExchangeBittrexAPI();
                    break;
                case "BITFINEX":
                    this.API = new ExchangeBitfinexAPI();
                    break;
                case "POLONIEX":
                    this.API = new ExchangePoloniexAPI();
                    break;
                default:
                    this.API = null;
                    break;
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
        }

        ~Exchange()
        {
            Dispose();
        }

        public Task<ExchangeTicker> GetTickerAsync(string symbol)
        {
            return this.API.GetTickerAsync( symbol );
        }

        public async Task<decimal> GetLastPrice(string symbol)
        {
            ExchangeTicker exchangeTicker = await this.GetTickerAsync( symbol );
            return exchangeTicker.Last;
        }
    }
}
