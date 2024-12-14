# Backend API Documentation

# User Authentication Endpoints

## Registration Endpoint

### Overview
This endpoint allows new users to register in the system by providing their personal and authentication details.

### Endpoint Details
- **URL**: `/register`
- **Method**: `POST`
- **Content Type**: `application/json`

### Request Payload
The request body must include the following fields:

#### Required Fields
| Field | Type | Constraints |
|-------|------|-------------|
| `fullname.firstname` | String | - Minimum 3 characters long |
| `email` | String | - Must be a valid email format |
| `password` | String | - Minimum 8 characters long |
| `fullname.lastname` | String | - Optional |

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

### Response

#### Successful Registration
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "user": {
    "_id": "uniqueUserID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  },
  "token": "jwtAuthenticationToken"
}
```

## Login Endpoint

### Overview
This endpoint allows registered users to log in to the system by providing their email and password.

### Endpoint Details
- **URL**: `/login`
- **Method**: `POST`
- **Content Type**: `application/json`

### Request Payload
The request body must include the following fields:

#### Required Fields
| Field | Type | Constraints |
|-------|------|-------------|
| `email` | String | - Must be a valid email format |
| `password` | String | - Minimum 8 characters long |

#### Example Request Body
```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

### Response

#### Successful Login
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "user": {
    "_id": "uniqueUserID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  },
  "token": "jwtAuthenticationToken"
}
```

## User Profile Endpoint

### Overview
This endpoint allows authenticated users to retrieve their profile information.

### Endpoint Details
- **URL**: `/profile`
- **Method**: `GET`
- **Authentication**: Required (JWT Token)

### Request
#### Headers
| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | `Bearer <token>` | JWT token received during login |
OR
| `Cookie` | `token=<token>` | JWT token stored in cookie |

### Response

#### Successful Profile Retrieval
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "_id": "uniqueUserID",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
}
```

### Possible Error Responses
- **Status Code**: `401 Unauthorized`
  - Invalid or expired token
  - Token not provided
  - User not found

## Logout Endpoint

### Overview
This endpoint allows authenticated users to log out of the system.

### Endpoint Details
- **URL**: `/logout`
- **Method**: `GET`
- **Authentication**: Required (JWT Token)

### Request
#### Headers
| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | `Bearer <token>` | JWT token received during login |
OR
| `Cookie` | `token=<token>` | JWT token stored in cookie |

### Response

#### Successful Logout
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "message": "Logged out successfully"
}
```

### Additional Logout Behavior
- Clears the authentication token cookie
- Blacklists the current token (valid for 24 hours)

### Possible Error Responses
- **Status Code**: `401 Unauthorized`
  - Invalid or expired token
  - Token not provided

## Validation Rules
- First name (Registration): 
  - Minimum 3 characters
  - Maximum 50 characters
- Email: 
  - Must be a valid email format
  - Minimum 5 characters
- Password:
  - Minimum 8 characters
  - Hashed before storage
- Last name (Registration): Optional, but if provided, minimum 3 characters

## Authentication Notes
- Passwords are securely hashed before storage
- A JWT token is generated upon successful login or registration
- Tokens are valid until logout or expiration
- Logout invalidates the current token
- Duplicate email registrations are prevented
- Login requires exact email and password match