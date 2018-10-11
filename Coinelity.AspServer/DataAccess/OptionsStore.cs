using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Coinelity.Core.Data;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.DataAccess
{
    public class OptionsStore : IDisposable
    {
        private readonly SqlConnection _connection;

        public OptionsStore()
        {
            this._connection = Env.GetMSSQLConnection();
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
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
            int payoutPercent = await GetOptionPayoutPercentByAssetId( placeOrderDTO.AssetId );

            return await MSSQLClient.CommandOnceAsync( _connection,
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
        /// Get order by id.
        /// 
        /// </summary>
        /// <param name="orderId"> The Id of the order. </param>
        /// <param name="userId"> Optional (RECOMENDED). Confirm that the order belongs to the user.</param>
        public async Task<Dictionary<string, object>> GetOpenOrderAsync(int orderId, int? userId = null)
        {
            string query = @"SELECT *
                             FROM dbo.ActiveOption
                             WHERE Id = @OrderId";
            Dictionary<string, object> parameters = new Dictionary<string, object>
                {
                    { "@OrderId", orderId }
                };

            if (userId != null)
            {
                query += " AND UserId = @UserId";
                parameters.Add( "UserId", userId );
            }

            IList<Dictionary<string, object>> orderListDict = await MSSQLClient.QueryOnceAsync( _connection, query, parameters );
            return orderListDict[0];
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
        public async Task<int> GetOptionPayoutPercentByAssetId(int assetId)
        {
            const string whereClause = "WHERE AssetId = @Id";
            return await GetOptionPayoutPercent( whereClause, assetId );
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

            if (payoutListDict.Count <= 0)
                return -1;

            return Convert.ToInt16( payoutListDict[0]["Payout"] );
        }
    }
}
