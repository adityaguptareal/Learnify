---

# Learnify

Learnify is an online course platform where users can sign up, purchase courses, and manage their learning journey. Admins have complete control to manage courses and oversee platform operations.

---

## 🚀 Features

### 👨‍🎓 User Features:
- User Registration & Login
- Purchase courses securely
- View and manage purchased courses

### 🛠️ Admin Features:
- Admin registration & login
- Create, update, delete, and view courses
- Platform-wide course management

---

## 🛠️ Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod

---

## 📦 Installation & Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/adityaguptareal/Learnify.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd Learnify
    ```

3. **Install all dependencies**

    ```bash
    npm install
    ```

4. **Create a `.env` file and add the following:**

    ```env
    MONGOODB_URL=your_mongo_db_url
    JWT_SECRET_USER=your_user_jwt_secret
    JWT_SECRET_ADMIN=your_admin_jwt_secret
    ```

5. **Run the project**

    ```bash
    npm start
    ```

---

## 🔗 API Endpoints

### 📌 User Routes

#### 1. **Sign Up**

- **POST** `/api/v1/user/signup`

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

- **Response**

```json
{
  "message": "user signed up successfully!"
}
```

#### 2. **Sign In**

- **POST** `/api/v1/user/signin`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response**

```json
{
  "message": "signin successfully",
  "idToken": "JWT_TOKEN"
}
```

#### 3. **Get Purchased Courses**

- **GET** `/api/v1/user/purchases`

**Headers:** `token: JWT_TOKEN`

- **Response**

```json
{
  "purchases": [...],
  "course": [...]
}
```

---

### 📌 Course Routes

#### 1. **Purchase Course**

- **POST** `/api/v1/courses/purchase`

```json
{
  "courseId": "COURSE_ID"
}
```

**Headers:** `token: JWT_TOKEN`

- **Response**

```json
{
  "message": "course purchased",
  "status": "purchased"
}
```

#### 2. **Get All Courses**

- **GET** `/api/v1/courses/preview`

- **Response**

```json
{
  "message": "All Courses List",
  "courses": [...]
}
```

---

### 📌 Admin Routes

#### 1. **Admin Sign Up**

- **POST** `/api/v1/admin/signup`

```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User"
}
```

- **Response**

```json
{
  "message": "user signed up successfully!"
}
```

#### 2. **Admin Sign In**

- **POST** `/api/v1/admin/signin`

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

- **Response**

```json
{
  "message": "signin successfully",
  "idToken": "JWT_TOKEN"
}
```

#### 3. **Create Course**

- **POST** `/api/v1/admin/course`

**Headers:** `token: JWT_TOKEN`

```json
{
  "title": "Course Title",
  "description": "Course Description",
  "imageUrl": "Course Image URL",
  "price": "Price"
}
```

- **Response**

```json
{
  "message": "course created",
  "courseID": "COURSE_ID"
}
```

#### 4. **Update Course**

- **PUT** `/api/v1/admin/course`

**Headers:** `token: JWT_TOKEN`

```json
{
  "courseID": "COURSE_ID",
  "title": "Updated Course Title",
  "description": "Updated Description",
  "imageUrl": "Updated Image URL",
  "price": "Updated Price"
}
```

- **Response**

```json
{
  "message": "COURSE_ID Course Updated"
}
```

#### 5. **Get All Courses (Admin)**

- **GET** `/api/v1/admin/course/bulk`

**Headers:** `token: JWT_TOKEN`

- **Response**

```json
{
  "message": "Your Courses",
  "courses": [...]
}
```

#### 6. **Delete Course**

- **DELETE** `/api/v1/admin/course/delete`

**Headers:** `token: JWT_TOKEN`

```json
{
  "courseID": "COURSE_ID"
}
```

- **Response**

```json
{
  "message": "Course is Deleted"
}
```

---

## 🔐 Authentication Middleware

- **User Middleware:** Protects user-specific routes (e.g., course purchases and viewing purchases)
- **Admin Middleware:** Protects admin-specific routes (e.g., creating, updating, and deleting courses)

---

## 🎯 Notes

- Ensure to replace placeholders like `your_mongo_db_url` and `JWT_TOKEN` with your actual values.
- Make sure MongoDB is running before starting the project.

---

Would you like me to also suggest badges (e.g., License, Build Status) or a contributing section for this README? 🚀
