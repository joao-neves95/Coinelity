/*
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

CREATE TABLE dbo.ApplicationRole
(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(256) NOT NULL UNIQUE
)
GO

CREATE INDEX idx_ApplicationRole_Name ON dbo.ApplicationRole( Name );
GO
