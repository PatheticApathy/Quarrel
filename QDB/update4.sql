ALTER TABLE User MODIFY COLUMN Profile_pic varchar(15000);
ALTER TABLE User ADD COLUMN Following_count INT not null;