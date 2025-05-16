
# The Socks Box E-commerce Application

A modern e-commerce platform for selling socks, built with React for the frontend and Spring Boot for the backend.

## Project Structure

The project consists of two main parts:
- **Frontend**: A React application with TypeScript, Tailwind CSS, and Shadcn UI
- **Backend**: A Spring Boot application with Java 21, MySQL, and JWT authentication

## Prerequisites

- Node.js (v16+)
- Java 21
- MySQL 8.0+
- Maven

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure your MySQL database in `src/main/resources/application.properties`. Update the username and password:
   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

3. Build and run the backend:
   ```bash
   mvn clean package
   java -jar target/socks-box-backend-0.0.1-SNAPSHOT.jar
   ```
   Alternatively, you can run it directly with Maven:
   ```bash
   mvn spring-boot:run
   ```

4. The backend server will start on port 6969 with the base path `/api`.

### Frontend Setup

1. From the root directory, install dependencies:
   ```bash
   npm install
   ```

2. The `.env` file should already be configured to connect to the backend server. If needed, you can modify:
   ```
   VITE_API_URL=http://localhost:6969/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:8080`.

## Features

### Customer Features
- Browse products by categories and brands
- Search products with filters (price, category, brand)
- View product details with color and size options
- Add products to cart
- Manage cart (add, remove, update quantities)
- Create an account and log in
- Checkout process
- View order history and status

### Admin Features
- Dashboard with sales analytics
- Product management (add, edit, delete products)
- Order management (view, update status)
- Customer management
- Category and brand management

## API Endpoints

### Authentication
- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `GET /api/auth/user`: Get current user

### Products
- `GET /api/products`: Get all products or filter by criteria
- `GET /api/products/featured`: Get featured products
- `GET /api/products/{id}`: Get product by ID
- `POST /api/products`: Create new product (admin only)
- `PUT /api/products/{id}`: Update product (admin only)
- `DELETE /api/products/{id}`: Delete product (admin only)

### Categories and Brands
- `GET /api/categories`: Get all categories
- `GET /api/brands`: Get all brands
- `GET /api/brands/featured`: Get featured brands

### Cart
- `GET /api/cart`: Get user's cart
- `POST /api/cart`: Add item to cart
- `PUT /api/cart/items/{itemId}`: Update cart item quantity
- `DELETE /api/cart/items/{itemId}`: Remove item from cart
- `DELETE /api/cart`: Clear cart

### Orders
- `POST /api/orders`: Create order from cart
- `GET /api/orders`: Get user's orders
- `GET /api/orders/{id}`: Get order by ID

### Admin
- `GET /api/admin/customers`: Get all customers
- `GET /api/admin/orders`: Get all orders
- `PUT /api/admin/orders/{id}/status`: Update order status
- `GET /api/admin/analytics/sales`: Get sales analytics data
- `GET /api/admin/analytics/products`: Get product performance data
- `GET /api/admin/analytics/customers`: Get customer acquisition data

## Default Accounts

The system doesn't come with default accounts. You'll need to register as a new user. To create an admin account, you'll need to manually update the user role in the database:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query
- Axios
- React Hook Form
- Zod (for validation)
- Recharts (for analytics)

### Backend
- Spring Boot 3
- Java 21
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- Lombok
- Validation API

## License

This project is licensed under the MIT License.
