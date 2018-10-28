/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

CREATE TABLE dbo.OptionLifetime
(
    Id INT NOT NULL PRIMARY KEY,
    LabelId INT NOT NULL FOREIGN KEY REFERENCES dbo.LifetimeLabel(Id),
    TimeMinutes INT NOT NULL CHECK (TimeMinutes > 0),
)
