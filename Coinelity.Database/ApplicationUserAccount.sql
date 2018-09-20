/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

CREATE TABLE dbo.ApplicationUserAccount
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    RealBalance DECIMAL(16,4) NOT NULL DEFAULT 0.0,
    PaperBalance DECIMAL(16,4) NOT NULL DEFAULT 0.0,
    Points INT NOT NULL DEFAULT 0
)
GO

CREATE INDEX idx_ApplicationUserAccount_UserId ON dbo.ApplicationUser( Id );
GO
