using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Coinelity.Core.Data;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.DataAccess
{
    public class OrderStore
    {
        private readonly SqlConnection _connection;

        public OrderStore()
        {
            this._connection = Env.GetMSSQLConnection();
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
        }

        public async Task InsertOrderAsync(PlaceOrderDTO placeOrderDTO)
        {
            await MSSQLClient.CommandOnceAsync( _connection,
                @"INSERT INTO dbo.ActiveOrder (UserId, AssetId, OperationTypeId, LifetimeId, PayoutPercentId, StrikePrice, InvestmentAmount)
                  VALUES ()",
                new Dictionary<string, object>
                {
                    { "", "" }
                } );
        }

        /// <summary>
        /// 
        /// Get order by id.
        /// 
        /// </summary>
        /// <param name="orderId"> The Id of the order. </param>
        /// <param name="userId"> Optional (RECOMENDED). Confirm that the order belongs to the user.</param>
        public async Task<Dictionary<string, object>> GetOrderAsync(int orderId, int? userId = null)
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
    }
}
