/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

CREATE TABLE dbo.OptionHistory
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    AssetId INT NOT NULL FOREIGN KEY REFERENCES dbo.Asset( Id ),
    IsRealBalance BIT NOT NULL,
    OperationTypeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OperationType( Id ),
    LifetimeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OptionLifetime( Id ),
    PayoutPercent TINYINT NOT NULL,
    StrikePrice DECIMAL(16,4) NOT NULL,
    InvestmentAmount FLOAT NOT NULL,
    OpenTimestamp DATETIME2 NOT NULL,
    CloseTimestamp DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ClosePrice DECIMAL(16,4) NOT NULL,
    ProfitLossFiat DECIMAL(16,4) NOT NULL,
)
GO

CREATE INDEX idx_OptionHistory_UserId ON dbo.OptionHistory( UserId );
GO

