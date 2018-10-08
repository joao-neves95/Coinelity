CREATE TABLE dbo.OptionLifetime
(
    Id INT NOT NULL PRIMARY KEY,
    LifetimeMinutes INT NOT NULL CHECK (LifetimeMinutes > 0)
)
