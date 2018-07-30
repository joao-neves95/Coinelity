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
