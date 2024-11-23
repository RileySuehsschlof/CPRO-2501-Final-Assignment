-- DELETE FROM product_entity and product_image to ensure that there are no duplicates;
DELETE FROM product_image;
DELETE FROM product_entity;


--populates the Product and image tables with data;

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (1, 'Basic Product 1', '99.99', '10.00', '50', 'Electronics', 'BasicProduct', 'This is the description for an electronics test');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (2, 'Basic Product 2', '59.99', '5.00', '30', 'Books', 'BasicProduct', 'This is the description for a book');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (3, 'Basic Product 3', '59.99', '5.00', '30', 'Books', 'BasicProduct', 'This is the description for a book 2');


INSERT INTO product_image (image_url, product_id)
VALUES ('images/minimalistic-tech-gadgets-on-white-surface.jpg', 1),
       ('images/418nuYu4o4L.jpg', 1);