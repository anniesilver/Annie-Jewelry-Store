# Project Title
ANNIE'S JEWLERY STORE
## Overview

it's an online jewelry shop of own branded jewelry

### Problem

I have been doing online jewelry retail business for many year. Currently I don't have a independant website for this business.
I used third-party plateform like wix and shopify , they were good but not that easy to do personalization,say if i want to lauch some special marketing program,
it's very difficult to do some function for it.
I also sell on amazon, So develop a website of my own , it will have better chance to interating my sale with my amzazon store in the future 

### User Profile
Almost every adult have chance to buy jewelry, either for themselves or as gift for their friends, lovers, families, classmate etc.
Let users easy find what they like ,show them quality pictures of products and detail information, promote strategy can be implemented in my website too.

### Features
| feature   |
| ------------- | 
| Product collection browse , sorting by different criteria|
| Product detail viewing  |
| add products to shopping cart ,modify cart|
| checkout and pay with creditcard , placing order  |
| user sign up and login auth |
| Search products by keywords  |

## Implementation

### Tech Stack
| key point    | Tech Stack  |
| -------------|------------ | 
| FRONT END | React | 
| Styling | SASS | 
| Multi device| Responsive Desgin | 
| BACK END  | Node.js | 
| REST API  | express  |  
| Authentication & Authorization  | JWT  |  
| SQL | Knex|
| DATABASE | MYSQL | 


### APIs
NEED TO BUILD MY OWN API

### Sitemap
1. Homepage
2. Collection Pages  
3. Search
4. Product Detail
5. Floating Cart
6. View Shopping Cart
7. Checkout
8. Sign up
9. Login



### Mockups

![home page](/src/assets/readme/home.jpg)
![collection page](/src/assets/readme/category.jpg)
![floating cart layer](/src/assets/readme/floating-cart.jpg)
![product page](/src/assets/readme/product.jpg)
![shopping cart page](/src/assets/readme/shoppingcart.jpg)
![sgin up page](/src/assets/readme/signup.jpg)
![login in page](/src/assets/readme/login.jpg)
![check out page](/src/assets/readme/checkout.jpg)


### Data

![Database Design](/src/assets/readme/database.png)

### Endpoints
--------------------------------------------------------------------
```
GET /products/li
returns a list of proudcts which contains limit number of product
contains only information for snapshot productcard
repoonse sample 
[
    {
    "id": "16"，
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，
    "main_img":"200901041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
    },
]
```
--------------------------------------------------------------------
```
GET /proudcts/:sku
returns a detail data object for one product identified by the sku
response sample
{
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，    
    "main_img":"200901041113-main.jpg",
    "other_img":["200901041113-1.jpg"，"200901041113-2.jpg"],
    "price":199.99,
    "discount_price":169.99,
    "description":"this product is build with Akoya sea cultured pearl and 18K Gold. The pearl size around 5mm in dirameters."
    "bullet_point":["pearl size 8mm","18kGold crafted","good gift"],    
    "category_id",2
    "collection_id", 2
    "sold":20,
    "stock":5
}
```
--------------------------------------------------------------------
```
GET /proudcts/ts/:limit
returns a list of most sold products. if limit =0 then return all products ordered by sold number desc, if limit >0 then return limit items.
response sample
[
    {
    "id": "16"，
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，
    "main_img":"200901041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
    },
    {
    "id": "12"，
    "sku": "201101041113"，
    "name":"silver earstuds”，
    "main_img":"201101041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
}
]

```
--------------------------------------------------------------------
```
GET /proudcts/cl/:collection_id
returns a list of a collection_id specified collection of products 
response sample
[
    {
    "id": "16"，
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，
    "main_img":"200901041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
    },
    {
    "id": "12"，
    "sku": "201101041113"，
    "name":"silver earstuds”，
    "main_img":"201101041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
}
]
```
--------------------------------------------------------------------
```
GET /search
returns a list  of products by query with a keywords list.
request parmas
{
["pearl","necklace"]
}
response sample
[
    {
    "id": "16"，
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，
    "main_img":"200901041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
    },
    {
    "id": "12"，
    "sku": "201101041113"，
    "name":"silver earstuds”，
    "main_img":"201101041113-main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99,
}
]
```
--------------------------------------------------------------------
```
POST /signup
return a sucess code and token with coded firstname and user_id.
post with user info and password ,
Post body example
{
    "email": "ann@gmail.com",
    "firstname": "Annie",
    "lastname":"Yang",
    "password":"111111"
}            
response body example
{
    "success": true,
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbm5pZSIsInVzZXJfaWQiOjEsImlhdCI6MTcwODgxNzE2NX0.BbD2F7DpcegKvg2MpxqOYerU7mQ6xBb5n27beHgLVHY"
}
```
--------------------------------------------------------------------
```
GET /login
returns a token if email password conbination match with database
else, return 403 error, and empty token.
request body
{
    email:"ann@gmail.com",
    password:"111111"
}
response body example:
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbm5pZSIsInVzZXJfaWQiOjEsImlhdCI6MTcwODgxNzE2NX0.BbD2F7DpcegKvg2MpxqOYerU7mQ6xBb5n27beHgLVHY"
}
```
--------------------------------------------------------------------
```
POST /orders
post with  Authorization:Token in Header, and a list of purchase products.
return 
POST header include token and keys paypal gateway needed.
POST header sample
{
    headers: {
              "Content-Type": "application/json",
              "Authorization" :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbm5pZSIsInVzZXJfaWQiOjEsImlhdCI6MTcwODgxNzE2NX0.BbD2F7DpcegKvg2MpxqOYerU7mQ6xBb5n27beHgLVHY",              
              "PayPal-Partner-Attribution-Id": "BN-CODE",
              "PayPal-Auth-Assertion": "PAYPAL-AUTH-ASSERTION"
            }     
}
post body will include a full list of prodcut in shopping cart
post body sample
{
[
  {
    id: 55,
    name: 'Rhodium plated Sterling Silver with Pink Opal Rose and Tourmaline Pendant Necklace 18"',
    description: null,
    price: '99.99',
    discount_price: null,
    category_id: 1,
    main_img: 'JY2015012303-main.jpg',
    sku: 'JY2015012303',
    other_img: [
      'JY2015012303-1.jpg',
      'JY2015012303-2.jpg',
      'JY2015012303-3.jpg',
      'JY2015012303-4.jpg'
    ],
    bullet_point: [
      'Featured with 100% Genuine Opal and Pink Tourmaline',
      'Pendant and Chain are both crafted in 925 sterling silver, finely polished and plated with thick rhodium',
      'Pendant Size W12mm x L21mm x H9mm,Weight: around 2.6g,Chain length:18"',
      `Package includes:1 x Pendant,1 x Chain,1 x Silver/Gold Polishing Cloth，1x Cotton Drawstring bag,  1 x branded gift box printed with Brand Name"ANNIE'S")`,
      'A great choice of gift for yourself,lovers,families and friends. It goes with daily wearing such as in office/school also other occasions such as party,dating,wedding etc. '
    ],
    collection_id: 1,
    sold: 0,
    stock: 0,
    qty: 1
  }
]
}
return the whole JSON package(which includes the orderID created) received from paypal payment gateway. package detail refers to paypal standard integration document.
```
--------------------------------------------------------------------
### Auth

using JWT for Authentication & Authorization

## Roadmap

### Client

| SPRINT | functions | time schedule|
|----------|----------|----------|
| sprint-1 | build structure, route,header and footer | 2 days |
| sprint-2 | component:product card, product page, product list page, floating cart and cart page, checkout page | 4 days |
| sprint-3 | connect with SERVER  QURERY DATA / POST DATA (placing order) USER SIGN UP/LOGIN | 3 days |
| sprint-4 | search page, fix layout and bug | 3 days |

### Server
| SPRINT | functions | time schedule|
|----------|----------|----------|
| sprint-1 | build up database schema and seed data | 3 days |
| sprint-2 | build API Endpoints | 4 days |
| sprint-3 | fix bug | 2 days |


## Nice-to-haves
### website features
1. My Account  
2. Order History  
3. Product Comment  

### admin features
1. add new products  
2. browse orders, update order status  
3. handle return / refund
