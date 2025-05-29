# Converzio Backend API

This is the backend API for the Converzio app that handles user authentication and stores user data in a SQL database.

## Features

- User registration and login with email/password
- OAuth authentication support (Google, LinkedIn)
- JWT-based authentication
- SQLite database (easily upgradeable to PostgreSQL/MySQL)
- Secure password hashing with bcrypt

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password (null for OAuth users)
- `auth_provider` - Authentication provider (email, google, linkedin)
- `auth_provider_id` - Provider's user ID
- `first_name` - User's first name
- `last_name` - User's last name
- `profile_picture` - URL to profile picture
- `linkedin_profile` - LinkedIn profile URL
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```
   Edit `.env` and update the JWT_SECRET

3. **Initialize the database:**
   ```bash
   npm run init-db
   ```

4. **Start the server:**
   ```bash
   npm run dev  # For development with auto-reload
   # or
   npm start    # For production
   ```

## API Endpoints

### Authentication

#### POST /api/auth/signup
Create a new user account with email/password.

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "jwt-token-here"
}
```

#### POST /api/auth/login
Login with email/password.

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt-token-here"
}
```

#### POST /api/auth/oauth/callback
Handle OAuth authentication callback.

Request body:
```json
{
  "provider": "google",
  "providerId": "google-user-id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "profilePicture": "https://..."
}
```

#### GET /api/auth/verify
Verify JWT token.

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Connecting from React Native

The React Native app should:

1. Install AsyncStorage:
   ```bash
   npm install @react-native-async-storage/async-storage
   cd ios && pod install  # For iOS
   ```

2. Update the API base URL in `src/services/api.ts`:
   - For iOS Simulator: `http://localhost:3000/api`
   - For Android Emulator: `http://10.0.2.2:3000/api`
   - For physical device: Use your computer's IP address

3. Handle authentication in the LoginScreen by calling the API endpoints

## Security Notes

- Always use HTTPS in production
- Store JWT secret in environment variables
- Implement rate limiting for auth endpoints
- Add input validation and sanitization
- Consider implementing refresh tokens
- Use a more robust database like PostgreSQL for production

## Upgrading to PostgreSQL/MySQL

To upgrade from SQLite to a production database:

1. Install the appropriate driver:
   ```bash
   npm install pg  # For PostgreSQL
   # or
   npm install mysql2  # For MySQL
   ```

2. Update `backend/src/config/database.js` to use the new database connection

3. Update the SQL queries in `backend/src/config/initDb.js` for the specific database syntax

4. Update environment variables with database connection details 