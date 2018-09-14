CREATE TABLE dbo.ApplicationUserSettings
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser(Id),
    MaxLoginFailes TINYINT NOT NULL DEFAULT 0,
    -- TODO: Add a default time zone.
    TimeZone NVARCHAR(50) NOT NULL,
    TwoFactorEnabled BIT NOT NULL DEFAULT 0,
    IsAffiliate BIT NOT NULL DEFAULT 0,
    LastUpdate DATETIME NOT NULL DEFAULT GETUTCDATE()
)
GO

CREATE INDEX idx_ApplicationUserSettings_UserId ON dbo.ApplicationUser( Id );
GO
