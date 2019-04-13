using System;
using System.Collections.Generic;
using System.Text;

namespace Coinelity.Core
{
    public class Freezable
    {
        #region PROPERTIES

        public static readonly string EXCEPTION_MESSAGE = "Field or property is fronzen and can not be changed anymore.";

        public bool IsFrozen { get; private set; }

        #endregion

        #region METHODS

        public void Freeze()
        {
            this.IsFrozen = true;
        }

        public InvalidOperationException ThrowFreezedException()
        {
            throw new InvalidOperationException( Freezable.EXCEPTION_MESSAGE );
        }

        #endregion
    }
}
