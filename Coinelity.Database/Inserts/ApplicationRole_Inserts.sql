SET IDENTITY_INSERT dbo.ApplicationRole ON;
GO

INSERT INTO dbo.ApplicationRole (Id, Name)
VALUES 
    (1, 'Admin'),
    (2, 'Trader')
GO

SET IDENTITY_INSERT dbo.ApplicationRole OFF;
GO
