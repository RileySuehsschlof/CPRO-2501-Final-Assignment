General E-commerce Website

A starting point for any online business with products.

All rights Reserved.

How to install and run our General E-commerce Website.
-clone or download the repo.
-unzip if you downloaded.
-in the command line run "npm i"
-in the Backend\demo\src\main\resources\application.properties change these lines and get rid of the "".

spring.datasource.url="url of your database"
spring.datasource.username="your username for your database"
spring.datasource.password="your password for that username"
jwt.secret-key="your jwt secret key"

ensure this is set this to create the first time you run the back end and then switch it to update.
spring.jpa.hibernate.ddl-auto=create
stripe.apiKey="replace this with your stripe api key"

