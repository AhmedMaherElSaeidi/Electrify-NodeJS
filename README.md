# E-Commerce App Backend

## Overview

This is the backend for the e-commerce application. It provides RESTful APIs to manage users, products, carts, and orders. The backend is built with Node.js, Express, and Sequelize, and uses JWT for authentication and Multer for handling file uploads.

You can find frontend implementation [here](https://github.com/AhmedMaherElSaeidi/Electrify-ReactJS).

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

## Getting Started

### Prerequisites

- Node.js
- A relational database (e.g., MySQL)

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ecommerce-app.git
    cd ecommerce-app/backend
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
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
PORT=5000
