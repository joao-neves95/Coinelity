CREATE TABLE dbo.ActiveOption
(
    OrderId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    AssetId INT NOT NULL FOREIGN KEY REFERENCES dbo.Asset( Id ),
    OperationTypeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OperationType( Id ),
    LifetimeId INT NOT NULL FOREIGN KEY REFERENCES dbo.OptionLifetime( Id ),
    PayoutPercent TINYINT NOT NULL CHECK (PayoutPercent > 0),
    StrikePrice DECIMAL(16,4) NOT NULL,
    InvestmentAmount FLOAT NOT NULL,
    OpenTimestamp DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME() CHECK (OpenTimestamp >= SYSUTCDATETIME())
)
GO

CREATE INDEX idx_OptionBook_UserId ON dbo.ActiveOption( UserId );
GO
