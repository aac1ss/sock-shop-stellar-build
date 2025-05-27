
# The Socks Box - Spring Boot Backend

A comprehensive e-commerce backend application built with Spring Boot 3.2.5 and Java 21, featuring JWT authentication, PostgreSQL database integration, and full REST API functionality.

## Features

- **Authentication & Authorization**: JWT-based security with role-based access control
- **User Management**: Customer and admin user roles with profile management
- **Product Management**: Full CRUD operations for products, categories, and brands
- **Shopping Cart**: Session-based cart management with item operations
- **Order Management**: Complete order processing with status tracking
- **Analytics**: Sales data, customer acquisition, and product performance metrics
- **Database**: PostgreSQL with Hibernate/JPA integration
- **Security**: CORS configuration, password encryption, and secure endpoints

## Tech Stack

- **Java 21**
- **Spring Boot 3.2.5**
- **Spring Security 6**
- **Spring Data JPA**
- **PostgreSQL** (Supabase)
- **JWT** (JSON Web Tokens)
- **Lombok**
- **Maven**

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- PostgreSQL database (Supabase)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Configure Database

Update `src/main/resources/application.properties` with your Supabase PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://your-supabase-db-url:5432/postgres?user=postgres&password=your-password
```

### 3. Build and Run

```bash
# Clean and compile
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:6969/api`

### 4. Default Users

The application creates default users on first run:

**Admin User:**
- Email: `admin@socksbox.com`
- Password: `admin123`

**Customer User:**
- Email: `customer@socksbox.com`
- Password: `customer123`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/auth/user` | Get current user |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/{id}` | Get product by ID | No |
| GET | `/products/featured` | Get featured products | No |
| GET | `/products/category/{id}` | Get products by category | No |
| GET | `/products/brand/{id}` | Get products by brand | No |
| POST | `/products` | Create product | Admin |
| PUT | `/products/{id}` | Update product | Admin |
| DELETE | `/products/{id}` | Delete product | Admin |

### Categories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| GET | `/categories/{id}` | Get category by ID | No |
| POST | `/categories` | Create category | Admin |
| PUT | `/categories/{id}` | Update category | Admin |
| DELETE | `/categories/{id}` | Delete category | Admin |

### Brands

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/brands` | Get all brands | No |
| GET | `/brands/{id}` | Get brand by ID | No |
| GET | `/brands/featured` | Get featured brands | No |
| POST | `/brands` | Create brand | Admin |
| PUT | `/brands/{id}` | Update brand | Admin |
| DELETE | `/brands/{id}` | Delete brand | Admin |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user cart | Customer |
| POST | `/cart` | Add item to cart | Customer |
| PUT | `/cart/items/{id}` | Update cart item | Customer |
| DELETE | `/cart/items/{id}` | Remove cart item | Customer |
| DELETE | `/cart` | Clear cart | Customer |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/orders` | Get user orders | Customer |
| GET | `/orders/{id}` | Get order by ID | Customer/Admin |
| POST | `/orders` | Create order | Customer |
| GET | `/admin/orders` | Get all orders | Admin |
| PUT | `/admin/orders/{id}/status` | Update order status | Admin |

### Admin

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/customers` | Get all customers | Admin |
| GET | `/admin/customers/{id}` | Get customer by ID | Admin |
| PUT | `/admin/customers/{id}` | Update customer | Admin |
| GET | `/admin/analytics/sales` | Get sales analytics | Admin |
| GET | `/admin/analytics/products` | Get product performance | Admin |
| GET | `/admin/analytics/customers` | Get customer acquisition | Admin |

## Request/Response Examples

### Login Request

```json
POST /auth/login
{
  "email": "customer@socksbox.com",
  "password": "customer123"
}
```

### Login Response

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "customer@socksbox.com",
    "role": "CUSTOMER"
  }
}
```

### Add to Cart Request

```json
POST /cart
Authorization: Bearer <token>
{
  "productId": 1,
  "quantity": 2,
  "color": "Black",
  "size": "M"
}
```

### Create Order Request

```json
POST /orders
Authorization: Bearer <token>
{
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA"
}
```

## Database Schema

### Tables

- `users` - User accounts and profiles
- `categories` - Product categories
- `brands` - Product brands
- `products` - Product catalog
- `product_images` - Product image URLs
- `product_colors` - Available colors
- `product_sizes` - Available sizes
- `carts` - User shopping carts
- `cart_items` - Items in shopping carts
- `orders` - Customer orders
- `order_items` - Items in orders

## Security

The application uses JWT-based authentication with the following security features:

- Password encryption using BCrypt
- Role-based access control (CUSTOMER, ADMIN)
- CORS configuration for frontend integration
- Secure endpoints with proper authorization

## Error Handling

The application includes comprehensive error handling:

- `ResourceNotFoundException` - 404 for missing resources
- `BadCredentialsException` - 401 for authentication failures
- `MethodArgumentNotValidException` - 400 for validation errors
- Generic exception handling for unexpected errors

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

For production deployment, set the following environment variables:

- `SPRING_DATASOURCE_URL` - Database URL
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRATION` - Token expiration time

## Frontend Integration

The backend is designed to work with the React frontend running on port 8080. CORS is configured to allow requests from:

- `http://localhost:3000` (development)
- `http://localhost:8080` (production)

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify Supabase credentials in `application.properties`
   - Check network connectivity to Supabase

2. **JWT Authentication Issues**
   - Ensure the JWT secret is properly configured
   - Check token expiration settings

3. **Port Conflicts**
   - Default port is 6969, change in `application.properties` if needed
   - Ensure no other services are running on the same port

### Logs

Enable debug logging for troubleshooting:

```properties
logging.level.com.socksbox=DEBUG
logging.level.org.springframework.security=DEBUG
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
