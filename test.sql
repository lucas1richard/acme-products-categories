select * from products;
select * from categories;

insert into productcategories (productId, categoryId)
          select products.id, categories.id from products
          join categories on categories.id = 2
          where products.name = "jksnkjsnj";

select * from productcategories;
