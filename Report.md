# 2560 Web Final Project Report - Online Shopping Store

<br>

### Group: FightCovid19

| Name              | Pitt ID |
| ----------------- | ------- |
| Shuo Tian         | sht107  |
| Yanru Li          | yal125  |
| Zhanghaoxiang Yin | zhy77   |
| Yuyan Li          | yul225  |

<br><br>

## Introduction

We build an online shopping store for shoes, which provide a platform to let consumers see all the products and vendors,
and to let sellers/ administrators to manage their products.

### High-level Features

#### Login System

Users should log in to view our website. If consumers don't have accounts, they should register first.
Administrators would have a different login interface and website interface from common users.
Moreover, personal information is only available to themselves.

#### Recommendation

On the homepage, we show the most popular shoes in the period of time.
Consumers could see pictures and prices of these shoes to decide if they want to follow the trend.

#### Browsing and Adding

Our website allows consumers to check all the information for shoes and brands we have.
Consumers could add/ delete shoes in the shopping cart. <br><br><br>

## Objective

We want to build a website that customers can use to discover the most trending sneakers and be able to purchase them. As
fashion is always changing, we want our website can be made not only an online shop but also as trends reference for customers.
By using our website, they will know what is the most popular sneakers this season and any information about those sneakers. Besides,
we want our website can let customers to buy any sneakers they like regardless of brand. Our website can save them time of tossing
between various brand website by providing all popular sneaker brands.<br>
<br>
By developing our application, we want to learn how to build a complete shopping website which includes user interface and
admin interface. As more and more people prefer using mobile phone nowadays, we want to create a website that can looks
properly both on the phone and computer so we will use different viewpoints to achieve this goal. Morever, We want our
website can let customers to register and login, as well as manage shopping cart and purchase items.
Therefore, we need to have form for customers' information that can be submitted to our database and HTML5 APIs to add, delete or
update data in our database. For the unexpected input, we also need to handle such errors.

<br><br><br>

## Team member’s contributions



#### Backend:

Shuo Tian, Zhanghaoxiang Yin

- We designed the Customer login, register page，Admin Customer login page
- We created the Commodity management pages which can add new products to website or delete existed products
- We created js in routes document to help frontend get information from database
- We created the shopping cart function and it also can calculate total price
- We connected to the database to store customer accounts and product information

#### Frontend:

Yanru Li, Yuyan Li

- We designed user interface includes navigation bar, cycling through images on the homepage, cards on the hompage, footer,
  tables on product and shopping cart page, and other opitmizations.
- We set up forms with username, email and password for users to register and login our website.
- We designed the different viewports based on different screen size including desktop, tablet and phone.
- We added some content on homepage to make it looks well-designed.<br><br><br>

## Technical Architecture


#### Backend:

express: Website infrastructure<br>
mongoose: Connect to mongoDb<br>
passport: Verify account information<br><br>
MVC

- Model: We analyzed the system objectives and extracted 4 basic data models: admin, user, product and vendor.
`admin` is used for administrator users.
`user` is used for normal customers to log in.
`product` defines the data frame for our products.
`vendor` records vendors' information.
- View: Different EJS template files are created to handle different data models based on information from the database.<br>
For example, every user can browse their cart in the same "Cart" page with their own cart data presented. 

- Controller: Javascript file serves as a controller between Model and View. The controller reads data from MongoDB and sends them <br>
to corresponding views.
In our application, the script creates and loads data from database and then passes them to relevant view templates. <br>
The templates then render corresponding Web pages with given data.

#### Frontend:

We use CSS and Bootstrap to optimize pages.
After adding the link from Bootstrap page, we could use it by adding class in different elements. <br><br><br>

## Challenges

Backend:

1. I used the library-'passport' and I built two tables in database(One stored costumers' account information. another stored administrators' account information).
   But I coundn't use these two tables at the same time, and I found in the passport.js, if I change the code `(const User = require('../models/User');)` to
   `(const User = require('../models/Admin');)`, then website can only use the admin's account data.
   I tried to create another passport2.js and one connect to costumers' account information, one to admin's. And then add code `(require('./config/passport2')(passport);)` in main js,
   then the login page can use both these two table's data, but that means costumers can login in to admin's page, that's unreasonable.

2. Since admin's login page do not use library-passport, so anyone can access to management page directly by website link.


<br><br><br>

## Future Work

In the future, we want to develop a query system,
which it could let users to query by entering specific keywords like id or name.
Moreover, we want to develop the filter system.
Then users could filter products by brand, name, color or price as them want.
Finally, we want to design a payment page to realize the full function of the shopping process.<br>

If we have more time, we want to connect SQL to realize the fearture of query. <br><br><br>

## Conclusion

After taking this course, we have learned a lot. We started from the basic skills like HTML, CSS and Javascript at the beginning.
Then we had the deeper understand for the framework like React and Bootstrap.
After all the frontend skills, we kept looking into backend skills like REST APIs and MongoDB.<br>
This course has a great learning process, it would lead us to think through every step，
and each class is related to each other, which is a continuous process.
We learned everything we want to design the webiste. <br><br><br>

## Resources

   1. https://assignment3b-sht107.glitch.me <br>
   Our assignment3b
   2. https://github.com/bradtraversy/node_passport_login <br>
   Login function model
  