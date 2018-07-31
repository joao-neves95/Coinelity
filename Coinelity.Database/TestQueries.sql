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

DELETE TOP (10)
FROM table

SELECT  

SELECT dbo.ApplicationRole.Name AS RoleName
FROM dbo.ApplicationRole
    INNER JOIN dbo.ApplicationUserRoles
    ON dbo.ApplicationRole.Id = dbo.ApplicationUserRoles.RoleId
    WHERE dbo.ApplicationUserRoles.UserId = 4;

SELECT 1
FROM dbo.ApplicationUser
WHERE Email = 'joaopedro.neves@gmail.com';
