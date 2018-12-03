/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.ApplicationUserAccount
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    RealBalance DECIMAL(16,4) NOT NULL DEFAULT 0.0,
    FreezedRealBalance DECIMAL(16,4) NOT NULL DEFAULT 0.0,
    CreditsBalance FLOAT(24) NOT NULL DEFAULT 0.0,
    FreezedCreditsBalance FLOAT(24) NOT NULL DEFAULT 0.0,
    PaperBalance DECIMAL(16,4) NOT NULL DEFAULT 0.0,
    FreezedPaperBalance DECIMAL(16,4) NOT NULL DEFAULT 0.0,
)
GO

CREATE INDEX idx_ApplicationUserAccount_UserId ON dbo.ApplicationUserAccount( UserId );
GO
