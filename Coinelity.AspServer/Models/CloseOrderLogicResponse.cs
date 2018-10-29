using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coinelity.AspServer.Models
{
    public class CloseOrderLogicResponse
    {
        public CloseOrderLogicResponse(bool success, ActiveOptionJoined activeOption = null, ClosedOptionDTO closedOption = null)
        {
            this.Success = success;
            this.ActiveOption = activeOption == null ? new ActiveOptionJoined() : activeOption;
            this.ClosedOption = closedOption == null ? new ClosedOptionDTO( this.ActiveOption ) : closedOption;
        }

        public bool Success { get; set; }

        public ActiveOptionJoined ActiveOption { get; set; }

        public ClosedOptionDTO ClosedOption { get; set; }
    }
}
