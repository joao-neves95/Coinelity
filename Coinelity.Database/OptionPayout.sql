/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

CREATE TABLE dbo.OptionPayout
(
    Id INT NOT NULL PRIMARY KEY,
    AssetId INT NOT NULL FOREIGN KEY REFERENCES dbo.Asset( Id ),
    LifetimeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OptionLifetime( Id ),
    Payout TINYINT NOT NULL
)
GO

CREATE INDEX idx_Payout_AssetId ON dbo.OptionPayout( AssetId );
GO
