CREATE TABLE dbo.ApplicationRole
(
    Id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(256) NOT NULL,
)

GO;

CREATE INDEX idx_ApplicationRole_Name ON dbo.ApplicationRole (Name);
