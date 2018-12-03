/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.ApplicationUser
(
	Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Email NVARCHAR(50) NOT NULL UNIQUE,
    NormalizedEmail NVARCHAR(50) NULL UNIQUE,
    EmailConfirmed BIT NOT NULL DEFAULT 0,
	Password NVARCHAR(150) NOT NULL,
    GoogleCode NVARCHAR(100) NULL DEFAULT '',
    PhoneNumber NVARCHAR(40) NULL DEFAULT '',
    PhoneNumberConfirmed BIT NOT NULL DEFAULT 0,
    AffiliateCode NVARCHAR(50) NOT NULL,
    AffiliatedTo INT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    -- TODO: Add country, birth date, etc.
    FailedLogins TINYINT NOT NULL DEFAULT 0,
    LockoutEnabledEnabled BIT NOT NULL DEFAULT 0,
    LockoutEnd DATETIME NULL,
    CreateDate DATETIME NOT NULL DEFAULT GETUTCDATE(),
    LastLogin DATETIME NOT NULL DEFAULT GETUTCDATE()
)
GO

CREATE INDEX idx_ApplicationUser_Email ON dbo.ApplicationUser( Email );
GO

CREATE INDEX idx_ApplicationUser_AffiliateCode ON dbo.ApplicationUser( AffiliateCode );
GO
