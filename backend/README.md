# Assurance Auto-Moto Backend API

A robust Node.js + Express.js backend API for the Assurance Auto-Moto insurance management system, featuring MongoDB integration, JWT authentication, and comprehensive validation.

## 🚀 Features

- **Authentication System**: JWT-based auth with access + refresh tokens
- **User Management**: Registration, login, profile management
- **Security**: Password hashing, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod schema validation
- **Error Handling**: Comprehensive error handling with error codes

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/          # Database models
│   │   ├── User.js     # User model with authentication
│   │   └── Policy.js   # Insurance policy model
│   ├── routes/          # API routes
│   │   └── auth.js     # Authentication endpoints
│   ├── middleware/      # Custom middleware
│   │   └── auth.js     # JWT authentication middleware
│   ├── validations/     # Input validation schemas
│   │   └── auth.js     # Auth validation with Zod
│   └── server.js       # Main server file
├── package.json         # Dependencies and scripts
├── env.example         # Environment variables template
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Copy the example file
cp env.example .env

# Edit .env with your configuration
nano .env
```

4. **Configure MongoDB:**
   - **Local MongoDB**: Install and start MongoDB service
   - **MongoDB Atlas**: Get connection string from your cluster

5. **Update .env file:**
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/assurance-auto-moto
# OR for Atlas
MONGODB_URI_ATLAS=mongodb+srv://username:password@cluster.mongodb.net/assurance-auto-moto

# JWT Secrets (generate strong random strings)
JWT_ACCESS_SECRET=your-super-secure-access-secret-key-here
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-here
```

### Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Health check:**
```bash
curl http://localhost:5000/api/health
```

## 🔐 Authentication Endpoints

### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Ahmed Benali",
  "email": "ahmed@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "phone": "+212 6 12 34 56 78",
  "address": {
    "street": "123 Rue Hassan II",
    "city": "Casablanca",
    "postalCode": "20000"
  }
}
```

### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "SecurePass123!"
}
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Ahmed Benali Updated",
  "phone": "+212 6 98 76 54 32"
}
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Account Protection
- Account locking after 5 failed login attempts
- 2-hour lockout period
- Automatic unlock after lockout expires

### JWT Token Management
- **Access Token**: 15 minutes (configurable)
- **Refresh Token**: 7 days (configurable)
- Automatic token refresh endpoint
- Secure token storage

### Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable limits via environment variables

## 📊 Database Models

### User Model
- Personal information (name, email, phone, address)
- Authentication data (password, tokens)
- Account status and verification flags
- Security features (login attempts, account locking)

### Policy Model
- Insurance policy details
- Vehicle information
- Coverage options
- Financial details
- Document management

## ✅ Validation

All endpoints use Zod schemas for input validation:

- **Email format** validation
- **Moroccan phone number** format validation
- **Password strength** requirements
- **Address format** validation
- **Required field** validation

## 🚧 Next Steps

### Phase 2: Core Business Logic
- [ ] Policy management routes
- [ ] Claims management
- [ ] Invoice and billing
- [ ] Document upload system

### Phase 3: Advanced Features
- [ ] Email notifications
- [ ] File storage (AWS S3/Cloudinary)
- [ ] Payment integration
- [ ] Reporting and analytics

### Phase 4: Production Ready
- [ ] Unit and integration tests
- [ ] API documentation (Swagger)
- [ ] Logging and monitoring
- [ ] Docker containerization

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📝 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Available Endpoints
- `GET /health` - Health check
- `GET /` - API information
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/forgot-password` - Request password reset

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `MONGODB_URI` | Local MongoDB connection | `mongodb://localhost:27017/assurance-auto-moto` |
| `MONGODB_URI_ATLAS` | MongoDB Atlas connection | - |
| `JWT_ACCESS_SECRET` | JWT access token secret | - |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | - |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` |
| `MAX_FILE_SIZE` | Maximum file upload size | `10485760` (10MB) |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## 🚨 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details (if applicable)"
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `USER_EXISTS` - User already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `ACCOUNT_LOCKED` - Account temporarily locked
- `TOKEN_EXPIRED` - JWT token expired
- `INVALID_TOKEN` - Invalid JWT token

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Use conventional commit messages

## 📄 License

This project is licensed under the MIT License.

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: In Development (Phase 1 Complete)
