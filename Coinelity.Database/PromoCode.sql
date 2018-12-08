/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.PromoCode
(
    Id INT NOT NULL PRIMARY KEY,
    Code NVARCHAR(100) UNIQUE NOT NULL,
    UserId INT NOT NULL FOREIGN KEY REFERENCES ApplicationUserAccount( Id ),
    MaxRedeems INT NULL CHECK (MaxRedeems > 0 OR MaxRedeems IS NULL),
    RedeemCount INT DEFAULT 0,
    ExpirationTimestamp DATETIME NULL,
    CreditsValue INT NULL,
    CONSTRAINT chk_PromoCode_notNull CHECK ( MaxRedeems IS NOT NULL OR ExpirationTimestamp IS NOT NULL )
)
