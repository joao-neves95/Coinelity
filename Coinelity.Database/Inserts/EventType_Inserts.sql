﻿/*
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

INSERT INTO dbo.EventType (Id, Name)
VALUES 
    (1, 'Register'),
    (2, 'Login'),
    (3, 'Failed_Login'),
    (4, 'Password_Change'),
    (5, 'Email_Change'),
    (6, 'MaxLoginFailes_Change')
GO

SET IDENTITY_INSERT dbo.EventType OFF;
GO
