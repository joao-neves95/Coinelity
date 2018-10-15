using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Coinelity.Core;
using Coinelity.Core.Data;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.DataAccess
{
    public class OptionsStore : IDisposable
    {
        private readonly SqlConnection _connection;

        public OptionsStore( bool createConnection = true )
        {
            this._connection = createConnection ? Env.GetMSSQLConnection() : null;
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
        }

        /// <summary>
        /// 
        /// The command for opening a new order.
        /// 
        /// </summary>
        /// <param name="placeOrderDTO"></param>
        /// <param name="connection"> If null, it defaults to this class on creation's connection, and if not null it's used the provided connection instead </param>
        /// <returns></returns>
        public async Task<SqlCommand> OpenOrderCmdAsync(PlaceOrderDTO placeOrderDTO, SqlConnection connection = null)
        {
            int payoutPercent = await GetOptionPayoutPercentByAssetId( placeOrderDTO.AssetId );

            connection = connection == null ? _connection : connection;

            return MSSQLClient.ParameterizeCommand( connection,
                @"INSERT INTO dbo.ActiveOption (UserId, AssetId, OperationTypeId, LifetimeId, PayoutPercent, StrikePrice, InvestmentAmount)
                  VALUES (@UserId, @AssetId, @OperationTypeId, @LifetimeId, @PayoutPercent, @StrikePrice, @InvestmentAmount)",
                new Dictionary<string, object>
                {
                    { "@UserId", placeOrderDTO.UserId },
                    { "@AssetId", placeOrderDTO.AssetId },
                    { "@OperationTypeId", placeOrderDTO.OperationTypeId },
                    { "@LifetimeId", placeOrderDTO.LifetimeId },
                    { "@PayoutPercent", payoutPercent },
                    // TODO: Get the strike price from API.
                    { "@StrikePricet", placeOrderDTO.StrikePrice },
                    { "@InvestmentAmount", placeOrderDTO.InvestmentAmount }
                } );
        }

        /// <summary>
        /// 
        /// Inserts a new order (creates a new open order) and returns the number of affected rows. 
        /// Should return 1. If it's 0 or -1 there was an error. 
        /// 
        /// </summary>
        /// <param name="placeOrderDTO"></param>
        /// <returns></returns>
        public async Task<int> OpenOrderAsync(PlaceOrderDTO placeOrderDTO)
        {
            return await MSSQLClient.CommandOnceAsync( _connection, await OpenOrderCmdAsync( placeOrderDTO ) );
        }

        /// <summary>
        /// 
        /// Get order by id.
        /// 
        /// It retruns an empty Dictionary if not found.
        /// 
        /// </summary>
        /// <param name="orderId"> The Id of the order. </param>
        /// <param name="userId"> Optional (RECOMENDED). Confirm that the order belongs to the user.</param>
        public async Task<ActiveOptionJoined> GetActiveOrderAsync(int orderId, int? userId = null)
        {
            //string query = @"SELECT *
            //                 FROM dbo.ActiveOption
            //                 WHERE Id = @OrderId";

            string query = @"SETECT dbo.ActiveOption.Id, dbo.ActiveOption.UserId, dbo.Asset.Symbol, dbo.Exchange.Name AS ExchangeName, dbo.ActiveOption.OperationTypeId, dbo.OptionLifetime.LifetimeMinutes AS Lifetime, dbo.ActiveOption.PayoutPercent, dbo.ActiveOption.StrikePrice, dbo.ActiveOption.InvestmentAmount, dbo.ActiveOption.OpenTimestamp
                             FROM dbo.ActiveOption
                                 INNER JOIN dbo.Asset
                                     INNER JOIN dbo.Exchange
                                     ON dbo.Asset.ExchangeId = dbo.Exchange.Id
                                 ON dbo.ActiveOption.AssetId = dbo.Asset.Id
                                 INNER JOIN dbo.OptionLifetime
                                 ON dbo.ActiveOption.LifetimeId dbo.OptionLifetime.Id
                             WHERE dbo.ActiveOption.Id = @OrderId";

            Dictionary<string, object> parameters = new Dictionary<string, object>
                {
                    { "@OrderId", orderId }
                };

            if (userId != null)
            {
                query += " AND UserId = @UserId";
                parameters.Add( "@UserId", userId );
            }

            IList<Dictionary<string, object>> orderListDict = await MSSQLClient.QueryOnceAsync( _connection, query, parameters );

            return orderListDict.Count > 0 ? orderListDict[0].ToObject<ActiveOptionJoined>() : new ActiveOptionJoined();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"> If null, it returns relative to all users instead of a specific user </param>
        /// <param name="connection"> If null, it defaults to this class on creation's connection, and if not null it's used the provided connection instead </param>
        /// <returns></returns>
        public async Task<int> GetLastActiveOrderAsync(int? userId = null, SqlConnection connection = null)
        {
            connection = connection == null ? _connection : connection;

            string query = @"SELECT MAX(Id) AS Id
                             FROM dbo.ActiveOption
                             WHERE UserId = @UserId";

            Dictionary<string, object> parameters = new Dictionary<string, object>();

            const string whereClause = " WHERE UserId = @UserId";

            if (userId != null)
            {
                query += whereClause;
                parameters.Add( "@UserId", userId );
            }

            IList<Dictionary<string, object>> activeOrderIdListDict = await MSSQLClient.QueryOnceAsync( connection, query, parameters );

            return Convert.ToInt32( activeOrderIdListDict[0]["Id"] );
        }

        public async Task<IList<Dictionary<string, object>>> GetUserOrderHistoryAsync(int userId)
        {
            IList<Dictionary<string, object>> orderListDict = await MSSQLClient.QueryOnceAsync( _connection,
                @"SELECT *
                  FROM dbo.OptionHistory
                  WHERE UserId = @UserId",
                new Dictionary<string, object>
                {
                    { "@UserId", userId }
                });

            return orderListDict;
        }

        /// <summary>
        /// 
        /// Returns the payout percentage of the requested asset id, or -1 case the asset does not exist.
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<int> GetOptionPayoutPercentById(int id)
        {
            const string whereClause = "WHERE Id = @Id";
            return await GetOptionPayoutPercent( whereClause, id );
        }

        /// <summary>
        /// 
        /// Returns the payout percentage of the requested asset id, or -1 case the asset does not exist.
        /// 
        /// </summary>
        /// <param name="assetId"></param>
        /// <returns></returns>
        public Task<int> GetOptionPayoutPercentByAssetId(int assetId)
        {
            const string whereClause = "WHERE AssetId = @Id";
            return GetOptionPayoutPercent( whereClause, assetId );
        }

        /// <summary>
        /// 
        /// Returns <int> (16 bits / SQL's tinyint) the payout percentage of the requested asset id, or -1 case the asset does not exist.
        /// 
        /// </summary>
        /// <param name="whereQuery"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        private async Task<int> GetOptionPayoutPercent(string whereClause, int id)
        {
            IList<Dictionary<string, object>> payoutListDict = await MSSQLClient.QueryOnceAsync( _connection,
                $@"SELECT Payout
                  FROM dbo.OptionPayout
                  {whereClause}",
                new Dictionary<string, object>
                {
                    { "@Id", id }
                } );

            return payoutListDict.Count > 0 ? Convert.ToInt16( payoutListDict[0]["Payout"] ) : -1;
        }

        /// <summary>
        /// 
        /// Returns -1 if not found.
        /// 
        /// </summary>
        /// <param name="optionLifetimeId"></param>
        /// <returns></returns>
        public async Task<int> GetLifetimeById(int optionLifetimeId)
        {
            IList<Dictionary<string, object>> lifetimeListDict = await MSSQLClient.QueryOnceAsync( _connection,
                $@"SELECT LifetimeMinutes
                   FROM dbo.OptionLifetime
                   WHERE Id = @LifetimeId",
                new Dictionary<string, object>
                {
                    { "@LifetimeId", optionLifetimeId }
                } );

            return lifetimeListDict.Count > 0 ? Convert.ToInt32( lifetimeListDict[0]["LifetimeMinutes"] ) : -1;
        }
    }
}
