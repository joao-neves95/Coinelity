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
using Coinelity.Core.Data;
using Coinelity.AspServer.Enums;

namespace Coinelity.AspServer.DataAccess
{
    public class UserAccountStore : IDisposable
    {
        private readonly SqlConnection _connection;

        public UserAccountStore( bool createConnection = true )
        {
            this._connection = createConnection ? Env.GetMSSQLConnection() : null;
        }

        public void Dispose()
        {
            this._connection?.Dispose();
            GC.SuppressFinalize( this );
        }

        ~UserAccountStore()
        {
            Dispose();
        }

        public async Task<SQLClientResult> GetBalancesAsync(int userId)
        {
            SQLClientResult result = await MSSQLClient.QueryOnceAsync( _connection,
                $@"SELECT RealBalance, CreditsBalance, PaperBalance
                   FROM dbo.ApplicationUserAccount
                   WHERE UserId = {userId}"
            );

            result.Freeze();
            return result;
        }

        public async Task<SQLClientResult> GetBalanceAsync(int userId, UserAccountType userAccountType)
        {
            string select = "SELECT ";
            const string query = @"FROM dbo.ApplicationUserAccount
                                   WHERE UserId = @UserId";

            string accountType = nameof( userAccountType );
            select += accountType;

            SQLClientResult result = await MSSQLClient.QueryOnceAsync( _connection,
                select + query,
                new Dictionary<string, object>
                {
                    { "@UserId", userId }
                } );

            result.Freeze();
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userAccountType"></param>
        /// <param name="amountToFreeze"></param>
        /// <param name="connection"> If null, it defaults to this classes's on creation connection, and if not null it's used the provided connection instead </param>
        /// <returns></returns>
        public SqlCommand FreezeUserBalanceCmd(int userId, UserAccountType userAccountType, decimal amountToFreeze, SqlConnection connection = null)
        {
            const string accountType = nameof( userAccountType );
            connection = connection == null ? _connection : connection;

            return MSSQLClient.ParameterizeCommand( connection,
                $@"UPDATE dbo.ApplicationUserAccount
                   SET
                       dbo.ApplicationUserAccount.{accountType} = (dbo.ApplicationUserAccount.{accountType} - @AmmountToFreeze),
                       dbo.ApplicationUserAccount.Freezed{accountType} = (dbo.ApplicationUserAccount.Freezed{accountType} + @AmmountToFreeze)
                   WHERE UserId = @UserId",
                new Dictionary<string, object>
                {
                    { "@UserId", userId },
                    { "@AmmountToFreeze", amountToFreeze }
                }
            );
        }

        /// <summary>
        /// 
        /// If successful returns 2 (number of updated rows), if no rows where changed it returns 0, and if an error occured it returns -1.
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userAccountType"></param>
        /// <param name="amountToFreeze"></param>
        /// <returns></returns>
        public async Task<SQLClientResult> FreezeUserBalanceAsync(int userId, UserAccountType userAccountType, decimal amountToFreeze)
        {
            return await MSSQLClient.CommandOnceAsync( _connection, FreezeUserBalanceCmd( userId, userAccountType, amountToFreeze ) );
        }

        public void UpdateBalanceAsync(int userId, UserAccountType userAccountType, decimal amountToUpdate)
        {
            throw new NotImplementedException();
        }

        public string UnfreezeBalanceCmd(int userId, UserAccountType userAccountType, decimal amountToUnfreeze, bool addToBalance = false, decimal amountToAdd = 0.0m)
        {
            const string accountType = nameof( userAccountType );
            string addToBalanceStatement;

            addToBalanceStatement =
                addToBalance ?
                    $"dbo.ApplicationUserAccount.{accountType} = (dbo.ApplicationUserAccount.{accountType} + {amountToUnfreeze} + {amountToAdd})," :
                amountToAdd != 0.0m ?
                    $"dbo.ApplicationUserAccount.{accountType} = (dbo.ApplicationUserAccount.{accountType} + {amountToAdd})," :
                    "";

            return $@"UPDATE dbo.ApplicationUserAccount
                      SET
                          {addToBalanceStatement}
                          dbo.ApplicationUserAccount.Freezed{accountType} = (dbo.ApplicationUserAccount.Freezed{accountType} - @AmountToUnfreeze)
                      WHERE UserId = {userId}";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userAccountType"></param>
        /// <param name="amountToUnfreeze"></param>
        /// <param name="addToBalance"> If true, it adds the amountToUnfreeze parameter to the user's balance. </param>
        /// <param name="amountToAdd"> Optional. The amount to add to the user's balance </param>
        /// <returns></returns>
        public async Task<SQLClientResult> UnfreezeBalanceAsync(int userId, UserAccountType userAccountType, decimal amountToUnfreeze, bool addToBalance = false, decimal amountToAdd = 0.0m)
        {
            return await MSSQLClient.CommandOnceAsync( _connection, UnfreezeBalanceCmd( userId, userAccountType, amountToUnfreeze, addToBalance, amountToAdd ) );
        }
    }
}

