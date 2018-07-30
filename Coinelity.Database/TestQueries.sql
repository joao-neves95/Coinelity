--CREATE DATABASE CoinelityDB;  
--GO

--USE CoinelityDB;

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
