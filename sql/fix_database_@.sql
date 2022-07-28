use blog;
ALTER TABLE blogs MODIFY COLUMN time_create datetime default CURRENT_TIMESTAMP ;
ALTER TABLE blogs MODIFY COLUMN time_update datetime default CURRENT_TIMESTAMP ;

alter table blogs add image VARCHAR(200);