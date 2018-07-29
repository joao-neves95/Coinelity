CREATE TABLE dbo.ApplicationUser
(
	Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Email NVARCHAR(50) NOT NULL,
    EmailConfirmed BIT NOT NULL DEFAULT 0,
	Password NVARCHAR(150) NOT NULL,
    GoogleCode NVARCHAR(100) NULL,
    PhoneNumber NVARCHAR(40) NULL,
    PhoneNumberConfirmed BIT NOT NULL DEFAULT 0,
    TwoFactorEnabled BIT NOT NULL DEFAULT 0,
    LockoutEnabledEnabled BIT NOT NULL DEFAULT 0,
    LockoutEnd DATETIME NULL,
    IsAffiliate BIT NOT NULL DEFAULT 0,
    CreateDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)

GO;

CREATE INDEX idx_ApplicationUser_Email ON dbo.ApplicationUser (Email);
