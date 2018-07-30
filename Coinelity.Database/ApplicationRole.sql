CREATE TABLE dbo.ApplicationRole
(
    Id TINYINT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(256) NOT NULL UNIQUE
)
GO

CREATE INDEX idx_ApplicationRole_Name ON dbo.ApplicationRole( Name );
GO
