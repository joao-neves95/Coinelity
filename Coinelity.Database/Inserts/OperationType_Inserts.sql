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
