﻿CREATE TABLE dbo.RedeemedPromoCode
(
    Id INT NOT NULL PRIMARY KEY,
    PromoCode_Id INT NOT NULL FOREIGN KEY REFERENCES PromoCede( Id ),
    User_Id INT NOT NUL FOREIGN KEY REFERENCES ApplicationUserAccount( Id ),
    RedeemTimestamp DATETIME NOT NULL DEFAULT GETUTCDATE()
)

