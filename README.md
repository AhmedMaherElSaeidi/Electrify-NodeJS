# E-Commerce App Backend

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
   - [User Management](#user-management)
   - [Product Management](#product-management)
   - [Cart Management](#cart-management)
   - [Order Management](#order-management)
   - [File Handling](#file-handling)
   - [Validation and Security](#validation-and-security)
   - [Development Tools](#development-tools)
4. [APIs](#apis)
   - [Auth](#auth)
   - [Categories](#categories)
   - [Carts](#carts)
   - [Cart Items](#cart-items)
   - [Products](#products)
   - [Users](#users)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Setup](#setup)
6. [Environment Variables](#environment-variables)


## Overview

This is the backend for the e-commerce application. It provides RESTful APIs to manage users, products, carts, and orders. The backend is built with Node.js, Express, and Sequelize, and uses JWT for authentication and Multer for handling file uploads.

You can find the frontend implementation [here](https://github.com/AhmedMaherElSaeidi/Electrify-ReactJS).

## Tech Stack

- **Node.js**: JavaScript runtime for server-side applications.
- **Express**: Web framework for building APIs.
- **Sequelize**: ORM for relational databases.
- **JWT**: JSON Web Tokens for authentication.
- **Multer**: Middleware for handling file uploads.
- **Joi**: Data validation library.
- **bcrypt**: Library for hashing passwords.
- **Nodemon**: Tool for automatically restarting the server during development.

## Features

### User Management
- **Registration**: Allows users to create an account with email, password, and other details. Passwords are hashed for security.
- **Login**: Users can log in using their credentials and receive a JWT for authentication.
- **Profile Management**: Users can update their profile information, including their username, name, telephone number, and profile image.

### Product Management
- **Product CRUD Operations**: 
  - **Create**: Add new products to the catalog.
  - **Read**: Retrieve product details and lists.
  - **Update**: Modify product details, including name, price, stock, and description.
  - **Delete**: Remove products from the catalog.
- **Category Management**: Products can be categorized and assigned to specific categories for better organization.

### Cart Management
- **Cart Operations**:
  - **Create Cart**: Initialize a new cart for the user.
  - **Add Items**: Add products to the cart with specified quantities.
  - **Update Cart**: Modify the contents or status of the cart.
  - **Manage Cart Status**: Change cart status to pending, delivered, or canceled.

### Order Management
- **Order Processing**:
  - **Place Order**: Convert the cart into an order with delivery location and other details.
  - **Order Status**: Update and track the status of orders (pending, delivered, canceled).

### File Handling
- **Image Uploads**: Users can upload product images using Multer middleware.

### Validation and Security
- **Data Validation**: Validate user inputs and request data using Joi to ensure data integrity and prevent invalid inputs.
- **Password Security**: Secure user passwords using bcrypt for hashing.

### Development Tools
- **Nodemon**: Automatically restarts the server during development when code changes are detected.

## APIs

### Auth

- Login
  - **Method**: POST
  - **URL**: `{{baseUrl}}/api/auth/login`
  - **Body**:
    - `username`
    - `password`

### Categories

- Get All Categories
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/categories`
  - **Header**: `x-auth-token: <token>`

- Get Category by ID
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/categories/:id`
  - **Header**: `x-auth-token: <token>`

- Create Category
  - **Method**: POST
  - **URL**: `{{baseUrl}}/api/categories`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `name`

- Update Category
  - **Method**: PUT
  - **URL**: `{{baseUrl}}/api/categories/:id`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `name`:

- Delete Category
  - **Method**: DELETE
  - **URL**: `{{baseUrl}}/api/categories/:id`
  - **Header**: `x-auth-token: <token>`

### Carts

- Get All Carts
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/carts`
  - **Header**: `x-auth-token: <token>`

- Get Cart by ID
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/carts/:id`
  - **Header**: `x-auth-token: <token>`

- Get User Carts
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/carts/user_carts/:id`
  - **Header**: `x-auth-token: <token>`

- Create Cart
  - **Method**: POST
  - **URL**: `{{baseUrl}}/api/carts`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `location`
    - `user_id`
    - `status`

- Update Cart
  - **Method**: PUT
  - **URL**: `{{baseUrl}}/api/carts/:id`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `location`
    - `user_id`
    - `status`

- Delete Cart
  - **Method**: DELETE
  - **URL**: `{{baseUrl}}/api/carts/:id`
  - **Header**: `x-auth-token: <token>`

### Cart Items

- Get All Cart Items
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/cartItems`
  - **Header**: `x-auth-token: <token>`

- Get Cart Item by ID
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/cartItems/:id`
  - **Header**: `x-auth-token: <token>`

- Get Specific Cart Item by CartID, and productID
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/cartItems/:cart_id/:product:id`
  - **Header**: `x-auth-token: <token>`

- Create Cart Item
  - **Method**: POST
  - **URL**: `{{baseUrl}}/api/cartItems`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `quantity`
    - `cart_id`
    - `product_id`

- Update Cart Item
  - **Method**: PUT
  - **URL**: `{{baseUrl}}/api/cartItems/:id`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `quantity`
    - `cart_id`
    - `product_id`

- Delete Cart Item
  - **Method**: DELETE
  - **URL**: `{{baseUrl}}/api/cartItems/:id`
  - **Header**: `x-auth-token: <token>`

### Products

- Get All Products
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/products`
  - **Header**: `x-auth-token: <token>`

- Get Product by ID
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/products/:id`
  - **Header**: `x-auth-token: <token>`

- Create Product
  - **Method**: POST
  - **URL**: `{{baseUrl}}/api/products`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `name`: personal computer
    - `price`: 1500.6
    - `stock`: 10
    - `description`: hello there
    - `category_id`: 2
    - `image`: no-image

- Update Product
  - **Method**: PUT
  - **URL**: `{{baseUrl}}/api/products/:id`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `name`: mobile
    - `price`: 200
    - `stock`: 15
    - `description`: hi
    - `category_id`: 3
    - `image`: image-link

- Delete Product
  - **Method**: DELETE
  - **URL**: `{{baseUrl}}/api/products/:id`
  - **Header**: `x-auth-token: <token>`

### Users

- Get All Users
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/users`
  - **Header**: `x-auth-token: <token>`

- Get User by ID
  - **Method**: GET
  - **URL**: `{{baseUrl}}/api/users/:id`
  - **Header**: `x-auth-token: <token>`

- Create User
  - **Method**: POST
  - **URL**: `{{baseUrl}}/api/users`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `fname`
    - `lname`
    - `username`
    - `password`
    - `telephone`
    - `gender`
    - `image`

- Update User
  - **Method**: PUT
  - **URL**: `{{baseUrl}}/api/users/:id`
  - **Header**: `x-auth-token: <token>`
  - **Body**:
    - `fname`
    - `lname`
    - `username`
    - `password`
    - `telephone`
    - `gender`
    - `image`

- Delete User
  - **Method**: DELETE
  - **URL**: `{{baseUrl}}/api/users/:id`
  - **Header**: `x-auth-token: <token>`

## Getting Started

### Prerequisites

- Node.js
- A relational database (e.g., MySQL)

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AhmedMaherElSaeidi/Electrify-NodeJS.git
    cd Electrify-NodeJS
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**: 
   - Create a `.env` file in the root directory.
   - Set up your database connection and JWT secret in the `.env` file.

5. **Start the server**:
   - In development
        ```bash
        npm run dev
        ```
   - In production
        ```bash
        npm start
        ```

### Environment Variables

Ensure you have the following variables set in your `.env` file:

```plaintext
HOST="localhost"
PORT=3600
DB_NAME="electrifydb"
DB_DIALECT= "mysql"
DB_USERNAME="root"
DB_PASSWORD=""
DB_PORT=3306
JWT_KEY="5BD24DCB1483578373DD86A7AD35F"
