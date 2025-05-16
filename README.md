
# The Socks Box E-commerce Application

This is a full-stack e-commerce application for selling socks online. The application consists of a React frontend and a Spring Boot backend.

## Project Structure

- `src/` - Frontend React application
- `backend/` - Spring Boot backend application

## Backend Setup (Spring Boot)

### Prerequisites

- Java 21 or later
- Maven
- MySQL 8.0

### Configuration

The backend configuration is in `backend/src/main/resources/application.properties`. You may need to update the database configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/socksbox?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=password
```

### Running the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend API will be available at `http://localhost:6969/api`.

## Frontend Setup (React)

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

### Configuration

The frontend configuration is in `.env` file:

```properties
VITE_API_URL=http://localhost:6969/api
```

### Running the Frontend

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Running the Complete Application

1. Start the MySQL database server
2. Start the backend server:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
3. In another terminal, start the frontend development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:3000`

## Authentication

The application uses JWT for authentication:

- Register a new account at `/register`
- Login with your credentials at `/login`
- Protected routes require a valid JWT token

## Features

- User registration and authentication
- Product browsing and filtering
- Shopping cart functionality
- Order placement and management
- Admin dashboard for managing products, orders, and users
- Responsive design for all devices

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/user` - Get current user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Get products by category

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID

### Brands

- `GET /api/brands` - Get all brands
- `GET /api/brands/featured` - Get featured brands
- `GET /api/brands/{id}` - Get brand by ID

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/items/{itemId}` - Update cart item quantity
- `DELETE /api/cart/items/{itemId}` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders

- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/{id}` - Get order by ID

### Admin

- `GET /api/admin/customers` - Get all customers (Admin only)
- `GET /api/admin/orders` - Get all orders (Admin only)
- `PUT /api/admin/orders/{id}/status` - Update order status (Admin only)
- `GET /api/admin/analytics/sales` - Get sales data (Admin only)
