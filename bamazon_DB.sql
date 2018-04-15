DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;



CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NULL,
  stock_qty INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department, price, stock_qty)
VALUES("Samsung TV", "Electronics", 300, 50),
("Play Station 4", "Electronics", 200, 15),
("Lazy Boy Recliner", "Furniture", 375, 7),
("Bar Stool", "Furniture", 60, 23),
("Makita Air Compressor", "Tools", 450, 3),
("Dewalt Drill", "Tools", 98, 25),
("Air Jordans", "Apparel", 85, 12),
("Leather Jacket", "Apparel", 70, 20),
("Fishing Pole", "Camping/Outdoors", 50, 10),
("Coleman Tent", "Camping/Outdoors",120 , 28);

SELECT * FROM products;
