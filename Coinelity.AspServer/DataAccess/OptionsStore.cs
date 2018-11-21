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

        ~OptionsStore()
        {
            this.Dispose();
        }

        // TODO: Validate the req placeOrderDTO.
        /// <summary>
        /// 
        /// The command for opening a new order.
        /// 
        /// </summary>
        /// <param name="placeOrderDTO"></param>
        /// <param name="connection"> If null, it defaults to this class on creation's connection, and if not null it's used the provided connection instead </param>
        /// <returns></returns>
        public async Task<SqlCommand> OpenOrderCmdAsync(PlaceOptionDTO placeOrderDTO, SqlConnection connection = null)
        {
            int payoutPercent = await GetPayoutPercentByAssetIdAndLifetimeId( placeOrderDTO.AssetId, placeOrderDTO.LifetimeId );

            connection = connection == null ? _connection : connection;

            return MSSQLClient.ParameterizeCommand( connection,
                @"INSERT INTO dbo.ActiveOption (UserId, AssetId, IsRealBalance, OperationTypeId, LifetimeId, PayoutPercent, StrikePrice, InvestmentAmount)
                  VALUES (@UserId, @AssetId, @IsRealBalance, @OperationTypeId, @LifetimeId, @PayoutPercent, @StrikePrice, @InvestmentAmount)",
                new Dictionary<string, object>
                {
                    { "@UserId", placeOrderDTO.UserId },
                    { "@AssetId", placeOrderDTO.AssetId },
                    { "@IsRealBalance", placeOrderDTO.IsRealBalance },
                    { "@OperationTypeId", placeOrderDTO.OperationTypeId },
                    { "@LifetimeId", placeOrderDTO.LifetimeId },
                    { "@PayoutPercent", payoutPercent },
                    // TODO: Get the strike price from API.
                    { "@StrikePrice", placeOrderDTO.StrikePrice },
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
        public async Task<int> OpenOrderAsync(PlaceOptionDTO placeOrderDTO)
        {
            return await MSSQLClient.CommandOnceAsync( _connection, await OpenOrderCmdAsync( placeOrderDTO ) );
        }

        /// <summary>
        /// 
        /// It does not come appended with any WHERE clause.
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetActiveOrderCmd()
        {
            return @"SELECT dbo.ActiveOption.Id, dbo.ActiveOption.UserId, dbo.ActiveOption.IsRealBalance, dbo.ActiveOption.AssetId, dbo.Asset.Symbol, dbo.Exchange.Name AS ExchangeName, dbo.ActiveOption.OperationTypeId, dbo.ActiveOption.LifetimeId, dbo.OptionLifetime.TimeMinutes, dbo.LifetimeLabel.Name AS LifetimeLabel, dbo.ActiveOption.PayoutPercent, dbo.ActiveOption.StrikePrice, dbo.ActiveOption.InvestmentAmount, dbo.ActiveOption.OpenTimestamp
                     FROM dbo.ActiveOption
                         INNER JOIN dbo.Asset
                             INNER JOIN dbo.Exchange
                             ON dbo.Asset.ExchangeId = dbo.Exchange.Id
                         ON dbo.ActiveOption.AssetId = dbo.Asset.Id
                         INNER JOIN dbo.OptionLifetime
                         ON dbo.ActiveOption.LifetimeId = dbo.OptionLifetime.Id
                         INNER JOIN dbo.LifetimeLabel
                         ON dbo.ActiveOption.LifetimeId = dbo.LifetimeLabel.Id ";
        }

        public async Task<List<ActiveOptionJoined>> GetActiveOrdersAsync(int userId)
        {
            string query = GetActiveOrderCmd() + $"WHERE dbo.ActiveOption.UserId = {userId}";

            IList<Dictionary<string, object>> orderListDict = await MSSQLClient.QueryOnceAsync( _connection, query );
            return orderListDict.ToObjectList<ActiveOptionJoined>();
        }

        /// <summary>
        /// 
        /// Get order by id.
        /// It retruns a new empty ActiveOptionJoined instance if not found.
        /// 
        /// </summary>
        /// <param name="orderId"> The Id of the order. </param>
        /// <param name="userId"> Optional (RECOMENDED). Confirm that the order belongs to the user.</param>
        public async Task<ActiveOptionJoined> GetActiveOrderAsync(int orderId, int? userId = null)
        {
            string query = GetActiveOrderCmd() + "WHERE dbo.ActiveOption.Id = @OrderId";

            Dictionary<string, object> parameters = new Dictionary<string, object>
                {
                    { "@OrderId", orderId }
                };

            if (userId != null)
            {
                query += " AND dbo.ActiveOption.UserId = @UserId";
                parameters.Add( "@UserId", userId );
            }

            IList<Dictionary<string, object>> orderListDict = await MSSQLClient.QueryOnceAsync( _connection, query, parameters );

            return orderListDict.Count > 0 ? orderListDict[0].ToObject<ActiveOptionJoined>() : new ActiveOptionJoined();
        }

        public string DeleteActiveOrderCmd(int orderId, int? userId = null)
        {
            string command = $@"DELETE FROM dbo.ActiveOrders
                                WHERE Id = {orderId} ";

            command += userId == null ? "" : " AND UserId = {userId}";

            return command;
        }

        public async Task<int> DeleteActiveOrderAsync(int orderId, int? userId = null)
        {
            return await MSSQLClient.CommandOnceAsync( _connection, DeleteActiveOrderCmd( orderId, userId ) );
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
                             FROM dbo.ActiveOption ";

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

        public string InsertInOrderHistoryCmd(ClosedOptionDTO closedOptionDTO)
        {
            return $@"
                 INSERT INTO dbo.OptionHistory 
                     (
                         UserId,
                         AssetId,
                         IsRealBalance,
                         OperationTypeId,
                         LifetimeId,
                         PayoutPercent,
                         StrikePrice,
                         InvestmentAmount,
                         OpenTimestamp,
                         ClosePrice,
                         ProfitLossFiat,
                     )
                   VALUES 
                       (
                           {closedOptionDTO.UserId},
                           {closedOptionDTO.AssetId},
                           {closedOptionDTO.IsRealBalance},
                           {closedOptionDTO.OperationTypeId},
                           {closedOptionDTO.LifetimeId},
                           {closedOptionDTO.PayoutPercent},
                           {closedOptionDTO.StrikePrice},
                           {closedOptionDTO.InvestmentAmount},
                           {closedOptionDTO.OpenTimestamp},
                           {closedOptionDTO.ClosePrice},
                           {closedOptionDTO.ProfitLossFiat},
                       )";

        }

        public async Task InsertInOrderHistory(ClosedOptionDTO closedOptionDTO, SqlConnection sqlConnection = null)
        {
            sqlConnection = sqlConnection == null ? _connection : sqlConnection;

            await MSSQLClient.CommandOnceAsync( sqlConnection, InsertInOrderHistoryCmd( closedOptionDTO ) );
        }

        // TODO: Refactor query.
        public async Task<IList<Dictionary<string, object>>> GetUserOrderHistoryAsync(int userId)
        {
            return await MSSQLClient.QueryOnceAsync( _connection,
                @"SELECT *
                  FROM dbo.OptionHistory
                  WHERE UserId = @UserId ",
                new Dictionary<string, object>
                {
                    { "@UserId", userId }
                });
        }

        /// <summary>
        /// 
        /// Returns the payout percentage of the requested asset id, or -1 case the asset does not exist.
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<byte> GetPayoutPercentById(int id)
        {
            string whereClause = $"WHERE Id = {id}";
            return await GetPayoutPercent( whereClause );
        }

        /// <summary>
        /// 
        /// Returns the payout percentage of the requested asset id, or -1 case the asset does not exist.
        /// 
        /// </summary>
        /// <param name="assetId"></param>
        /// <returns></returns>
        public Task<byte> GetPayoutPercentByAssetId(int assetId)
        {
            string whereClause = $"WHERE AssetId = {assetId}";
            return GetPayoutPercent( whereClause );
        }

        public Task<byte> GetPayoutPercentByAssetIdAndLifetimeId(int assetId, int lifetimeId)
        {
            string whereClause = $"WHERE AssetId = {assetId} AND LifetimeId = {lifetimeId}";
            return GetPayoutPercent( whereClause );
        }

        /// <summary>
        /// 
        /// Returns <short> (16 bits / SQL's SMALLINT) the payout percentage of the requested asset id, or -1 case the asset does not exist.
        /// 
        /// </summary>
        /// <param name="whereQuery"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        private async Task<byte> GetPayoutPercent(string whereClause)
        {
            IList<Dictionary<string, object>> payoutListDict = await MSSQLClient.QueryOnceAsync( _connection,
                $@"SELECT Payout
                   FROM dbo.OptionPayout
                   {whereClause}"
            );

            return payoutListDict.Count > 0 ? Convert.ToByte( payoutListDict[0]["Payout"] ) : Convert.ToByte( -1 );
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
                $@"SELECT TimeMinutes
                   FROM dbo.OptionLifetime
                   WHERE Id = @LifetimeId ",
                new Dictionary<string, object>
                {
                    { "@LifetimeId", optionLifetimeId }
                } );

            return lifetimeListDict.Count > 0 ? Convert.ToInt32( lifetimeListDict[0]["LifetimeMinutes"] ) : -1;
        }

        // TODO: Finish the GetSymbolMeta query.
        public async Task GetSymbolMeta(int assetId)
        {
            IList<Dictionary<string, object>> symbolMetaListDict = await MSSQLClient.QueryOnceAsync( _connection, "" );
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
                   WHERE dbo.Asset.Id = {assetId} " );
        }
    }
}
