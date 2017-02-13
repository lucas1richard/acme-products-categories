drop table if exists products;
drop table if exists categories;
drop table if exists productcategories;

create table products (
  id integer primary key autoincrement,
  name text not null unique
);

create table categories (
  id integer primary key autoincrement,
  name text not null unique
);

create table productcategories (
  id integer primary key autoincrement,
  productId integer,
  categoryId integer,
  foreign key (productId) references products(id),
  foreign key (categoryId) references categories(id)
);


insert into products (name) values ('Tennis Racket');
insert into products (name) values ('Baseball Bat');
insert into products (name) values ('Boxing Glove');
insert into products (name) values ('Screwdriver');
insert into products (name) values ('Hammer');
insert into products (name) values ('Wrench');

insert into categories (name) values ('Sport');
insert into categories (name) values ('Tool');

insert into productcategories (productId, categoryId) values (1, 1);
insert into productcategories (productId, categoryId) values (2, 1);
insert into productcategories (productId, categoryId) values (3, 1);
insert into productcategories (productId, categoryId) values (4, 2);
insert into productcategories (productId, categoryId) values (5, 2);
insert into productcategories (productId, categoryId) values (6, 2);
