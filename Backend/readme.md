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

### Error Responses

#### Validation Errors
- **Status Code**: `400 Bad Request`
- **Possible Error Scenarios**:
  1. Invalid email format
  2. Password less than 8 characters

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Possible Error Scenarios**:
  1. Email not found
  2. Incorrect password

#### Example Validation Error Response
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Example Authentication Error Response
```json
{
  "message": "Invalid email or password"
}
```

### Server Errors
- **Status Code**: `500 Internal Server Error`
- Returned for unexpected server-side issues

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

## Notes
- Passwords are securely hashed before storage
- A JWT token is generated upon successful login or registration
- Duplicate email registrations are prevented
- Login requires exact email and password match