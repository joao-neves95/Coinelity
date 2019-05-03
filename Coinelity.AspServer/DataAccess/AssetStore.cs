/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Linq;
using Coinelity.Core.Data;
using Coinelity.Core.Models;

namespace Coinelity.AspServer.DataAccess
{
    public class AssetStore : IDisposable
    {
        private readonly SqlConnection _connection;

        public AssetStore()
        {
            this._connection = Env.GetMSSQLConnection();
        }

        public void Dispose()
        {
            this._connection?.Dispose();
            GC.SuppressFinalize( this );
        }

        ~AssetStore()
        {
            Dispose();
        }

        public async Task<SQLClientResult> GetAll()
        {
            return await MSSQLClient.QueryOnceAsync( _connection,
                $@"SELECT dbo.Asset.Id, dbo.Asset.Symbol, dbo.Exchange.Name AS ExchangeName, dbo.Asset.LogoImageUrl
                       INNER JOIN dbo.Exchange
                       ON dbo.Asset.ExchangeId = dbo.Exchange.Id
                   FROM dbo.Asset
                   ORDER BY dbo.Asset.Symbol" 
            );
        }

        public void Get()
        {

        }

        /// <summary>
        /// 
        /// Task<IList<Dictionary<string, object>>>
        /// [0] Symbol, (value)
        /// [1] Exchange, (value)
        /// 
        /// </summary>
        /// <param name="assetId"></param>
        /// <returns></returns>
        public async Task<SQLClientResult> GetSymbolAndExchange(int assetId)
        {
            return await MSSQLClient.QueryOnceAsync( _connection,
                $@"SELECT dbo.Asset.Symbol, dbo.Exchange.Name AS Exchange
                   FROM dbo.Asset
                       INNER JOIN dbo.Exchange
                       ON dbo.Asset.ExchangeId = dbo.Exchange.Id
                   WHERE dbo.Asset.Id = {assetId} "
           );
        }
    }
}
