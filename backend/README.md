
# The Socks Box - Backend API

A complete Spring Boot backend for The Socks Box e-commerce application built with Java 21.

## Features

- **Authentication & Authorization**: JWT-based security with role-based access control
- **User Management**: Customer and admin user management
- **Product Management**: Full CRUD operations for products, categories, and brands
- **Shopping Cart**: Persistent cart functionality with user association
- **Order Management**: Order creation, tracking, and status updates
- **Analytics**: Sales analytics and performance metrics
- **Data Validation**: Comprehensive input validation
- **Exception Handling**: Global exception handling with meaningful error messages

## Technology Stack

- **Java 21**
- **Spring Boot 3.2.5**
- **Spring Security 6** with JWT
- **Spring Data JPA**
- **H2 Database** (for development)
- **MySQL** (for production)
- **Lombok** for reducing boilerplate code
- **Maven** for dependency management

## Getting Started

### Prerequisites

- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+ (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:6969/api`

### Database Configuration

#### Development (H2 Database)
The application is configured to use H2 in-memory database for development:
- **URL**: `http://localhost:6969/api/h2-console`
- **Username**: `sa`
- **Password**: `password`

#### Production (MySQL)
To use MySQL, update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/socksbox?createDatabaseIfNotExist=true
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/user` - Get current user info

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/{id}` - Update category (Admin only)
- `DELETE /api/categories/{id}` - Delete category (Admin only)

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/featured` - Get featured brands
- `GET /api/brands/{id}` - Get brand by ID
- `POST /api/brands` - Create brand (Admin only)
- `PUT /api/brands/{id}` - Update brand (Admin only)
- `DELETE /api/brands/{id}` - Delete brand (Admin only)

### Shopping Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/items/{itemId}` - Update cart item quantity
- `DELETE /api/cart/items/{itemId}` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create order from cart

### Admin
- `GET /api/admin/customers` - Get all customers
- `GET /api/admin/customers/{id}` - Get customer by ID
- `PUT /api/admin/customers/{id}` - Update customer
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/{id}/status` - Update order status
- `GET /api/admin/analytics/sales` - Get sales analytics
- `GET /api/admin/analytics/products` - Get product performance
- `GET /api/admin/analytics/customers` - Get customer acquisition data

## Default Users

The application creates default users on startup:

### Admin User
- **Email**: `admin@socksbox.com`
- **Password**: `admin123`
- **Role**: ADMIN

### Test Customer
- **Email**: `customer@socksbox.com`
- **Password**: `customer123`
- **Role**: CUSTOMER

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Example Login Request
```bash
curl -X POST http://localhost:6969/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@socksbox.com", "password": "admin123"}'
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (React development server)
- `http://localhost:8080` (Alternative frontend port)

## Error Handling

The API provides consistent error responses with HTTP status codes and descriptive messages:

```json
{
  "message": "Error description"
}
```

For validation errors, field-specific errors are returned:

```json
{
  "email": "Email is required",
  "password": "Password must be at least 6 characters"
}
```

## Development

### Running Tests
```bash
mvn test
```

### Building for Production
```bash
mvn clean package -Pprod
```

### Environment Variables
Key configuration properties can be overridden with environment variables:
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRATION` - JWT token expiration time
- `DB_URL` - Database URL
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

## Architecture

The backend follows a layered architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Data access layer
- **Entities**: JPA entities representing database tables
- **DTOs**: Data transfer objects for API communication
- **Security**: JWT-based authentication and authorization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
