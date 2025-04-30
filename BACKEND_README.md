# Backend API Documentation

This repository contains the backend API for the mobile application. It is built using **Spring Boot** and provides endpoints for user authentication, image uploads, location-based services, and more.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Image Uploads](#image-uploads)
  - [Location Services](#location-services)
  - [Category Management](#category-management)
- [Database Schema](#database-schema)
- [Development Notes](#development-notes)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Java 17** or later
- **Maven** (for dependency management)
- **PostgreSQL** (or your preferred database)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Configure the environment variables in the `application.properties` file (see [Environment Variables](#environment-variables)).

3. Build the project:

   ```bash
   mvn clean install
   ```

4. Run the application:

   ```bash
   mvn spring-boot:run
   ```

   The server will start at `http://localhost:8080`.

---

## Project Structure

The project follows a standard Spring Boot structure:

```
src/
├── main/
│   ├── java/
│   │   └── com.example.backend/
│   │       ├── config/         # Configuration files
│   │       ├── controller/     # REST controllers
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── entity/         # JPA entities
│   │       ├── repository/     # Spring Data JPA repositories
│   │       ├── service/        # Business logic
│   │       └── util/           # Utility classes
│   └── resources/
│       ├── application.properties  # Environment configuration
│       └── static/                 # Static resources (if any)
└── test/                           # Unit and integration tests
```

---

## Environment Variables

The application uses environment variables defined in the `application.properties` file. Below are the required variables:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# Security Configuration
jwt.secret=your_jwt_secret
jwt.expiration=3600000

# Third-Party API Keys
imagekit.api.key=your_imagekit_api_key
google.maps.api.key=your_google_maps_api_key
barikoi.api.key=your_barikoi_api_key
```

> **Note:** Replace the placeholder values with your actual configuration.

---

## Key Features

### 1. **Authentication**
- User registration and login using JWT.
- Secure password storage with BCrypt hashing.

### 2. **Image Uploads**
- Integration with ImageKit for secure and efficient image uploads.

### 3. **Location Services**
- Integration with Barikoi and Google Maps APIs for location-based services.

### 4. **Category Management**
- CRUD operations for managing categories.

---

## API Endpoints

### Authentication

| Method | Endpoint       | Description              | Request Body                          | Response                                |
|--------|----------------|--------------------------|---------------------------------------|-----------------------------------------|
| POST   | `/auth/register` | Register a new user      | `{ "name": "John", "email": "john@example.com", "password": "123456" }` | `{ "message": "User registered successfully" }` |
| POST   | `/auth/login`    | Login and get JWT token | `{ "email": "john@example.com", "password": "123456" }` | `{ "token": "jwt_token", "user": { "id": 1, "name": "John" } }` |

---

### Image Uploads

| Method | Endpoint       | Description              | Request Body                          | Response                                |
|--------|----------------|--------------------------|---------------------------------------|-----------------------------------------|
| POST   | `/images/upload` | Upload an image         | Multipart file                        | `{ "url": "https://imagekit.io/your_image.jpg" }` |

---

### Location Services

| Method | Endpoint       | Description              | Request Query                         | Response                                |
|--------|----------------|--------------------------|---------------------------------------|-----------------------------------------|
| GET    | `/locations/search` | Search for locations  | `?query=location_name`               | `{ "locations": [{ "id": 1, "name": "Dhaka", "latitude": 23.8103, "longitude": 90.4125 }] }` |

---

### Category Management

| Method | Endpoint       | Description              | Request Body                          | Response                                |
|--------|----------------|--------------------------|---------------------------------------|-----------------------------------------|
| GET    | `/categories`   | Get all categories       | None                                  | `{ "categories": [{ "id": 1, "name": "Delivery" }] }` |
| POST   | `/categories`   | Create a new category    | `{ "name": "New Category" }`          | `{ "message": "Category created successfully" }` |

---

## Database Schema

### User Table
| Column       | Type         | Description              |
|--------------|--------------|--------------------------|
| `id`         | UUID         | Primary key              |
| `name`       | VARCHAR(255) | User's full name         |
| `email`      | VARCHAR(255) | User's email (unique)    |
| `password`   | VARCHAR(255) | Encrypted password       |
| `created_at` | TIMESTAMP    | Account creation date    |

### Category Table
| Column       | Type         | Description              |
|--------------|--------------|--------------------------|
| `id`         | UUID         | Primary key              |
| `name`       | VARCHAR(255) | Category name            |

---

## Development Notes

### Security
- JWT is used for authentication and authorization.
- Passwords are hashed using BCrypt before storing them in the database.

### API Documentation
- Swagger is integrated for API documentation. Access it at `http://localhost:8080/swagger-ui.html`.

### Testing
- Unit tests are written using JUnit and Mockito.
- Integration tests ensure the API works as expected.

---

## Dependencies

### Key Dependencies

- **Spring Boot**: Core framework for building the backend.
- **Spring Security**: For authentication and authorization.
- **Spring Data JPA**: For database interaction.
- **PostgreSQL Driver**: For connecting to the PostgreSQL database.
- **Swagger**: For API documentation.
- **ImageKit SDK**: For image uploads.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.