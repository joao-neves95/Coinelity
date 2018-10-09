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
