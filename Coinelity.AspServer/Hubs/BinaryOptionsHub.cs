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
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Data.SqlClient;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using ExchangeSharp;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.Enums;
using Coinelity.Core.Data;
using Coinelity.Core.Models;
using Coinelity.Core.Errors;

// TODO: Pass the methods to the Coinelity.Core.
namespace Coinelity.AspServer.Hubs
{
    public class BinaryOptionsHub : Hub
    {
        /// <summary>
        /// 
        /// WORK IN PROGRESS.
        /// 
        /// </summary>
        /// <param name="placeOrderDTO">A PlaceOrderDTO instance in string format</param>
        /// <returns></returns>
        // [Authorize]
        public async Task<Task> PlaceOrder(string placeOrderDTO)
        {
            UserAccountStore userAccountStore = null;
            OptionsStore optionsStore = null;
            Exchange exchange = null;
            SqlConnection connection = null;

            try
            {
                // TODO: Test if not having the strike price on the placeOrderDTO gives an error.
                // TODO: Validate placeOrderDTO.
                PlaceOrderDTO order = JsonConvert.DeserializeObject<PlaceOrderDTO>( placeOrderDTO );

                // Check if user has enough money.
                int userId = Convert.ToInt32( Utils.GetUserClaim( Context.User, "id" ) );
                string accountTypeReq = char.ToUpper( order.AccountType[0] ) + order.AccountType.Substring( 1 );
                UserAccountType accountType;

                if (accountTypeReq == nameof( UserAccountType.RealBalance ))
                    accountType = UserAccountType.RealBalance;
                else if (accountTypeReq == nameof( UserAccountType.PaperBalance ))
                    accountType = UserAccountType.PaperBalance;
                else
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.WrongAccountType ) } ).ToJSON() );

                decimal userBalance = 0.0M;
                using (userAccountStore = new UserAccountStore())
                {
                    userBalance = await userAccountStore.GetUserBalanceAsync( userId, accountType );
                }

                if (Convert.ToDecimal( order.InvestmentAmount ) > userBalance)
                {
                    // If he does not have enough money, send failed response.
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.InsufficientFunds ) } ).ToJSON() );
                }
                else
                {
                    // If he has enough money:

                    // Get strike price from API and add it to the PlaceOrderDTO.
                    // Both Exchange and Symbol are **temporarily** hardcoded.
                    using (exchange = new Exchange( "KRAKEN" ))
                    {
                        if (exchange.API == null)
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.UnknownExchange ) } ).ToJSON() );

                        order.StrikePrice = await exchange.GetLastPrice( "BTC/EUR" );
                    }

                    using (connection = Env.GetMSSQLConnection())
                    {
                        userAccountStore = new UserAccountStore( false );
                        optionsStore = new OptionsStore( false );

                        bool success = await MSSQLClient.NonQueryTransactionAsync( connection,
                            new SqlCommand[]
                            {
                                userAccountStore.FreezeUserBalanceCmd( userId, accountType, Convert.ToDecimal( order.InvestmentAmount ), connection ),
                                await optionsStore.OpenOrderCmdAsync( order, connection )
                            } );

                        if (success)
                        {
                            order.ActiveOrderId = await optionsStore.GetLastActiveOrderAsync( userId, connection );

                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse",
                                new ApiResponse( null, null, null,
                                    new object[] { new Dictionary<string, object>
                                        {
                                            { "Message", "The order was successfully placed" },
                                            { "Order", order }
                                        }
                                    }
                                ).ToJSON()
                            );
                        }
                        else
                        {
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", new ApiResponse( 500, "Unknown Error", new object[] { new ErrorMessage( ErrorType.UnknownError ) } ).ToJSON() );
                        }
                    }
                }
            }
            catch (Exception e)
            {
                // TODO: Exeption handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", new ApiResponse( 500, "Unknown Error", new object[] { new ErrorMessage( ErrorType.UnknownError ) } ).ToJSON() );
            }
            finally
            {
                userAccountStore?.Dispose();
                optionsStore?.Dispose();
                exchange?.Dispose();
                connection?.Dispose();
            }
        }

        public async Task CheckOrder(string orderIdReq)
        {
            OptionsStore optionsStore = null;

            int userId = Convert.ToInt32( Utils.GetUserClaim( Context.User, "id" ) );
            int orderId = -1;
            int lifetimeMinutes;

            try
            {
                orderId = Convert.ToInt32( orderIdReq );
                ActiveOption activeOption;

                using (optionsStore = new OptionsStore())
                {
                    activeOption = await optionsStore.GetActiveOrderAsync( Convert.ToInt32( orderId ), userId );

                    // If the InvestmentAmount is 0 it's because the query returned an empty ActiveOption (ActiveOption not found).
                    if (activeOption.InvestmentAmount == 0)
                        // Send error. Order not found.
                        return;
                }

                using (optionsStore = new OptionsStore())
                {
                    lifetimeMinutes = await optionsStore.GetLifetimeById( activeOption.LifetimeId );

                    // If the InvestmentAmount is 0 it's because the query returned an empty ActiveOption (ActiveOption not found).
                    if (lifetimeMinutes == -1)
                        // Send error. Invalid lifetime.
                        return;
                }

                DateTime currentUtcTimestamp = DateTime.UtcNow;
                // The .AddMinutes() mothod does not change change the value. It returns a **new** DateTime.
                DateTime closeUtcTimestamp = activeOption.OpenTimestamp.AddMinutes( lifetimeMinutes );

                if ( DateTimeOffset.Compare(currentUtcTimestamp, closeUtcTimestamp ) < 0)
                {
                    // The option maturity (expiration timestamp) as not yet been met.
                }
                else
                {
                    // Check the current price vs. strike price.
                }
            }
            catch (FormatException)
            {
                // Send Error (orderId is not a number).
            }
            catch (Exception e)
            {
                // TODO: Exception Handling.
                Console.WriteLine( e );
                // Send Unknown Error.
            }
            finally
            {
                optionsStore?.Dispose();
            }
        }

        public async Task SyncOrders()
        {

        }

        public async Task CloseOrder(string orderId)
        {

        }
    }
}
