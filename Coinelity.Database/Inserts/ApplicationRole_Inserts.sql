/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

SET IDENTITY_INSERT dbo.ApplicationRole ON;
GO

INSERT INTO dbo.ApplicationRole (Id, Name)
VALUES 
    (1, 'Admin'),
    (2, 'Trader')
GO

SET IDENTITY_INSERT dbo.ApplicationRole OFF;
GO
