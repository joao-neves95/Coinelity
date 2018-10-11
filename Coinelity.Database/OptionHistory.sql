CREATE TABLE dbo.OptionHistory
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    AssetId INT NOT NULL FOREIGN KEY REFERENCES dbo.Asset( Id ),
    OperationTypeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OperationType( Id ),
    LifetimeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OptionLifetime( Id ),
    PayoutPercentId INT NOT NULL FOREIGN KEY REFERENCES dbo.OptionPayout( Id ),
    StrikePrice DECIMAL(16,4) NOT NULL,
    InvestmentAmount FLOAT NOT NULL,
    OpenTimestamp DATETIME2 NOT NULL,
    CloseTimestamp DATETIME2 NOT NULL,
    ClosePrice DECIMAL(16,4) NOT NULL,
    ProfitLossFiat DECIMAL(16,4) NOT NULL,
    ProfitLossPercent FLOAT NOT NULL
)
GO

CREATE INDEX idx_OptionHistory_UserId ON dbo.OptionHistory( UserId );
GO

