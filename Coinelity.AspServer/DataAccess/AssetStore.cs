using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public void GetAll()
        {

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
        public async Task<IList<Dictionary<string, object>>> GetSymbolAndExchange(int assetId)
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
