ALTER TABLE User RENAME COLUMN Name TO Bio;
ALTER TABLE User ADD COLUMN Profile_pic varchar(500);
ALTER TABLE User ADD COLUMN Following_count INT not null;