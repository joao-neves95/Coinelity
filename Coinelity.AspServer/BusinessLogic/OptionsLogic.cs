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
using Coinelity.AspServer.Models;
using Coinelity.AspServer.Enums;
using System.Data.SqlClient;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Middleware;
using Coinelity.Core.Data;

namespace Coinelity.AspServer.BusinessLogic
{
    public static class OptionsLogic
    {
        /// <summary>
        /// 
        /// It finds the active order on the DB and then checks the order result (profit/loss).
        /// 
        /// </summary>
        /// <param name="exchange"></param>
        /// <param name="thisUserId"></param>
        /// <param name="order"></param>
        /// <param name="optionsStore"></param>
        /// <returns></returns>
        public static async Task<CheckOptionLogicResponse> CheckOrderAsync(Exchange exchange, OptionsStore optionsStore, int thisUserId, CheckOptionDTO order )
        {
            ActiveOptionJoined activeOption;

            using (optionsStore = new OptionsStore())
            {
                activeOption = await optionsStore.GetActiveOrderAsync( Convert.ToInt32( order.OrderId ), thisUserId );

                // If the InvestmentAmount is 0 it's because the query returned an empty ActiveOption (ActiveOption not found).
                if (activeOption.InvestmentAmount == 0)
                    return new CheckOptionLogicResponse( CheckOrderLogicResult.ErrorNotFound );
            }

            return await CheckOrderAsync( exchange, activeOption );
        }

        /// <summary>
        /// Checks the result of an active option (profit/loss).
        /// NOTE: Does not handle Exceptions (try/catch)
        /// 
        /// </summary>
        /// <param name="optionsStore"> Empty storage variable. Must disposed in the finally block. </param>
        /// <param name="exchange"> Empty storage variable. Must disposed in the finally block. </param>
        /// <param name="order"></param>
        /// <returns></returns>
        public static async Task<CheckOptionLogicResponse> CheckOrderAsync(Exchange exchange, ActiveOptionJoined activeOption)
        {
            UserAccountType userAccountType = Utils.UserAccountTypeResolver( activeOption.IsRealBalance );
            int lifetimeMinutes = activeOption.TimeMinutes;

            DateTime currentUtcTimestamp = DateTime.UtcNow;
            // The .AddMinutes() mothod does not change change the value of the timestamp. It returns a **new** DateTime.
            DateTime closeUtcTimestamp = activeOption.OpenTimestamp.AddMinutes( lifetimeMinutes );

            // The option maturity (expiration timestamp) has not yet been met.
            if (DateTimeOffset.Compare( currentUtcTimestamp, closeUtcTimestamp ) < 0)
            {
                return new CheckOptionLogicResponse( CheckOrderLogicResult.NotExpired, activeOption );
            }
            else
            {
                decimal currentPrice;

                using (exchange = new Exchange( activeOption.ExchangeName ))
                {
                    if (exchange.API == null)
                        return new CheckOptionLogicResponse( CheckOrderLogicResult.ErrorUnknownExchange, activeOption );

                    currentPrice = await exchange.GetLastPrice( activeOption.Symbol );
                }

                ClosedOptionDTO closedOption = new ClosedOptionDTO( activeOption );
                closedOption.ClosePrice = currentPrice;
                closedOption.UserAccountType = userAccountType;
                decimal investmentAmount = Convert.ToDecimal( activeOption.InvestmentAmount );
                closedOption.PayoutValue = ( activeOption.PayoutPercent * investmentAmount) / 100m;

                // Win/Loss Logic.
                bool addToBalance = false;

                switch (activeOption.OperationTypeId)
                {
                    case (int)OperationType.Call:
                        if (currentPrice < activeOption.StrikePrice)
                        {
                            // User lost.
                            addToBalance = false;
                            closedOption.ProfitLossFiat = -investmentAmount;
                            closedOption.PayoutPercent = -100;
                        }
                        else
                        {
                            // User won.
                            addToBalance = true;
                            closedOption.ProfitLossFiat = investmentAmount + closedOption.PayoutValue;
                        }
                        break;

                    case (int)OperationType.Put:
                        if (currentPrice > activeOption.StrikePrice)
                        {
                            // User lost.
                            addToBalance = false;
                            closedOption.ProfitLossFiat = -investmentAmount;
                            closedOption.PayoutPercent = -100;
                        }
                        else
                        {
                            // User won.
                            addToBalance = true;
                            closedOption.ProfitLossFiat = investmentAmount + closedOption.PayoutValue;
                        }
                        break;
                }

                closedOption.AddToBalance = addToBalance;
                // Send success message.
                return addToBalance ?
                    new CheckOptionLogicResponse( CheckOrderLogicResult.Profit, activeOption, closedOption ) :
                    new CheckOptionLogicResponse( CheckOrderLogicResult.Loss, activeOption, closedOption );
            }
        }

        /// <summary>
        /// 
        /// Returns a CloseOrderLogicResponse instance with a ClosedOptionDTO instance, and an empty ActiveOptionJoined instance.
        /// NOTE: Does not handle Exceptions (try/catch)
        /// 
        /// </summary>
        /// <param name="userAccountStore"> Empty storage variable. Must disposed in the finally block. </param>
        /// <param name="optionsStore"> Empty storage variable. Must disposed in the finally block. </param>
        /// <param name="connection"> Empty storage variable. Must disposed in the finally block. </param>
        /// <param name="orderResult"></param>
        /// <returns></returns>
        public static async Task<CloseOrderLogicResponse> CloseOrderAsync(UserAccountStore userAccountStore, OptionsStore optionsStore, SqlConnection connection, ClosedOptionDTO closedOption)
        {
            bool success;
            userAccountStore = new UserAccountStore( false );
            optionsStore = new OptionsStore( false );

            using (connection = Env.GetMSSQLConnection())
            {
                // TODO: Pass this to the BinaryOptionsLogic.CloseOrder()
                success = await MSSQLClient.NonQueryTransactionOnceAsync( connection, new SqlCommand[]
                {
                    new SqlCommand(userAccountStore.UnfreezeBalanceCmd(closedOption.UserId, closedOption.UserAccountType, Convert.ToDecimal( closedOption.InvestmentAmount ), closedOption.AddToBalance, closedOption.PayoutValue)),
                    // TODO: (If user lost) Send lost balance to Coinelity's bank account.
                    new SqlCommand(optionsStore.DeleteActiveOrderCmd(closedOption.Id, closedOption.UserId), connection),
                    new SqlCommand(optionsStore.InsertInOrderHistoryCmd(closedOption), connection)
                } );
            }

            return new CloseOrderLogicResponse( success, null, closedOption );
        }
    }
}
