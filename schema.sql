DROP TABLE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

DELETE FROM products;

CREATE TABLE products (
item_id INTEGER (10),
product_name VARCHAR (100) NULL,
department_name VARCHAR (100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INTEGER (10) NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

SELECT item_id, product_name, price FROM products;

UPDATE products
SET stock_quantity = 4
WHERE item_id=2;

SELECT * FROM products;

SELECT COUNT(stock_quantity), product_name, item_id, department_name FROM products
GROUP BY department_name
HAVING COUNT(stock_quantity) < 5

ALTER TABLE products
ADD COLUMN product_sales VARCHAR(15) NULL;

CREATE TABLE departments (
department_id VARCHAR (6) NULL,
department_name VARCHAR(100) NULL,
over_head_costs DECIMAL (10,2) NULL
);

SELECT * FROM departments;

ALTER TABLE departments
DROP COLUMN department_id;

ALTER TABLE departments
ADD COLUMN department_id INTEGER (15) NULL;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, (products.product_sales - departments.over_head_costs) AS total_profit
FROM departments LEFT JOIN products ON (departments.department_name = products.department_name)
ORDER BY departments.department_id

