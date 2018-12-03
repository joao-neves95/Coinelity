/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.OptionHistory
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    AssetId INT NOT NULL FOREIGN KEY REFERENCES dbo.Asset( Id ),
    -- IsRealBalance BIT NOT NULL,
    UserAccountTypeId TINYINT NOT NULL REFERENCES dbo.UserAccountType( Id ),
    OperationTypeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OperationType( Id ),
    LifetimeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OptionLifetime( Id ),
    StrikePrice DECIMAL(16,4) NOT NULL,
    InvestmentAmount FLOAT NOT NULL,
    OpenTimestamp DATETIME2 NOT NULL,
    CloseTimestamp DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    ClosePrice DECIMAL(16,4) NOT NULL,
    -- The payout percent is negative in case of a loss.
    -- It is not a foreign key because the value can change.
    PayoutPercent SMALLINT NOT NULL,
    ProfitLossFiat DECIMAL(16,4) NOT NULL,
)
GO

CREATE INDEX idx_OptionHistory_UserId ON dbo.OptionHistory( UserId );
GO

