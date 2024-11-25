-- DELETE FROM product_entity and product_image to ensure that there are no duplicates;
DELETE FROM product_image;
DELETE FROM product_entity;


--populates the Product and image tables with data;



INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (1, 'Drill', '49.99', '5.00', '50', 'Tools', 'BasicProduct', 'This is a powerful electric drill suitable for home improvement and construction projects.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (2, 'Frisbee', '9.99', '1.00', '100', 'Sports', 'BasicProduct', 'A lightweight and durable frisbee for outdoor fun and competitive games.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (3, 'Ketchup', '2.49', '0.50', '200', 'Food', 'BasicProduct', 'A classic tomato ketchup perfect for burgers, fries, and other snacks.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (4, 'Mustard', '1.99', '0.30', '150', 'Food', 'BasicProduct', 'Tangy and smooth mustard, ideal for hot dogs, sandwiches, and more.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (5, 'Pencil', '0.99', '0.10', '500', 'Stationery', 'BasicProduct', 'A high-quality wood pencil, perfect for writing, sketching, or drawing.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (6, 'Punch', '3.99', '0.50', '75', 'Beverages', 'BasicProduct', 'A refreshing fruit punch, ideal for parties, picnics, and gatherings.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (7, 'Ranch', '2.79', '0.40', '120', 'Food', 'BasicProduct', 'Creamy and tangy ranch dressing, perfect for salads, veggies, and dipping.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (8, 'Screwdriver', '8.99', '1.00', '60', 'Tools', 'BasicProduct', 'A reliable and durable screwdriver for tightening screws and assembly work.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (9, 'Sharpener', '1.49', '0.20', '200', 'Stationery', 'BasicProduct', 'A handy pencil sharpener for keeping your writing instruments in perfect condition.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (10, 'Shawl 1', '19.99', '3.00', '40', 'Apparel', 'BasicProduct', 'A soft and cozy shawl made of wool, perfect for chilly evenings.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (11, 'Shawl 2', '19.99', '3.00', '40', 'Apparel', 'BasicProduct', 'A stylish and warm shawl made from high-quality fabric.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (12, 'Shawl 3', '19.99', '3.00', '40', 'Apparel', 'BasicProduct', 'A comfortable and elegant shawl for all seasons.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (13, 'Shawl 4', '19.99', '3.00', '40', 'Apparel', 'BasicProduct', 'A versatile shawl that adds a touch of sophistication to any outfit.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (14, 'Soccerball', '15.99', '2.00', '150', 'Sports', 'BasicProduct', 'A durable soccer ball designed for outdoor and indoor games, perfect for practice or competition.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (15, 'Studfinder', '12.99', '1.50', '85', 'Tools', 'BasicProduct', 'A handy stud finder for locating studs and beams behind walls, perfect for hanging heavy objects.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (16, 'Volleyball', '9.99', '1.00', '200', 'Sports', 'BasicProduct', 'A high-quality volleyball, great for both recreational play and competitive matches.');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (17, 'Basic Product 1', '99.99', '10.00', '50', 'Electronics', 'BasicProduct', 'This is the description for an electronics test');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (18, 'Basic Product 2', '59.99', '5.00', '30', 'Books', 'BasicProduct', 'This is the description for a book');

INSERT INTO product_entity (id, product_name, price, discount, quantity, category, product_type, description)
VALUES (19, 'Basic Product 3', '59.99', '5.00', '30', 'Books', 'BasicProduct', 'This is the description for a book 2');



INSERT INTO product_image (image_url, product_id)
VALUES ('images/drill1.jpg', 1),
('images/drill2.jpg', 1),
       ('images/drill3.jpg', 1);

INSERT INTO product_image (image_url, product_id)
VALUES ('images/frisbee1.jpg', 2),
('images/frisbee2.jpg', 2),
       ('images/frisbee3.jpg', 2);

       INSERT INTO product_image (image_url, product_id)
VALUES ('images/ketchup1.jpg', 3),
('images/ketchup2.jpg', 3),
       ('images/ketchup3.jpg', 3);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/mustard1.jpg', 4),
('images/mustard2.jpg', 4),
       ('images/mustard3.jpg', 4);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/pencil1.jpg', 5),
('images/pencil2.jpg', 5),
       ('images/pencil3.jpg', 5);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/punch1.jpg', 6),
('images/punch2.jpg', 6),
       ('images/punch3.jpg', 6);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/ranch1.jpg', 7),
('images/ranch2.jpg', 7),
       ('images/ranch3.jpg', 7);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/screwdriver1.jpg', 8),
('images/screwdriver2.jpg', 8),
       ('images/screwdriver3.jpg', 8);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/sharpner1.jpg', 9),
('images/sharpner2.jpg', 9),
       ('images/sharpner3.jpg', 9);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/shawl1.1.jpg', 10),
('images/shawl1.2.jpg', 10),
       ('images/shawl1.3.jpg', 10);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/shawl2.1.jpg', 11),
('images/shawl2.2.jpg', 11),
('images/shawl2.jpg', 11),
       ('images/shawl2.3.jpg', 11);
       INSERT INTO product_image (image_url, product_id)
VALUES ('images/shawl3.jpg', 12),
('images/shawl3.1.jpg', 12),
('images/shawl3.2.jpg', 12);

       INSERT INTO product_image (image_url, product_id)
VALUES ('images/shawl4.jpg', 13),
('images/shawl4.1.jpg', 13),
('images/shawl4.2.jpg', 13),
('images/shawl4.3.jpg', 13);

       INSERT INTO product_image (image_url, product_id)
VALUES ('images/soccerball1.jpg', 14),
('images/soccerball2.jpg', 14),
('images/soccerball3.jpg', 14);

       INSERT INTO product_image (image_url, product_id)
VALUES ('images/studfinder1.jpg', 15),
('images/studfinder2.jpg', 15),
('images/studfinder3.jpg', 15);

       INSERT INTO product_image (image_url, product_id)
VALUES ('images/volleyball1.jpg', 16),
('images/volleyball2.jpg', 16),
('images/volleyball3.jpg', 16);
