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
using Coinelity.AspServer.BusinessLogic;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.Enums;
using Coinelity.Core.Data;
using Coinelity.Core.Models;
using Coinelity.Core.Errors;

// TODo: Refactor for less code repetition.
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
                int thisUserId = Convert.ToInt32( Utils.GetUserIdClaim( Context.User ) );
                UserAccountType accountType = Utils.UserAccountTypeResolver( order.IsRealBalance );

                if (accountType == UserAccountType.Unknown)
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { ErrorMessages.WrongAccountType } ).ToJSON() );

                decimal userBalance = 0.0M;
                using (userAccountStore = new UserAccountStore())
                {
                    userBalance = await userAccountStore.GetUserBalanceAsync( thisUserId, accountType );
                }

                if (Convert.ToDecimal( order.InvestmentAmount ) > userBalance)
                {
                    // If he does not have enough money, send failed response.
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { ErrorMessages.InsufficientFunds } ).ToJSON() );
                }
                else
                {
                    // If he has enough money:

                    // Get strike price from API and add it to the PlaceOrderDTO.
                    // Both Exchange and Symbol are **temporarily** hardcoded.
                    string symbol = "";
                    string exchangeName = "";
                    using (optionsStore = new OptionsStore())
                    {
                        IList<Dictionary<string, object>> symbolAndExchange = await optionsStore.GetSymbolAndExchange( order.AssetId );
                        symbol = symbolAndExchange[0]["Symbol"].ToString();
                        exchangeName = symbolAndExchange[1]["Exchange"].ToString();
                    }

                    using (exchange = new Exchange( exchangeName ))
                    {
                        if (exchange.API == null)
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 400, "Client Error", new object[] { ErrorMessages.UnknownExchange } ).ToJSON() );

                        order.StrikePrice = await exchange.GetLastPrice( symbol );
                    }

                    using (connection = Env.GetMSSQLConnection())
                    {
                        userAccountStore = new UserAccountStore( false );
                        optionsStore = new OptionsStore( false );

                        bool success = await MSSQLClient.NonQueryTransactionAsync( connection,
                            new SqlCommand[]
                            {
                                userAccountStore.FreezeUserBalanceCmd( thisUserId, accountType, Convert.ToDecimal( order.InvestmentAmount ), connection ),
                                await optionsStore.OpenOrderCmdAsync( order, connection )
                            } );

                        if (!success)
                        {
                            return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 500, "Unknown Error", new object[] { ErrorMessages.UnknownError } ).ToJSON() );
                        }
                        else
                        {
                            order.ActiveOrderId = await optionsStore.GetLastActiveOrderAsync( thisUserId, connection );

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
                    }
                }
            }
            catch (Exception e)
            {
                // TODO: Exeption handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceivePlaceOrderResult", new ApiResponse( 500, "Unknown Error", new object[] { ErrorMessages.UnknownError } ).ToJSON() );
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
            SqlConnection connection = null;

            int thisUserId = Convert.ToInt32( Utils.GetUserIdClaim( Context.User ) );

            try
            {
                CheckOrderLogicResponse orderResult = await BinaryOptionsLogic.CheckOrderAsync( exchange, thisUserId, order, optionsStore );
                ApiResponse apiResponse = await HandleCheckOrderResultAsync( userAccountStore, optionsStore, connection, thisUserId, orderResult );
                return Clients.Caller.SendAsync( "ReceiveCheckOrderResult", apiResponse.ToJSON() );
            }
            catch (Exception e)
            {
                // TODO: Exception Handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceiveCheckOrderResult", new ApiResponse( 500, "Unknown Error", new object[] { ErrorMessages.UnknownError } ).ToJSON() );
            }
            finally
            {
                optionsStore?.Dispose();
                userAccountStore?.Dispose();
                exchange?.Dispose();
                connection?.Dispose();
            }
        }

        /// <summary>
        /// 
        /// Returns an ApiResponse instance with an array of ApiResponse instances as Data or an error ApiResponse.
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<Task> SyncOrders()
        {
            OptionsStore optionsStore = null;
            Exchange exchange = null;
            UserAccountStore userAccountStore = null;
            SqlConnection connection = null;

            try
            {
                int thisUserId = Convert.ToInt32( Utils.GetUserIdClaim( Context.User ) );
                List<ActiveOptionJoined> activeOptions = await optionsStore.GetActiveOrdersAsync( thisUserId );

                if (activeOptions.Count <= 0)
                    return Clients.Caller.SendAsync( "ReceiveSyncResult",
                        new ApiResponse( 200, "Ok", null, new object[] {
                            new Dictionary<string, string>()
                            {
                                { "Message", "No active orders" }
                            }
                        } ).ToJSON()
                    );

                List<ApiResponse> apiResponses = new List<ApiResponse>();
                CheckOrderLogicResponse currentOrderResponse;
                // TODO: Complete (handle results).
                for (int i = 0; i < activeOptions.Count; ++i)
                {
                    currentOrderResponse = await BinaryOptionsLogic.CheckOrderAsync( exchange, thisUserId, activeOptions[i] );
                    apiResponses.Add( await HandleCheckOrderResultAsync( userAccountStore, optionsStore, connection, thisUserId, currentOrderResponse ) );
                }

                return Clients.Caller.SendAsync( "ReceiveSyncResult", new ApiResponse( 200, "Success", null, apiResponses.ToArray() ) );
            }
            catch (Exception e)
            {
                // TODO: Exception Handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceiveSyncResult", new ApiResponse( 500, "Unknown Error", new object[] { ErrorMessages.UnknownError } ).ToJSON() );
            }
            finally
            {
                optionsStore?.Dispose();
                exchange.Dispose();
                userAccountStore.Dispose();
                connection.Dispose();
            }
        }

        public async Task CloseOrder(string orderId)
        {
            // Does the order exist?
            // Unfreeze corresponding balance and take cancelation fee.
            // Remove from active orders.
            // Add to order history.
        }

        private async Task<ApiResponse> HandleCheckOrderResultAsync(UserAccountStore userAccountStore, OptionsStore optionsStore, SqlConnection connection, int thisUserId, CheckOrderLogicResponse orderResult)
        {
            switch (orderResult.Result)
            {
                case CheckOrderLogicResult.ErrorNotFound:
                    return new ApiResponse( 404, "Not Found", new object[] { "Order not found." } );

                case CheckOrderLogicResult.NotExpired:
                    return new ApiResponse( null, null, null,
                        new object[] { new Dictionary<string, object>
                            {
                                { "Message", "The option has not yet expired." },
                                { "Order", orderResult.ActiveOption }
                            }
                        }
                    );

                case CheckOrderLogicResult.ErrorUnknownExchange:
                    return new ApiResponse( 400, "Client Error", new object[] { ErrorMessages.UnknownExchange } );

                case CheckOrderLogicResult.Profit:
                case CheckOrderLogicResult.Loss:
                    CloseOrderLogicResponse closeOrderResult = await BinaryOptionsLogic.CloseOrderAsync( userAccountStore, optionsStore, connection, thisUserId, orderResult );

                    if (!closeOrderResult.Success)
                    {
                        return new ApiResponse( 500, "Error", new object[] { "Error processing the request. Please try again." } );
                    }
                    else
                    {
                        // Send success message.
                        string wonLostMessage = closeOrderResult.ClosedOption.AddToBalance ? "Profit" : "Loss";

                        return new ApiResponse( null, null, null,
                            new object[] { new Dictionary<string, object>
                                {
                                    { "Message", wonLostMessage },
                                    { "Order", orderResult.ClosedOption }
                                }
                            }
                        );
                    }
                default:
                    return new ApiResponse( 500, "Unknown Error", new object[] { ErrorMessages.UnknownError } );
            }
        }
    }
}
