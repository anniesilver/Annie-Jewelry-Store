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
| Product detail viewing and comments  |
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
| SQL | Knex|
| DATABASE | MYSQL | 


### APIs
NEED TO BUILD MY OWN API

### Sitemap

1.Homepage  
2.Collection Pages
3.Search
4.Product Detail 
5.Floating Cart
7.View Shopping Cart  
8.Checkout  
9.Sign up  
10.Login

### Mockups

![home page](/src/assets/readme/home.jpg)
![collection page](/srcassets/readme/category.jpg)
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
GET /products
returns a list of proudcts which contains limit number of product
contains only information for snapshot productcard
repoonse sample 
[
    {
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，
    "main_img":"/images/sku.main.jpg",
    "other_img":["sku.01.jpg","sku.02.jpg","sku.03.jpg"]
    "price":199.99
    "sold":20,
    "discount_price":169.99,
    "bullet_point:["sell poin 1","sell point 2"]
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
    "title":"18K Gold Akoya Pearl earstuds”，    
    "main_img":"/images/sku.main.jpg",
    "other_img":["sku.01.jpg"，"sku.02.jpg"],
    "price":199.99,
    "description":"this product is build with Akoya sea cultured pearl and 18K Gold. The pearl size around 5mm in dirameters."
    "category":["pearl","18kGold"],
    "comments":[
        {
            "id":"1ab6d9f6-da38-456e-9b09-ab0acd9ce818",
            "name":"Jessie",            
            "comment":"this is a very beautiful pearl",
            "timestamp":"1545162149000"
        },
    ],
    "sales":20,
    "stock":5
}
```
--------------------------------------------------------------------
```
POST /product/:sku/comment
:sku must be swapped out with the sku of a product as found in proudctlist
Creates a new comment for a specific product
Post body example
{
    "name": "Nigel",
    "comment": "This is a test"
}            
response body example
{
    "name": "Nigel",
    "comment": "This is a test",
    "id": 1ab6d9f6-da38-456e-9b09-ab0acd9ce8184,
    "timestamp": 1531857374673        
}
```
--------------------------------------------------------------------
```
POST /orders
Creates a new order 
post array of object list of product_id and qty.
Post body example
{
    "user_id": 1,
    "products": [{product_id_1,2}, {product_id_2,3}];
}            
response body example
{
    "order_id": order_id
}
```
--------------------------------------------------------------------
```
GET /orders/:userId/:orderId
returns one order belongs to userId
reponse sample        
    {
        "id":"1ab6d9f6-da38-456e-9b09-ab0acd9ce818"
        "total":99.99;
        "timestamp":1531857374673,
        "proudct":[
            {
                "sku": 2012020410009,
                "title":"8mm pearl sterling silver pendant",
                "image":"/images/sku.main.jpg",
                "price":99.99,
                "quantity":1
            },
            {
                "sku": 2015091410003,
                "title":"sterling silver earstud",
                "image":"/images/sku.main.jpg",
                "price":19.99,
                "quantity":1
            }
        ]
    }
```
--------------------------------------------------------------------
```
GET /orders/:userId
returns a list of all orders belongs to this user identified by userid
reponse sample
[
    {
        "id":"1ab6d9f6-da38-456e-9b09-ab0acd9ce818"
        "total":99.99;
        "timestamp":1545162149000
        "proudct":[
            {
                "sku": 2012020410009,
                "title":"8mm pearl sterling silver pendant",
                "image":"/images/sku.main.jpg",
                "price":99.99,
                "quantity":1
            },
            {
                "sku": 2015091410003,
                "title":"sterling silver earstud",
                "image":"/images/sku.main.jpg",
                "price":19.99,
                "quantity":1
            }
        ]
    }
]
```
--------------------------------------------------------------------
### Auth

Will use Auth for user sign up and login

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

### admin features
1. add new products  
2. browse orders, update order status  
3. handle return / refund
