# Learnify

Learnify is an online course platform where users can sign up, sign in, purchase courses, and view their purchased courses. Admins can create and manage courses, while having control over the entire platform.

## Features

### User Features:
- Sign up and sign in
- Purchase courses
- View purchased courses

### Admin Features:
- Admin authentication
- Manage courses (create, update, delete, and view courses)

## Technologies Used
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Zod for input validation

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/adityaguptareal/Learnify.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd Learnify
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file and add the following variables:**

    ```bash
    MONGOODB_URL=your_mongo_db_url
    JWT_SECRET_USER=your_user_jwt_secret
    JWT_SECRET_AMDIN=your_admin_jwt_secret
    ```

5. **Run the project:**

    ```bash
    npm start
    ```

## API Endpoints

### User Routes

#### 1. Sign Up

- **URL:** `/api/v1/user/signup`
- **Method:** POST
- **Request Body:**

    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe"
    }
    ```

- **Response:**

    ```json
    {
      "message": "user signed up successfully!"
    }
    ```

#### 2. Sign In

- **URL:** `/api/v1/user/signin`
- **Method:** POST
- **Request Body:**

    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Response:**

    ```json
    {
      "message": "signin successfully",
      "idToken": "JWT_TOKEN"
    }
    ```

#### 3. Get Purchased Courses

- **URL:** `/api/v1/user/purchases`
- **Method:** GET
- **Headers:** `token: JWT_TOKEN`
- **Response:**

    ```json
    {
      "purchases": [...],
      "course": [...]
    }
    ```

### Course Routes

#### 1. Purchase Course

- **URL:** `/api/v1/courses/purchase`
- **Method:** POST
- **Request Body:**

    ```json
    {
      "courseId": "COURSE_ID"
    }
    ```

- **Headers:** `token: JWT_TOKEN`
- **Response:**

    ```json
    {
      "message": "course purchased",
      "status": "purchased"
    }
    ```

#### 2. Get All Courses

- **URL:** `/api/v1/courses/preview`
- **Method:** GET
- **Response:**

    ```json
    {
      "message": "All Courses List",
      "courses": [...]
    }
    ```

### Admin Routes

#### 1. Admin Sign Up

- **URL:** `/api/v1/admin/signup`
- **Method:** POST
- **Request Body:**

    ```json
    {
      "email": "admin@example.com",
      "password": "admin123",
      "firstName": "Admin",
      "lastName": "User"
    }
    ```

- **Response:**

    ```json
    {
      "message": "user signed up successfully!"
    }
    ```

#### 2. Admin Sign In

- **URL:** `/api/v1/admin/signin`
- **Method:** POST
- **Request Body:**

    ```json
    {
      "email": "admin@example.com",
      "password": "admin123"
    }
    ```

- **Response:**

    ```json
    {
      "message": "signin successfully",
      "idToken": "JWT_TOKEN"
    }
    ```

#### 3. Create Course

- **URL:** `/api/v1/admin/course`
- **Method:** POST
- **Headers:** `token: JWT_TOKEN`
- **Request Body:**

    ```json
    {
      "title": "Course Title",
      "description": "Course Description",
      "imageUrl": "Course Image URL",
      "price": "Price"
    }
    ```

- **Response:**

    ```json
    {
      "message": "course created",
      "courseID": "COURSE_ID"
    }
    ```

#### 4. Update Course

- **URL:** `/api/v1/admin/course`
- **Method:** PUT
- **Headers:** `token: JWT_TOKEN`
- **Request Body:**

    ```json
    {
      "courseID": "COURSE_ID",
      "title": "Updated Course Title",
      "description": "Updated Description",
      "imageUrl": "Updated Image URL",
      "price": "Updated Price"
    }
    ```

- **Response:**

    ```json
    {
      "message": "COURSE_ID Course Updated"
    }
    ```

#### 5. Get All Courses (Admin)

- **URL:** `/api/v1/admin/course/bulk`
- **Method:** GET
- **Headers:** `token: JWT_TOKEN`
- **Response:**

    ```json
    {
      "message": "Your Courses",
      "courses": [...]
    }
    ```

#### 6. Delete Course

- **URL:** `/api/v1/admin/course/delete`
- **Method:** DELETE
- **Headers:** `token: JWT_TOKEN`
- **Request Body:**

    ```json
    {
      "courseID": "COURSE_ID"
    }
    ```

- **Response:**

    ```json
    {
      "message": "Course is Deleted"
    }
    ```

## Authentication Middleware

- **User Middleware:** Protects routes that require user authentication (e.g., viewing purchased courses).
- **Admin Middleware:** Protects routes that require admin authentication (e.g., creating, updating, and deleting courses).




