/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

SET IDENTITY_INSERT dbo.EventType ON;
GO

INSERT INTO dbo.OperationType (Id, Name)
VALUES 
    (1, 'Call'),
    (2, 'Put'),
    (3, 'Long'),
    (4, 'Short')
GO

SET IDENTITY_INSERT dbo.EventType OFF;
GO
