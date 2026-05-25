# DEV-Prompts.md

## Development Prompts for SmartLoan

### Frontend Development
- **Framework**: Next.js 16.2.6 with React 18.2.0
- **Styling**: Tailwind CSS 3.3.6
- **Form Management**: React Hook Form + Zod validation
- **State Management**: Redux Toolkit 1.9.7
- **Build Tool**: Webpack with Babel configuration

### Authentication Pages
1. **Sign In Page** (`/auth/login`)
   - Email validation
   - Password input with visibility toggle
   - Remember me checkbox
   - Forgot password link
   - Demo credentials display

2. **Sign Up Page** (`/auth/register`)
   - First name and last name fields
   - Email validation
   - Strong password requirements (8+ chars, uppercase, lowercase, number, special char)
   - Password confirmation
   - Terms agreement checkbox

3. **Forgot Password Page** (`/auth/forgot-password`)
   - Email input validation
   - Success confirmation message
   - 24-hour reset link validity
   - Security messaging

### Backend Development
- **Framework**: ASP.NET Core
- **API**: REST API with JWT authentication
- **Database**: SQL Server
- **Required Endpoints**:
  - `POST /api/v1/auth/login` - User authentication
  - `POST /api/v1/auth/register` - User registration
  - `POST /api/v1/auth/forgot-password` - Password reset
  - `POST /api/v1/auth/verify-email` - Email verification

### Code Standards
- Use TypeScript for type safety
- Implement error handling and logging
- Follow RESTful API conventions
- Use environment variables for configuration
- Implement proper CORS headers

### Testing
- Unit tests for components and services
- Integration tests for API endpoints
- E2E tests for user workflows
