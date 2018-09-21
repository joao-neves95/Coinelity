/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

CREATE TABLE dbo.ApplicationUserRoles
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    RoleId TINYINT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationRole( Id ) DEFAULT 2
)
GO

CREATE INDEX idx_ApplicationUserRoles_UserId ON dbo.ApplicationUser( Id );
GO
CREATE INDEX idx_ApplicationUserRoles_RoleId ON dbo.ApplicationRole( Id );
GO
