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
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.Hubs
{
    public class BinaryOptionsHub : Hub
    {
        public Task PlaceOrder(string placeOrderDTO)
        {
            try
            {
                PlaceOrderDTO order = JsonConvert.DeserializeObject<PlaceOrderDTO>( placeOrderDTO );
                // TODO: Add business logic here.
                return Clients.Caller.SendAsync( "ReceivePlaceOrderResponse", "<Send response>" );
            }
            catch (Exception e)
            {
                Console.WriteLine( e );
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
