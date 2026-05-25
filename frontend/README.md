# SmartLoan Frontend

A modern Next.js frontend application for the SmartLoan intelligent loan management system.

## 🚀 Project Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your API base URL
# NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Development

```bash
# Start development server
npm run dev

# Open browser and navigate to
http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## 📁 Project Structure

```
smartloan-frontend/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/                # Main dashboard
│   ├── profile/                  # Customer profile
│   ├── applications/             # Loan applications
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── providers.tsx             # Redux provider
│
├── components/                   # React components
│   ├── common/                   # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Card.tsx
│   ├── forms/                    # Form components
│   │   ├── ApplicationForm.tsx
│   │   └── ProfileForm.tsx
│   └── layouts/                  # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── services/                     # API services
│   ├── apiClient.ts              # Axios instance
│   ├── authService.ts            # Authentication API calls
│   ├── customerService.ts        # Customer API calls
│   └── applicationService.ts     # Application API calls
│
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   └── slices/                   # Redux slices
│       ├── authSlice.ts
│       ├── customerSlice.ts
│       └── applicationSlice.ts
│
├── hooks/                        # Custom React hooks
│   ├── useRedux.ts               # Redux hooks
│   └── useApi.ts                 # API hooks
│
├── utils/                        # Utility functions
│   ├── helpers.ts                # Helper functions
│   ├── validators.ts             # Validation functions
│   └── constants.ts              # Constants
│
├── types/                        # TypeScript types
│   └── index.ts                  # Type definitions
│
├── styles/                       # Global styles
│   └── globals.css               # Tailwind CSS & custom styles
│
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── logo.png
│   └── images/
│
├── .env.example                  # Environment variables example
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── .gitignore                    # Git ignore file
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### State Management
- **Redux Toolkit** - State management
- **React Redux** - Redux bindings for React

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### HTTP Client
- **Axios** - HTTP client with interceptors

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 📋 Features Implemented

### Authentication Module
- ✅ Login form with email/password
- ✅ User registration with OTP verification
- ✅ Password reset functionality
- ✅ Session management with JWT tokens
- ✅ Protected routes

### Customer Module
- ✅ Customer profile management
- ✅ Personal information update
- ✅ Document upload and management
- ✅ Address verification
- ✅ Communication preferences

### Loan Application Module
- ✅ Multi-step application form
- ✅ Multiple loan product support (Personal, Home, Auto, Business, Education)
- ✅ Document collection with OCR support
- ✅ Real-time form validation
- ✅ Application status tracking
- ✅ Draft save functionality
- ✅ EMI calculation

### Dashboard
- ✅ Application overview
- ✅ Loan status tracking
- ✅ Quick statistics
- ✅ Notifications

## 🔗 API Integration

The frontend connects to the SmartLoan backend API. Configure the API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Available API Endpoints

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/send-otp` - Send OTP for verification
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/reset-password` - Reset password

**Customer:**
- `GET /customers/profile` - Get customer profile
- `PUT /customers/:id` - Update customer profile
- `POST /customers/:id/documents` - Upload document
- `GET /customers/:id/documents` - Get documents
- `DELETE /customers/:id/documents/:docId` - Delete document

**Applications:**
- `POST /applications` - Create new application
- `GET /applications` - List applications
- `GET /applications/:id` - Get application details
- `PUT /applications/:id` - Update application
- `POST /applications/:id/submit` - Submit application
- `GET /applications/:id/status` - Get application status

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Environment
NEXT_PUBLIC_ENV=development

# Authentication
NEXT_PUBLIC_AUTH_COOKIE_NAME=smartloan_auth_token
NEXT_PUBLIC_AUTH_TOKEN_EXPIRY=86400

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=pdf,jpg,jpeg,png

# Pagination
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=10
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Login to Vercel
npm install -g vercel
vercel login

# Deploy
vercel
```

### Docker

```bash
# Build Docker image
docker build -t smartloan-frontend .

# Run container
docker run -p 3000:3000 smartloan-frontend
```

### Self-hosted

```bash
# Build production bundle
npm run build

# Start server
npm start
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Zod Documentation](https://zod.dev)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Type errors
```bash
# Run type checking
npm run type-check
```

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For issues and questions, please contact the development team or create an issue in the project repository.

---

**Version:** 0.1.0  
**Last Updated:** May 20, 2026
