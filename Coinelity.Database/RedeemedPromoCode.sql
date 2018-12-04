/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.RedeemedPromoCode
(
    Id INT NOT NULL PRIMARY KEY,
    PromoCode_Id INT NOT NULL FOREIGN KEY REFERENCES PromoCode( Id ),
    User_Id INT NOT NULL FOREIGN KEY REFERENCES ApplicationUserAccount( Id ),
    RedeemTimestamp DATETIME NOT NULL DEFAULT GETUTCDATE()
)
