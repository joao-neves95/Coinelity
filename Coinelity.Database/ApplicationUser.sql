CREATE TABLE dbo.ApplicationUser
(
	Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Email NVARCHAR(50) NOT NULL UNIQUE,
    NormalizedEmail NVARCHAR(50) NULL UNIQUE,
    EmailConfirmed BIT NOT NULL DEFAULT 0,
	Password NVARCHAR(150) NOT NULL,
    GoogleCode NVARCHAR(100) NULL DEFAULT '',
    PhoneNumber NVARCHAR(40) NULL UNIQUE DEFAULT '',
    PhoneNumberConfirmed BIT NOT NULL DEFAULT 0,
    LockoutEnabledEnabled BIT NOT NULL DEFAULT 0,
    LockoutEnd DATETIME NULL,
    CreateDate DATETIME NOT NULL DEFAULT GETUTCDATE()
)
GO

CREATE INDEX idx_ApplicationUser_Email ON dbo.ApplicationUser( Email );
GO
