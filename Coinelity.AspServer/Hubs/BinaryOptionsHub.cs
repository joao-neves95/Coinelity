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
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Models;
using Coinelity.AspServer.Enums;
using Coinelity.Core.Errors;

// TODO: Configure the JSON Serializer.
namespace Coinelity.AspServer.Hubs
{
    public class BinaryOptionsHub : Hub
    {
        /// <summary>
        /// 
        /// IMPLEMENTING.
        /// 
        /// </summary>
        /// <param name="placeOrderDTO">A PlaceOrderDTO on a string format</param>
        /// <returns></returns>
        // [Authorize]
        public async Task<Task> PlaceOrder(string placeOrderDTO)
        {
            UserAccountStore userAccountStore = null;
            OptionsStore optionsStore = null;

            try
            {
                // TODO: Test if not having the strike price on the placeOrderDTO gives an error.
                // TODO: Validate placeOrderDTO.
                PlaceOrderDTO order = JsonConvert.DeserializeObject<PlaceOrderDTO>( placeOrderDTO );

                // 1. Check if user has enough money.
                float investmentAmount = order.InvestmentAmount;
                int userId = Convert.ToInt32( Utils.GetUserClaim( Context.User, "id" ) );
                string accountTypeReq = char.ToUpper( order.AccountType[0] ) + order.AccountType.Substring( 1 );
                UserAccountType accountType;

                if (accountTypeReq == nameof( UserAccountType.RealBalance ))
                    accountType = UserAccountType.RealBalance;
                else if (accountTypeReq == nameof( UserAccountType.PaperBalance ))
                    accountType = UserAccountType.PaperBalance;
                else
                {
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse",
                        JsonConvert.SerializeObject(
                            new ApiResponse(
                                400,
                                "Client Error",
                                new object[] { new ErrorMessage( ErrorType.WrongAccountType ) },
                                new object[] { }
                            ),
                        Formatting.Indented )
                    );
                }

                decimal userBalance = 0.0M;
                using (userAccountStore = new UserAccountStore() )
                {
                    userBalance = await userAccountStore.GetUserBalanceAsync( userId, accountType );
                }

                if (Convert.ToDecimal( investmentAmount ) > userBalance)
                {
                    // 2.1 If he has not, send failed response.
                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", 
                        JsonConvert.SerializeObject(
                                new ApiResponse(
                                    400,
                                    "Client Error",
                                    new object[] { new ErrorMessage( ErrorType.InsufficientFunds ) },
                                    new object[] { }
                                ),
                        Formatting.Indented )
                    );
                }
                else
                {
                    // TODO: Make a transaction (commit/rollover).
                    // 2.2 If he has enough: 
                    // Freeze balance needed for the transaction.
                    using (userAccountStore = new UserAccountStore())
                    {
                        int result = await userAccountStore.FreezeUserBalance( userId, accountType, Convert.ToDecimal( order.InvestmentAmount ) );
                    }
                    // 3. Get strike price from API and add it to the PlaceOrderDTO.
                    // 4. Insert new open order.
                    using (optionsStore = new OptionsStore())
                    {
                        int result = await optionsStore.OpenOrderAsync( order );
                    }

                    return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", "<Send success response>" );
                }
            }
            catch (Exception e)
            {
                // TODO: Error handling.
                Console.WriteLine( e );
                userAccountStore?.Dispose();
                optionsStore?.Dispose();
                return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", "<Send new Error message object>" );
            }
        }

        public async Task CheckOrder(string orderId)
        {

        }

        public async Task SyncOrders()
        {

        }

        public async Task CloseOrder(string orderId)
        {

        }
    }
}
