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

// TODO: Pass the methods to the Coinelity.Core and modularize them.
namespace Coinelity.AspServer.Hubs
{
    public class BinaryOptionsHub : Hub
    {
        /// <summary>
        /// 
        /// WORK IN PROGRESS.
        /// 
        /// </summary>
        /// <param name="placeOrderDTO"> A PlaceOrderDTO instance in JSON string format </param>
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
                // TODO: Handle Deserialization exceptions.
                // TODO: Test if not having the strike price on the placeOrderDTO gives an error.
                // TODO: Validate placeOrderDTO.
                PlaceOrderDTO order = JsonConvert.DeserializeObject<PlaceOrderDTO>( placeOrderDTO );

                // Check if user has enough money.
                int userId = Convert.ToInt32( Utils.GetUserClaim( Context.User, "id" ) );
                UserAccountType? accountType = Utils.UserAccountTypeResolver( order.AccountType );

                if (accountType == null)
                    // TODO: Change from the error objects to only error strings (<string[]>) in all responses.
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.WrongAccountType ) } ).ToJSON() );

                decimal userBalance = 0.0M;
                using (userAccountStore = new UserAccountStore())
                {
                    userBalance = await userAccountStore.GetUserBalanceAsync( userId, accountType.Value );
                }

                if (Convert.ToDecimal( order.InvestmentAmount ) > userBalance)
                {
                    // If he does not have enough money, send failed response.
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.InsufficientFunds ) } ).ToJSON() );
                }
                else
                {
                    // If he has enough money:

                    // Get strike price from API and add it to the PlaceOrderDTO.
                    // Both Exchange and Symbol are **temporarily** hardcoded.
                    using (exchange = new Exchange( "KRAKEN" ))
                    {
                        if (exchange.API == null)
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.UnknownExchange ) } ).ToJSON() );

                        order.StrikePrice = await exchange.GetLastPrice( "BTC/EUR" );
                    }

                    using (connection = Env.GetMSSQLConnection())
                    {
                        userAccountStore = new UserAccountStore( false );
                        optionsStore = new OptionsStore( false );

                        bool success = await MSSQLClient.NonQueryTransactionAsync( connection,
                            new SqlCommand[]
                            {
                                userAccountStore.FreezeUserBalanceCmd( userId, accountType.Value, Convert.ToDecimal( order.InvestmentAmount ), connection ),
                                await optionsStore.OpenOrderCmdAsync( order, connection )
                            } );

                        if (success)
                        {
                            order.ActiveOrderId = await optionsStore.GetLastActiveOrderAsync( userId, connection );

                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResult",
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
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 500, "Unknown Error", new object[] { new ErrorMessage( ErrorType.UnknownError ) } ).ToJSON() );
                        }
                    }
                }
            }
            catch (Exception e)
            {
                // TODO: Exeption handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 500, "Unknown Error", new object[] { new ErrorMessage( ErrorType.UnknownError ) } ).ToJSON() );
            }
            finally
            {
                userAccountStore?.Dispose();
                optionsStore?.Dispose();
                exchange?.Dispose();
                connection?.Dispose();
            }
        }

        /// <summary>
        /// 
        /// WORK IN PROGRESS.
        /// 
        /// </summary>
        /// <param name="checkOrderDTO"> A CheckOrderDTO instance in JSON string format </param>
        /// <returns></returns>
        // [Authorize]
        public async Task<Task> CheckOrder(string checkOrderDTO)
        {
            // TODO: Handle Deserialization exceptions.
            CheckOrderDTO order = JsonConvert.DeserializeObject<CheckOrderDTO>( checkOrderDTO );
            OptionsStore optionsStore = null;
            UserAccountStore userAccountStore = null;
            Exchange exchange = null;

            int userId = Convert.ToInt32( Utils.GetUserClaim( Context.User, "id" ) );

            try
            {
                UserAccountType? userAccountType = Utils.UserAccountTypeResolver( order.AccountType );

                if (userAccountType == null)
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.WrongAccountType ) } ).ToJSON() );

                ActiveOptionJoined activeOption;

                using (optionsStore = new OptionsStore())
                {
                    activeOption = await optionsStore.GetActiveOrderAsync( Convert.ToInt32( order.OrderId ), userId );

                    // If the InvestmentAmount is 0 it's because the query returned an empty ActiveOption (ActiveOption not found).
                    if (activeOption.InvestmentAmount == 0)
                        return Clients.Caller.SendAsync( "ReceiveCheckOrderResult", new ApiResponse( 404, "Not Found", new object[] { /* Order not found. */ } ).ToJSON() );
                }

                int lifetimeMinutes = activeOption.Lifetime;

                DateTime currentUtcTimestamp = DateTime.UtcNow;
                // The .AddMinutes() mothod does not change change the value of the timestamp. It returns a **new** DateTime.
                DateTime closeUtcTimestamp = activeOption.OpenTimestamp.AddMinutes( lifetimeMinutes );

                // The option maturity (expiration timestamp) has not yet been met.
                if ( DateTimeOffset.Compare(currentUtcTimestamp, closeUtcTimestamp ) < 0)
                {
                    return Clients.Caller.SendAsync( "ReceiveCheckOrderResult",
                        new ApiResponse( null, null, null,
                            new object[] { new Dictionary<string, object>
                                {
                                    { "Message", "The option has not yet been expired." },
                                    { "Order", activeOption }
                                }
                            }
                        ).ToJSON()
                    );
                }
                else
                {
                    decimal currentPrice;

                    using (exchange = new Exchange( activeOption.ExchangeName ))
                    {
                        if (exchange.API == null)
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { new ErrorMessage( ErrorType.UnknownExchange ) } ).ToJSON() );

                        currentPrice = await exchange.GetLastPrice( activeOption.Symbol );
                    }

                    decimal investmentAmount = Convert.ToDecimal( activeOption.InvestmentAmount );
                    decimal payoutValue = ( activeOption.PayoutPercent * investmentAmount ) / 100;
                    int unfreezeResult = 0;

                    // Win/Loss Logic.
                    switch (activeOption.OperationTypeId)
                    {
                        // TODO: Turn the order result commands into transactions.
                        case (int)OperationType.Call:
                            if (currentPrice < activeOption.StrikePrice)
                            {
                                // User lost.
                                using ( userAccountStore = new UserAccountStore() )
                                {
                                    unfreezeResult = await userAccountStore.UnfreezeBalanceAsync( userId, userAccountType.Value, investmentAmount, false);
                                    // TODO: Send lost balance to Coinelity's bank account.
                                }
                            }
                            else
                            {
                                // User won.
                                using (userAccountStore = new UserAccountStore())
                                {
                                    unfreezeResult = await userAccountStore.UnfreezeBalanceAsync( userId, userAccountType.Value, investmentAmount, true, payoutValue );
                                }
                            }
                            break;

                        case (int)OperationType.Put:
                            if( currentPrice > activeOption.StrikePrice )
                            {
                                // User lost.
                                using (userAccountStore = new UserAccountStore())
                                {
                                    unfreezeResult = await userAccountStore.UnfreezeBalanceAsync( userId, userAccountType.Value, investmentAmount, false );
                                    // TODO: Send lost balance to Coinelity's bank account.
                                }
                            }
                            else
                            {
                                // User won.
                                using (userAccountStore = new UserAccountStore())
                                {
                                    unfreezeResult = await userAccountStore.UnfreezeBalanceAsync( userId, userAccountType.Value, investmentAmount, true, payoutValue );
                                    // TODO: Send lost balance to Coinelity's bank account.
                                }
                            }
                            break;
                    }

                    if (unfreezeResult > 0)
                    {
                        using (optionsStore = new OptionsStore())
                        {
                            await optionsStore.DeleteActiveOrderAsync( activeOption.Id, userId );
                        }
                    }
                    else
                    {
                        return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 500, "Error", new object[] { /* new ErrorMessage( <Error processing the request> ) */  } ).ToJSON() );
                    }
                }
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
                userAccountStore?.Dispose();
                exchange?.Dispose();
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
