--CREATE DATABASE CoinelityDB;  
--GO

USE CoinelityDB;

SELECT *
FROM dbo.EventType;
GO

SELECT *
FROM dbo.ApplicationRole;
GO

SELECT *
FROM dbo.ApplicationUserRoles;
GO

SELECT *
FROM dbo.ApplicationUser;
GO

SELECT *
FROM dbo.AuditLog;
GO

-- DELETES:
DELETE TOP (10)
FROM dbo.ApplicationUserRoles;
GO
DELETE TOP (10)
FROM dbo.ApplicationUser;
GO
DELETE TOP (10)
FROM dbo.ApplicationUserSettings;
GO
DELETE TOP (10)
FROM dbo.ApplicationUserAccount;
GO
DELETE TOP (10)
FROM dbo.AuditLog;
--

SELECT dbo.ApplicationRole.Name AS RoleName
FROM dbo.ApplicationRole
    INNER JOIN dbo.ApplicationUserRoles
    ON dbo.ApplicationRole.Id = dbo.ApplicationUserRoles.RoleId
    WHERE dbo.ApplicationUserRoles.UserId = 4;

SELECT 1
FROM dbo.ApplicationUser
WHERE Email = 'joaopedro.neves@gmail.com';

-- Add admin role
-- INSERT INTO dbo.ApplicationUserRoles ()
-- VALUES ();
