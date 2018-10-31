/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.Asset
(
    Id INT NOT NULL PRIMARY KEY,
    Symbol VARCHAR(10) NOT NULL,
    ExchangeId INT NOT NULL FOREIGN KEY REFERENCES dbo.Exchange( Id ),
    FiatSymbol VARCHAR(20) NOT NULL,
    CryptoSymbol VARCHAR(20) NULL,
    LogoUrl VARCHAR(100) NULL,
)
GO

-- CREATE INDEX idx_Asset_Symbol ON dbo.Asset( Symbol );
-- GO
