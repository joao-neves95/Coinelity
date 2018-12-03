/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

CREATE TABLE dbo.OptionLifetime
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    LabelId INT NOT NULL FOREIGN KEY REFERENCES dbo.LifetimeLabel(Id),
    TimeMinutes INT NOT NULL UNIQUE CHECK (TimeMinutes > 0),
)
