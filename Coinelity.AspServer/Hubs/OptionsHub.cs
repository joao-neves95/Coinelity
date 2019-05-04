/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// THIS LOGIC NEEDS A BIG REFACTORING FOR PERFORMANCE ENHANCEMENT.

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
using Microsoft.AspNetCore.Authorization;
using System.Data.SqlClient;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Linq;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.BusinessLogic;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.Enums;
using Coinelity.Core;
using Coinelity.Core.Data;
using Coinelity.Core.Models;
using Coinelity.Core.Errors;

// TODO: Pass the error messages to the ErrorMessages class of constants.
namespace Coinelity.AspServer.Hubs
{
    public class OptionsHub : Hub
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
                JsonValidationResponse jsonValidationResponse = JsonValidation.IsValid( typeof( PlaceOptionDTO ), placeOrderDTO );

                if (!jsonValidationResponse.IsValid)
                    return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 400, "Client Error", jsonValidationResponse.ErrorMessages ).ToJSON() );

                // TODO: Handle Deserialization exceptions.
                // TODO: Test the placeOrderDTO gives an error.
                PlaceOptionDTO order = JsonConvert.DeserializeObject<PlaceOptionDTO>( placeOrderDTO );
                // Check if user has enough money.
                int thisUserId = Convert.ToInt32( Middleware.Utils.GetUserIdClaim( Context.User ) );
                UserAccountType accountType = Middleware.Utils.UserAccountTypeResolver( order.UserAccountType );

                if (accountType == UserAccountType.Unknown)
                    return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 400, "Client Error",  ErrorMessages.WrongAccountType, null ).ToJSON() );

                decimal userBalance = 0.0M;
                using (userAccountStore = new UserAccountStore())
                {
                    SQLClientResult userBalanceResult = await userAccountStore.GetBalanceAsync( thisUserId, accountType );
                    if (!userBalanceResult.Success)
                        return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 200, ErrorMessages.UnknownError, ErrorMessages.UnknownError, null ).ToJSON() );

                    userBalance = Convert.ToDecimal( userBalanceResult.QueryResult[0][nameof( accountType )] );
                }

                if (Convert.ToDecimal( order.InvestmentAmount ) > userBalance)
                {
                    // If he does not have enough money, send failed response.
                    return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 400, "Client Error", ErrorMessages.InsufficientFunds, null ).ToJSON() );
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
                        // TODO: (SERVER) FIX THIS.
                        IList<Dictionary<string, object>> symbolAndExchange = new List<Dictionary<string, object>>();// await optionsStore.GetSymbolAndExchange( order.AssetId );
                        symbol = symbolAndExchange[0]["Symbol"].ToString();
                        exchangeName = symbolAndExchange[1]["Exchange"].ToString();
                    }

                    // Get the order's strike price.
                    using (exchange = new Exchange( exchangeName ))
                    {
                        if (exchange.API == null)
                            return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 400, "Client Error", ErrorMessages.UnknownExchange, null ).ToJSON() );

                        order.StrikePrice = await exchange.GetLastPrice( symbol );
                    }

                    using (connection = Env.GetMSSQLConnection())
                    {
                        userAccountStore = new UserAccountStore( false );
                        optionsStore = new OptionsStore( false );

                        SQLClientResult result = await MSSQLClient.NonQueryTransactionAsync( connection,
                            new SqlCommand[]
                            {
                                userAccountStore.FreezeUserBalanceCmd( thisUserId, accountType, Convert.ToDecimal( order.InvestmentAmount ), connection ),
                                await optionsStore.OpenOrderCmdAsync( order, connection )
                            } );

                        if (!result.Success)
                        {
                            return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 500, "Unknown Error", ErrorMessages.UnknownError, null ).ToJSON() );
                        }
                        else
                        {
                            order.ActiveOptionId = await optionsStore.GetLastActiveOrderAsync( thisUserId, connection );

                            return Clients.Caller.SendAsync( "ReceivePlaceOptionResult",
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
                return Clients.Caller.SendAsync( "ReceivePlaceOptionResult", new ApiResponse( 500, "Unknown Error", ErrorMessages.UnknownError, null ).ToJSON() );
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
        /// <param name="checkOptionDTO"> A CheckOrderDTO instance in JSON string format </param>
        /// <returns></returns>
        // [Authorize]
        public async Task<Task> CheckOrder(string checkOptionDTO)
        {
            // TODO: Handle Deserialization exceptions.
            OptionsStore optionsStore = null;
            UserAccountStore userAccountStore = null;
            Exchange exchange = null;
            SqlConnection connection = null;

            int thisUserId = Convert.ToInt32( Middleware.Utils.GetUserIdClaim( Context.User ) );

            try
            {
                CheckOptionDTO order = JsonConvert.DeserializeObject<CheckOptionDTO>( checkOptionDTO );
                JsonValidationResponse jsonValidationResponse = JsonValidation.IsValid( typeof( CheckOptionDTO ), checkOptionDTO );

                if (!jsonValidationResponse.IsValid)
                    return Clients.Caller.SendAsync( "ReceiveCheckOptionResult", new ApiResponse( 400, "Client Error", jsonValidationResponse.ErrorMessages ).ToJSON() );

                CheckOptionLogicResponse orderResult = await OptionsLogic.CheckOrderAsync( exchange, optionsStore, thisUserId, order );
                ApiResponse apiResponse = await HandleCheckOrderResultAsync( userAccountStore, optionsStore, connection, thisUserId, orderResult );
                return Clients.Caller.SendAsync( "ReceiveCheckOptionResult", apiResponse.ToJSON() );
            }
            catch (Exception e)
            {
                // TODO: Exception Handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceiveCheckOptionResult", new ApiResponse( 500, "Unknown Error", ErrorMessages.UnknownError, null ).ToJSON() );
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
                int thisUserId = Convert.ToInt32( Middleware.Utils.GetUserIdClaim( Context.User ) );
                List<ActiveOptionJoined> activeOptions = await optionsStore.GetActiveOrdersAsync( thisUserId );

                if (activeOptions.Count <= 0)
                {
                    return Clients.Caller.SendAsync( "ReceiveSyncResult",
                        new ApiResponse( 200, "Ok", "No active orders." ).ToJSON()
                    );
                }

                List<ApiResponse> apiResponses = new List<ApiResponse>();
                CheckOptionLogicResponse currentOrderResponse;
                // TODO: Complete (handle results).
                for (int i = 0; i < activeOptions.Count; ++i)
                {
                    currentOrderResponse = await OptionsLogic.CheckOrderAsync( exchange, activeOptions[i] );
                    apiResponses.Add( await HandleCheckOrderResultAsync( userAccountStore, optionsStore, connection, thisUserId, currentOrderResponse ) );
                }

                return Clients.Caller.SendAsync( "ReceiveSyncResult", new ApiResponse( null, null, null, apiResponses.ToArray() ) );
            }
            catch (Exception e)
            {
                // TODO: Exception Handling.
                Console.WriteLine( e );
                return Clients.Caller.SendAsync( "ReceiveSyncResult", new ApiResponse( 500, "Unknown Error", ErrorMessages.UnknownError ).ToJSON() );
            }
            finally
            {
                optionsStore?.Dispose();
                exchange.Dispose();
                userAccountStore.Dispose();
                connection.Dispose();
            }
        }

        public async Task<Task> CloseOrder(string orderId)
        {
            OptionsStore optionsStore = null;
            UserAccountStore userAccountStore = null;
            SqlConnection sqlConnection = null;

            try
            {
                int thisOrderId = Convert.ToInt32( orderId );
                int thisUserId = Convert.ToInt32( Middleware.Utils.GetUserIdClaim( Context.User ) );
                ActiveOptionJoined activeOption;

                using (optionsStore = new OptionsStore())
                {
                    activeOption = await optionsStore.GetActiveOrderAsync( thisOrderId );
                }

                if (activeOption.InvestmentAmount <= 0)
                    return Clients.Caller.SendAsync( "ReceiveCloseResult", new ApiResponse( 404, "Not Found", "Order not found." ).ToJSON() );

                ClosedOptionDTO closedOption = new ClosedOptionDTO( activeOption );
                // Do not add the investment amount.
                closedOption.AddToBalance = false;
                // The user loses 30% of the his investment in case he closes the order.
                closedOption.PayoutValue = (Convert.ToDecimal( closedOption.InvestmentAmount ) * 30m) / 100m;
                CloseOrderLogicResponse closeOrderResponse = await OptionsLogic.CloseOrderAsync( userAccountStore, optionsStore, sqlConnection, closedOption );

                if (!closeOrderResponse.Success)
                    return Clients.Caller.SendAsync( "ReceiveCloseResult", new ApiResponse( 500, "Unknown Error", "Error while processing the close order request. Please try again." ).ToJSON() );
                else
                {
                    return Clients.Caller.SendAsync( "ReceiveCloseResult", new ApiResponse( null, null, null,
                        new object[] { new Dictionary<string, object>
                            {
                                { "Message", "Successfuly closed the order." },
                                { "Order", closeOrderResponse.ClosedOption }
                            }
                        }
                    ) );
                }
            }
            catch (FormatException e)
            {
                return Clients.Caller.SendAsync( "ReceiveCloseResult", new ApiResponse( 400, "Client", new object[] { "The order id must be an integer." } ).ToJSON() );
            }

            // Does the order exist?
            // Unfreeze corresponding balance and take cancelation fee.
            // Remove from active orders.
            // Add to order history.
        }

        private async Task<ApiResponse> HandleCheckOrderResultAsync(UserAccountStore userAccountStore, OptionsStore optionsStore, SqlConnection connection, int thisUserId, CheckOptionLogicResponse orderResult)
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
                    CloseOrderLogicResponse closeOrderResult = await OptionsLogic.CloseOrderAsync( userAccountStore, optionsStore, connection, orderResult.ClosedOption );

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
