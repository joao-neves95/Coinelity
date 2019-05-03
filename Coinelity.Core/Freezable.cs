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
