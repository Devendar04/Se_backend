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

| Field                | Type   | Constraints                    |
| -------------------- | ------ | ------------------------------ |
| `fullname.firstname` | String | - Minimum 3 characters long    |
| `email`              | String | - Must be a valid email format |
| `password`           | String | - Minimum 8 characters long    |
| `fullname.lastname`  | String | - Optional                     |

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

| Field      | Type   | Constraints                    |
| ---------- | ------ | ------------------------------ |
| `email`    | String | - Must be a valid email format |
| `password` | String | - Minimum 8 characters long    |

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

| Header          | Value            | Description                     |
| --------------- | ---------------- | ------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received during login |
| `Cookie`        | `token=<token>`  | JWT token stored in cookie      |

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

| Header          | Value            | Description                     |
| --------------- | ---------------- | ------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received during login |
| `Cookie`        | `token=<token>`  | JWT token stored in cookie      |

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

## Dashboard Endpoints

### Teacher Dashboard

- **URL**: `/teacher/dashboard`
- **Method**: `GET`
- **Authentication**: Required
- **Role Required**: `teacher`
- **Response**: Welcome message for teachers

### Student Dashboard

- **URL**: `/student/dashboard`
- **Method**: `GET`
- **Authentication**: Required
- **Role Required**: `student`
- **Response**: Welcome message for students

## Assignment Endpoints

### Create Assignment (Teacher Only)

- **URL**: `/teacher/assignments`
- **Method**: `POST`
- **Authentication**: Required
- **Role Required**: `teacher`
- **Content Type**: `multipart/form-data`
- **File Upload**: Single file allowed (JPEG, PNG, PDF, DOCX)

#### Assignment Model Schema

| Field         | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `title`       | String | Yes      | Title of the assignment                                     |
| `description` | String | Yes      | Detailed description of the assignment                      |
| `filePath`    | String | Yes      | Path to the uploaded assignment file                        |
| `dueDate`     | Date   | Yes      | Deadline for the assignment                                 |
| `course`      | String | Yes      | Course associated with the assignment                       |
| `createdAt`   | Date   | No       | Timestamp of assignment creation (defaults to current date) |

#### Example Request Body

```json
{
  "title": "Midterm Project",
  "description": "Create a comprehensive research paper",
  "dueDate": "2024-06-15",
  "course": "Computer Science 101"
}
```

### Get Assignments

- **URL**: `/student/assignments`
- **Method**: `GET`
- **Response**: List of all assignments

## Announcement Endpoints

### Create Announcement (Teacher Only)

- **URL**: `/teacher/announcements`
- **Method**: `POST`
- **Authentication**: Required
- **Role Required**: `teacher`
- **Content Type**: `multipart/form-data`
- **File Upload**: Single file allowed (JPEG, PNG, PDF, DOCX)

#### Announcement Model Schema

| Field       | Type   | Required | Description                                                   |
| ----------- | ------ | -------- | ------------------------------------------------------------- |
| `title`     | String | Yes      | Title of the announcement                                     |
| `message`   | String | Yes      | Content of the announcement                                   |
| `filePath`  | String | Yes      | Path to the uploaded file                                     |
| `postedBy`  | String | Yes      | Name or ID of the teacher posting the announcement            |
| `createdAt` | Date   | No       | Timestamp of announcement creation (defaults to current date) |

#### Example Request Body

```json
{
  "title": "Upcoming Exam Schedule",
  "message": "Midterm exams will be held next week",
  "postedBy": "Prof. Smith"
}
```

### Get Announcements

- **URL**: `/student/announcements`
- **Method**: `GET`
- **Response**: List of all announcements

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
- File Uploads:
  - Allowed types: JPEG, JPG, PNG, PDF, DOCX
  - Unique filename generated using timestamp

## Authentication Notes

- Passwords are securely hashed before storage
- A JWT token is generated upon successful login or registration
- Tokens are valid until logout or expiration
- Logout invalidates the current token
- Duplicate email registrations are prevented
- Login requires exact email and password match
- Role-based access control implemented for dashboard and specific routes

## Middleware
- Authentication middleware verifies JWT token
- Role-based middleware checks user roles for protected routes

## Classroom Endpoints

### Create Classroom

#### Overview

This endpoint allows teachers to create a new classroom with unique details.

#### Endpoint Details

- **URL**: `/classrooms`
- **Method**: `POST`
- **Authentication**: Required
- **Role Required**: `teacher`
- **Content Type**: `application/json`

#### Request Payload

The request body must include the following fields:

##### Required Fields

| Field       | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `className` | String | Name of the classroom               |
| `section`   | String | Section or period of the classroom  |
| `subject`   | String | Subject taught in the classroom     |
| `room`      | String | Physical or virtual room identifier |

##### Example Request Body

```json
{
  "className": "Advanced Mathematics",
  "section": "A",
  "subject": "Calculus",
  "room": "Room 305"
}
```

#### Response

##### Successful Classroom Creation

- **Status Code**: `201 Created`
- **Response Body**:

```json
{
  "message": "Classroom created successfully",
  "classroom": {
    "_id": "uniqueClassroomID",
    "className": "Advanced Mathematics",
    "section": "A",
    "subject": "Calculus",
    "room": "Room 305",
    "accessCode": "randomUniqueAccessCode",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Classrooms

#### Overview

This endpoint retrieves a list of all classrooms.

#### Endpoint Details

- **URL**: `/classrooms`
- **Method**: `GET`
- **Authentication**: Not specified in current implementation

#### Response

##### Successful Retrieval

- **Status Code**: `200 OK`
- **Response Body**:

```json
[
  {
    "_id": "uniqueClassroomID1",
    "className": "Advanced Mathematics",
    "section": "A",
    "subject": "Calculus",
    "room": "Room 305",
    "accessCode": "randomAccessCode1",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "uniqueClassroomID2",
    "className": "Computer Science",
    "section": "B",
    "subject": "Programming",
    "room": "Lab 102",
    "accessCode": "randomAccessCode2",
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
]
```

### Get Classroom by Access Code

#### Overview

This endpoint allows retrieving a specific classroom using its unique access code.

#### Endpoint Details

- **URL**: `/classrooms/:accessCode`
- **Method**: `GET`
- **Authentication**: Not specified in current implementation

#### Request Parameters

| Parameter    | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `accessCode` | String | Unique access code for the classroom |

#### Response

##### Successful Retrieval

- **Status Code**: `200 OK`
- **Response Body**:

```json
{
  "_id": "uniqueClassroomID",
  "className": "Advanced Mathematics",
  "section": "A",
  "subject": "Calculus",
  "room": "Room 305",
  "accessCode": "randomAccessCode",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

##### Classroom Not Found

- **Status Code**: `404 Not Found`
- **Response Body**:

```json
{
  "message": "Classroom not found"
}
```

## Classroom Model Schema

| Field        | Type   | Required | Description                             |
| ------------ | ------ | -------- | --------------------------------------- |
| `className`  | String | Yes      | Name of the classroom                   |
| `section`    | String | Yes      | Section or period of the classroom      |
| `subject`    | String | Yes      | Subject taught in the classroom         |
| `room`       | String | Yes      | Physical or virtual room identifier     |
| `accessCode` | String | Yes      | Unique code for accessing the classroom |
| `createdAt`  | Date   | No       | Timestamp of classroom creation         |
| `updatedAt`  | Date   | No       | Timestamp of last classroom update      |

## Notes on Classroom Management

- Each classroom is assigned a unique, randomly generated 8-character access code
- The access code ensures secure and unique identification of classrooms
- Classroom creation requires all specified fields
- Classrooms can be retrieved individually or as a complete list

## Potential Error Responses

- **Status Code**: `400 Bad Request`
  - Missing required fields during classroom creation
- **Status Code**: `500 Internal Server Error`
  - Unexpected server-side errors during classroom operations
