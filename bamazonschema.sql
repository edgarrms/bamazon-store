DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_id VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (id),
	KEY 'department_id' ('department_id')
    );