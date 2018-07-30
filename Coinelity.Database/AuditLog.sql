﻿CREATE TABLE dbo.AuditLog
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.ApplicationUser( Id ),
    EventTypeId SMALLINT NOT NULL FOREIGN KEY REFERENCES dbo.EventType( Id ),
    LogDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UserIP NVARCHAR(15) NOT NULL
)
GO

CREATE INDEX idx_AuditLog_UserId ON dbo.ApplicationUser( Id );
GO
CREATE INDEX idx_AuditLog_EventTypeId ON dbo.EventType( Id );
GO