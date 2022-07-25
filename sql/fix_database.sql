use blog;

insert into roles (name) values ('admin'),('user');
insert into users (Username, Password, PhoneNumber, Email, Address, role_id) values
                ('admin','12345678','0123456789','admin@gmail.com','ha noi',3);
alter table users modify role_id int not null default 4;