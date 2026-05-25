# SmartLoan Backend - API Documentation Guide

## Getting Started

The backend API follows RESTful conventions with JSON request/response format.

**Base URL:** `http://localhost:3001/api/v1`

## Authentication

Most endpoints require JWT authentication via Bearer token:

```
Authorization: Bearer <token>
```

Tokens are also stored in HTTP-only cookies for secure storage.

## Request/Response Format

All requests and responses use JSON format with appropriate HTTP status codes.

### Success Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "role": "user",
    "isEmailVerified": false,
    "createdAt": "2026-05-25T10:00:00.000Z"
  },
  "expiresIn": "7d"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Email already registered",
  "error": "Bad Request"
}
```

## Authentication Endpoints

### 1. Register User
Endpoint that creates a new user account after OTP verification.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "confirmPassword": "SecurePass@123",
  "phoneNumber": "+91-9876543210",
  "dateOfBirth": "1990-05-15",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001"
}
```

**Response (201 Created):**
```json
{
  "message": "OTP sent to your email",
  "email": "john@example.com",
  "expiresIn": 600
}
```

**Error Responses:**
- `400 Bad Request` - Passwords don't match or email already registered
- `422 Unprocessable Entity` - Validation failed

### 2. Verify OTP (Registration)
Verify the OTP sent during registration and create user account.

**Endpoint:** `POST /auth/verify-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "password": "SecurePass@123",
  "type": "registration"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "role": "user",
    "isEmailVerified": true,
    "createdAt": "2026-05-25T10:05:00.000Z"
  },
  "expiresIn": "7d"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid or expired OTP
- `422 Unprocessable Entity` - Validation failed

---

### 3. Login User
Authenticate user with email and password.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123",
  "rememberMe": true
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "role": "user",
    "isEmailVerified": true,
    "createdAt": "2026-05-25T10:05:00.000Z"
  },
  "expiresIn": "7d"
}
```

**Headers Set:**
- `Set-Cookie: auth_token=<token>; HttpOnly; Secure; SameSite=Lax`

**Error Responses:**
- `401 Unauthorized` - Invalid email or password
- `422 Unprocessable Entity` - Validation failed

---

### 4. Forgot Password
Request password reset OTP.

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "If the email exists, OTP has been sent",
  "email": "john@example.com",
  "expiresIn": 600
}
```

**Note:** Always returns success for security (doesn't reveal if email exists)

---

### 5. Reset Password
Reset password using OTP.

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "email": "john@example.com",
  "token": "123456",
  "newPassword": "NewSecurePass@456",
  "confirmPassword": "NewSecurePass@456"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "role": "user",
    "isEmailVerified": true,
    "createdAt": "2026-05-25T10:05:00.000Z"
  },
  "expiresIn": "7d"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid or expired OTP
- `422 Unprocessable Entity` - Validation failed

---

### 6. Send OTP (Generic)
Send OTP for various purposes.

**Endpoint:** `POST /auth/send-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "type": "registration" // or "password-reset", "phone-verification"
}
```

**Response (200 OK):**
```json
{
  "message": "OTP sent",
  "email": "john@example.com",
  "expiresIn": 600
}
```

---

### 7. Logout
Logout current user (requires authentication).

**Endpoint:** `POST /auth/logout`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Side Effects:**
- Clears `auth_token` cookie

---

### 8. Change Password
Change password for authenticated user.

**Endpoint:** `POST /auth/change-password`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "SecurePass@123",
  "newPassword": "NewSecurePass@456"
}
```

**Response (200 OK):**
```json
{
  "message": "Password changed successfully",
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid current password
- `422 Unprocessable Entity` - Validation failed

---

### 9. Get Current User
Get authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "role": "user"
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or expired token

---

### 10. Refresh Token
Refresh access token.

**Endpoint:** `POST /auth/refresh`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required or invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Internal Server Error - Server error |

## Password Requirements

All passwords must meet these requirements:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

Example: `SecurePass@123`

## OTP Specifications

- **Length:** 6 digits
- **Validity:** 10 minutes
- **Resend Delay:** 60 seconds between attempts
- **Max Attempts:** 5 attempts before lockout
- **Types:** registration, password-reset, phone-verification

## Rate Limiting (Future Implementation)

Recommended rate limits for production:
- Auth endpoints: 5 requests per minute per IP
- General endpoints: 100 requests per minute per user
- OTP endpoints: 3 requests per 10 minutes per email

## CORS Configuration

**Allowed Origins:** Configured in `.env` via `CORS_ORIGIN`

**Default:** `http://localhost:3000`

**Allowed Methods:** GET, POST, PUT, DELETE, PATCH, OPTIONS

**Allowed Headers:** Content-Type, Authorization

## Error Handling

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Descriptive error message",
  "error": "Bad Request",
  "timestamp": "2026-05-25T10:00:00.000Z",
  "path": "/api/v1/auth/login"
}
```

## Troubleshooting

### Token Expired
- Error: `401 Unauthorized - Token expired`
- Solution: Call `POST /auth/refresh` to get new token

### Invalid OTP
- Error: `400 Bad Request - Invalid OTP`
- Solution: Check OTP hasn't expired (10 min) or request new OTP

### Email Already Exists
- Error: `400 Bad Request - Email already registered`
- Solution: Use different email or reset password

### CORS Error
- Error: `Access to XMLHttpRequest blocked by CORS policy`
- Solution: Ensure frontend URL matches `CORS_ORIGIN` in .env

## Support

For API issues or questions, refer to the backend README or contact the development team.
