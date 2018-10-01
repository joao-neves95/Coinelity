using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
// using Microsoft.AspNetCore.Mvc;

namespace Coinelity.AspServer.Hubs
{
    public class BinaryOptionsHub : Hub
    {
        public async Task PlaceOrder()
        {

        }

        public async Task CloseOrder(string orderId)
        {

        }
    }
}
