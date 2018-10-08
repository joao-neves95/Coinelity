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
