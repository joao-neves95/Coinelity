CREATE TABLE dbo.ApplicationUserSettings
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser(Id),
    LastUpdate DATETIME NOT NULL DEFAULT GETUTCDATE(),
    TwoFactorEnabled BIT NOT NULL DEFAULT 0,
    MaxLoginFailes TINYINT NOT NULL DEFAULT 0,
    IsAffiliate BIT NOT NULL DEFAULT 0
)
GO

CREATE INDEX idx_ApplicationUserSettings_UserId ON dbo.ApplicationUser( Id );
GO
