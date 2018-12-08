/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.ApplicationUserSettings
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT UNIQUE NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser(Id),
    -- TODO: Add a default time zone.
    TimeZone NVARCHAR(50) NOT NULL,
    MaxLoginFailes TINYINT NOT NULL DEFAULT -1,
    TwoFactorEnabled BIT NOT NULL DEFAULT 0
)
GO

CREATE INDEX idx_ApplicationUserSettings_UserId ON dbo.ApplicationUserSettings( UserId );
GO
