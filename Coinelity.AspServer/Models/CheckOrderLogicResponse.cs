using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Coinelity.AspServer.Enums;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.Models
{
    public class CheckOrderLogicResponse
    {
        public CheckOrderLogicResponse(CheckOrderLogicResult result, ActiveOptionJoined activeOption = null, ClosedOptionDTO closedOption = null)
        {
            this.Result = result;
            this.ActiveOption = activeOption == null ? new ActiveOptionJoined() : activeOption;
            this.ClosedOption = closedOption == null ? new ClosedOptionDTO( this.ActiveOption ) : closedOption;
        }

        public CheckOrderLogicResult Result { get; set; }

        public ActiveOptionJoined ActiveOption { get; set; }

        public ClosedOptionDTO ClosedOption { get; set; }
    }
}
