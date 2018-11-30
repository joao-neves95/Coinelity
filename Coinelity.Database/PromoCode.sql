CREATE TABLE dbo.PromoCode
(
    Id INT NOT NULL PRIMARY KEY,
    User_Id INT NOT NULL FOREIGN KEY REFERENCES ApplicationUserAccount( Id ),
    PromoType_Id INT NOT NULL FOREIGN KEY REFERENCES PromoType( Id ),
    MaxRedeems INT NOT NULL CHECK (MaxRedeems > 0),
    RedeemCount INT DEFAULT 0,
    ExpirationTimeStamp DATETIME NULL,
    Value INT NULL

