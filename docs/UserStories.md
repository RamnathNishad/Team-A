# SmartLoan Platform - Refined User Stories Document
## Final Version - Module & Page Wise

**Document Version:** 2.0  
**Date:** May 21, 2026  
**Status:** Final  
**Project Name:** Loan Application Management Platform  
**Organization:** Tavant Technologies

---

## Table of Contents
1. Document Overview
2. Authentication Module
3. Customer Portal Module
4. Loan Application Module
5. Document Management Module
6. Application Tracking Module
7. Loan Calculator Module
8. Admin Panel Module
9. Integration Stories
10. System Integration Points

---

## 1. Document Overview

This document provides refined user stories organized by:
- **Module/Feature:** Logical grouping of related functionality
- **Page:** Specific UI page/screen
- **Frontend Stories:** Client-side implementation requirements
- **Backend Stories:** Server-side logic and APIs
- **Integration Stories:** Third-party and system integrations

### Story Format
```
Story ID: [Module]-[Type]-[Number]
Title: [Concise title]
Type: Frontend/Backend/Integration
Module: [Module name]
Page: [Page name or N/A]
Priority: Critical/High/Medium/Low
Complexity: 1-13 (Story points)
```

---

## 2. AUTHENTICATION MODULE

### 2.1 Customer Registration Page

#### **Story: CUST-FE-001 - Customer Registration Form UI**
- **Title:** Display customer registration form with validation
- **Type:** Frontend
- **Module:** Authentication
- **Page:** Register Page
- **Priority:** Critical
- **Complexity:** 5 points

**Description:**  
As a prospective customer, I want to see a registration form where I can enter my details and create an account.

**Acceptance Criteria:**
- AC-1: Display form fields: Email, Phone, Password, Confirm Password
- AC-2: Show password strength indicator (Weak/Medium/Strong)
- AC-3: Mark all fields as required with asterisk (*)
- AC-4: Display password requirements (Min 8 chars, 1 uppercase, 1 number, 1 special char)
- AC-5: Show real-time validation errors below each field
- AC-6: Disable Submit button until form is valid
- AC-7: Show "Already have account? Login" link
- AC-8: Responsive design for mobile (375px), tablet (768px), desktop (1920px)

**Technical Requirements:**
- Use React form library (React Hook Form)
- Implement client-side validation using Zod
- Email regex validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password regex: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/`
- Store form state in React component state
- Styling using Tailwind CSS with consistent spacing

**Component Structure:**
```
RegisterPage
├── RegistrationForm
│   ├── EmailInput
│   ├── PhoneInput
│   ├── PasswordInput
│   ├── PasswordStrengthIndicator
│   ├── ConfirmPasswordInput
│   └── SubmitButton
└── LoginLink
```

---

#### **Story: CUST-BE-001 - User Registration Endpoint**
- **Title:** Create registration API endpoint
- **Type:** Backend
- **Module:** Authentication
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 5 points

**Description:**  
As a backend system, I need to receive and process customer registration requests, validate data, and create user accounts.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/auth/register
- AC-2: Validate all required fields (email, phone, password)
- AC-3: Check email uniqueness (return 400 if duplicate)
- AC-4: Check phone uniqueness (return 400 if duplicate)
- AC-5: Hash password using bcrypt with salt rounds = 10
- AC-6: Store user record in database with status "PENDING_VERIFICATION"
- AC-7: Generate OTP (6 digits) and store with 15-minute expiry
- AC-8: Return response with user ID and message
- AC-9: Handle exceptions with appropriate HTTP status codes
- AC-10: Log registration attempt with user email

**API Specification:**
```json
POST /api/v1/auth/register
Request:
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}

Response (201 Created):
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "userId": "UUID",
  "verificationEmailSent": true
}

Error Response (400):
{
  "success": false,
  "error": "Email already registered",
  "code": "DUPLICATE_EMAIL"
}
```

**Database Schema:**
```sql
CREATE TABLE Users (
  UserId UUID PRIMARY KEY,
  Email VARCHAR(255) UNIQUE NOT NULL,
  Phone VARCHAR(20) UNIQUE NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  Status VARCHAR(50) NOT NULL,
  CreatedAt TIMESTAMP DEFAULT NOW(),
  UpdatedAt TIMESTAMP DEFAULT NOW(),
  IsEmailVerified BIT DEFAULT 0,
  IsPhoneVerified BIT DEFAULT 0
);

CREATE TABLE OtpVerification (
  OtpId UUID PRIMARY KEY,
  UserId UUID NOT NULL FOREIGN KEY REFERENCES Users(UserId),
  OtpCode VARCHAR(6) NOT NULL,
  ExpiresAt TIMESTAMP NOT NULL,
  IsUsed BIT DEFAULT 0,
  CreatedAt TIMESTAMP DEFAULT NOW()
);
```

---

#### **Story: CUST-INT-001 - Email Verification Integration**
- **Title:** Send verification email via email service
- **Type:** Integration
- **Module:** Authentication
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 3 points

**Description:**  
After user registration, send verification email with OTP link to confirm email address.

**Acceptance Criteria:**
- AC-1: Call SendGrid API to send email
- AC-2: Email template includes user name and OTP code
- AC-3: OTP link expires in 15 minutes
- AC-4: Include fallback mechanism if email send fails
- AC-5: Log email send attempt and response
- AC-6: Retry logic: 3 attempts with 5-second delay

**Integration Details:**
- **Service:** SendGrid
- **Template:** Verification Email Template
- **Retry Policy:** Exponential backoff (5s, 10s, 15s)
- **Fallback:** Store in database with "EMAIL_PENDING" status
- **Success Metric:** Email delivered within 2 seconds

---

### 2.2 Email Verification Page

#### **Story: CUST-FE-002 - Email Verification UI**
- **Title:** Display OTP verification form
- **Type:** Frontend
- **Module:** Authentication
- **Page:** Verify Email Page
- **Priority:** Critical
- **Complexity:** 3 points

**Description:**  
As a user receiving verification email, I want to enter the OTP and verify my email address.

**Acceptance Criteria:**
- AC-1: Display OTP input field (6 digits)
- AC-2: Automatically move focus between digit inputs
- AC-3: Show "Resend OTP" button (disabled for 60 seconds initially)
- AC-4: Display countdown timer for resend button
- AC-5: Validate OTP on blur of last digit
- AC-6: Show loading state during verification
- AC-7: Display error message if OTP is invalid
- AC-8: Redirect to login page after successful verification

**Component Structure:**
```
VerifyEmailPage
├── OtpInput (6 separate inputs)
├── ResendButton
├── Timer
└── SubmitButton
```

---

#### **Story: CUST-BE-002 - Verify Email OTP Endpoint**
- **Title:** Validate OTP and activate user account
- **Type:** Backend
- **Module:** Authentication
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 4 points

**Description:**  
Verify the OTP provided by user and mark email as verified.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/auth/verify-email
- AC-2: Check if OTP matches and not expired
- AC-3: Mark user status as "ACTIVE"
- AC-4: Mark IsEmailVerified = 1
- AC-5: Delete OTP record after successful verification
- AC-6: Return 400 if OTP is invalid or expired
- AC-7: Return 404 if user not found
- AC-8: Log successful verification

**API Specification:**
```json
POST /api/v1/auth/verify-email
Request:
{
  "userId": "UUID",
  "otp": "123456"
}

Response (200):
{
  "success": true,
  "message": "Email verified successfully",
  "redirectUrl": "/login"
}

Error Response (400):
{
  "success": false,
  "error": "Invalid or expired OTP",
  "code": "INVALID_OTP"
}
```

---

### 2.3 Login Page

#### **Story: CUST-FE-003 - Login Form UI**
- **Title:** Display user login form
- **Type:** Frontend
- **Module:** Authentication
- **Page:** Login Page
- **Priority:** Critical
- **Complexity:** 4 points

**Description:**  
As a registered user, I want to login to the platform using email and password.

**Acceptance Criteria:**
- AC-1: Display email and password input fields
- AC-2: Show "Remember Me" checkbox
- AC-3: Show "Forgot Password?" link
- AC-4: Implement form validation
- AC-5: Show loading state during login
- AC-6: Display error message for invalid credentials
- AC-7: Store auth token in secure HTTP-only cookie
- AC-8: Redirect to dashboard after successful login
- AC-9: Show rate-limit warning after 5 failed attempts
- AC-10: Lock account for 15 minutes after 10 failed attempts

**Technical Requirements:**
- Use JWT token storage (HTTP-only cookie)
- Implement local storage for "Remember Me" (hashed email only)
- Client-side validation before API call
- Session timeout: 30 minutes

---

#### **Story: CUST-BE-003 - Login Authentication Endpoint**
- **Title:** Authenticate user and generate session
- **Type:** Backend
- **Module:** Authentication
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 5 points

**Description:**  
Authenticate user credentials and generate JWT token for session management.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/auth/login
- AC-2: Validate email exists and is verified
- AC-3: Compare password hash with bcrypt
- AC-4: Generate JWT token (expires in 30 minutes)
- AC-5: Generate refresh token (expires in 7 days)
- AC-6: Implement rate limiting: 5 attempts per minute per IP
- AC-7: Lock account after 10 failed attempts for 15 minutes
- AC-8: Log login attempt with IP address
- AC-9: Return 401 for invalid credentials
- AC-10: Send login alert email to user

**API Specification:**
```json
POST /api/v1/auth/login
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "rememberMe": true
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 1800,
  "user": {
    "userId": "UUID",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "firstName": "John"
  }
}

Error Response (401):
{
  "success": false,
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS"
}
```

---

### 2.4 Password Management

#### **Story: CUST-FE-004 - Forgot Password Form**
- **Title:** Display password reset request form
- **Type:** Frontend
- **Module:** Authentication
- **Page:** Forgot Password Page
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
As a user who forgot password, I want to request a password reset.

**Acceptance Criteria:**
- AC-1: Display email input field
- AC-2: Validate email format
- AC-3: Show loading state during submission
- AC-4: Display success message after submission
- AC-5: Redirect to login with message after 3 seconds
- AC-6: Show message: "Check your email for reset link"

---

#### **Story: CUST-BE-004 - Forgot Password Endpoint**
- **Title:** Generate and send password reset token
- **Type:** Backend
- **Module:** Authentication
- **Page:** N/A
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Generate password reset token and send via email.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/auth/forgot-password
- AC-2: Generate reset token with 1-hour expiry
- AC-3: Send email with reset link
- AC-4: Log password reset request
- AC-5: Return 200 whether email exists or not (security)
- AC-6: Store reset token in database

---

#### **Story: CUST-FE-005 - Password Reset Form**
- **Title:** Display password reset form
- **Type:** Frontend
- **Module:** Authentication
- **Page:** Reset Password Page
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Allow user to reset password using reset token from email.

**Acceptance Criteria:**
- AC-1: Extract token from URL query parameter
- AC-2: Display new password and confirm password fields
- AC-3: Show password strength indicator
- AC-4: Validate password requirements
- AC-5: Show error if token is expired
- AC-6: Redirect to login after successful reset

---

#### **Story: CUST-BE-005 - Reset Password Endpoint**
- **Title:** Validate token and update password
- **Type:** Backend
- **Module:** Authentication
- **Page:** N/A
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Validate reset token and update user password.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/auth/reset-password
- AC-2: Validate reset token exists and not expired
- AC-3: Hash new password with bcrypt
- AC-4: Update password in database
- AC-5: Delete reset token after use
- AC-6: Send confirmation email
- AC-7: Invalidate all existing sessions

---

## 3. CUSTOMER PORTAL MODULE

### 3.1 Dashboard Page

#### **Story: DASH-FE-001 - Customer Dashboard UI**
- **Title:** Display customer dashboard with loan applications
- **Type:** Frontend
- **Module:** Customer Portal
- **Page:** Dashboard
- **Priority:** Critical
- **Complexity:** 8 points

**Description:**  
As a logged-in customer, I want to see my dashboard with an overview of my loan applications.

**Acceptance Criteria:**
- AC-1: Display welcome message with user name
- AC-2: Show statistics cards: Total Applications, Approved, Pending, Rejected
- AC-3: Display list of all applications in table format
- AC-4: Show columns: Application ID, Type, Amount, Status, Date, Action
- AC-5: Implement sorting by Date, Status, Amount
- AC-6: Implement filtering by Status and Loan Type
- AC-7: Add pagination (10 records per page)
- AC-8: Show "Apply for New Loan" button
- AC-9: Highlight recent applications (last 24 hours)
- AC-10: Add quick action buttons: View Details, Download PDF

**Component Structure:**
```
CustomerDashboard
├── WelcomeSection
├── StatisticsCards
│   ├── TotalApplications
│   ├── ApprovedApplications
│   ├── PendingApplications
│   └── RejectedApplications
├── ApplicationsTable
│   ├── Filters (Status, Type)
│   ├── Sorting
│   ├── Pagination
│   └── ActionButtons
└── ApplyNewLoanButton
```

**API Call:**
```
GET /api/v1/applications?page=1&limit=10&status=&type=&sortBy=date&sortOrder=desc
```

---

#### **Story: DASH-BE-001 - Get Customer Applications Endpoint**
- **Title:** Retrieve customer's loan applications
- **Type:** Backend
- **Module:** Customer Portal
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 5 points

**Description:**  
Retrieve all loan applications for authenticated customer with filtering and sorting.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/applications
- AC-2: Authenticate using JWT token
- AC-3: Support filtering: status, loanType, dateRange
- AC-4: Support sorting: date, status, amount
- AC-5: Support pagination: page, limit (max 100)
- AC-6: Return only authenticated user's applications
- AC-7: Include application status, amount, dates
- AC-8: Include document submission status

**API Response:**
```json
GET /api/v1/applications?page=1&limit=10&status=SUBMITTED&sortBy=date&sortOrder=desc

Response (200):
{
  "success": true,
  "data": {
    "applications": [
      {
        "applicationId": "APP-001",
        "loanType": "PERSONAL",
        "amount": 50000,
        "tenure": 36,
        "status": "SUBMITTED",
        "createdAt": "2026-05-21T10:00:00Z",
        "submittedAt": "2026-05-21T10:05:00Z",
        "documentStatus": "PENDING",
        "nextStep": "Upload required documents"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    },
    "statistics": {
      "totalApplications": 5,
      "approved": 2,
      "pending": 2,
      "rejected": 1
    }
  }
}
```

---

### 3.2 Profile Page

#### **Story: PROF-FE-001 - Customer Profile View**
- **Title:** Display and edit customer profile
- **Type:** Frontend
- **Module:** Customer Portal
- **Page:** Profile Page
- **Priority:** High
- **Complexity:** 6 points

**Description:**  
As a customer, I want to view and update my profile information.

**Acceptance Criteria:**
- AC-1: Display customer information: Name, Email, Phone, DOB, Gender
- AC-2: Display address: Street, City, State, Postal Code
- AC-3: Display account status and creation date
- AC-4: Show edit button to modify information
- AC-5: Implement edit mode with form validation
- AC-6: Show confirmation dialog before saving changes
- AC-7: Display success message after update
- AC-8: Show password change option
- AC-9: Display account security section: 2FA, login history
- AC-10: Add logout button

**Form Fields:**
- First Name, Last Name, Email (read-only), Phone
- Date of Birth, Gender, Marital Status
- Street Address, City, State, Postal Code, Country

---

#### **Story: PROF-BE-001 - Get Customer Profile Endpoint**
- **Title:** Retrieve customer profile information
- **Type:** Backend
- **Module:** Customer Portal
- **Page:** N/A
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Retrieve authenticated customer's profile information.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/profile
- AC-2: Authenticate using JWT token
- AC-3: Return all customer information
- AC-4: Return account status and dates
- AC-5: Return contact information
- AC-6: Exclude sensitive data (password hash)

---

#### **Story: PROF-BE-002 - Update Customer Profile Endpoint**
- **Title:** Update customer profile information
- **Type:** Backend
- **Module:** Customer Portal
- **Page:** N/A
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Update authenticated customer's profile information.

**Acceptance Criteria:**
- AC-1: Endpoint: PUT /api/v1/profile
- AC-2: Authenticate using JWT token
- AC-3: Validate all input fields
- AC-4: Allow updates: Name, DOB, Gender, Address, Phone
- AC-5: Prevent email change (email is unique identifier)
- AC-6: Update UpdatedAt timestamp
- AC-7: Log profile update
- AC-8: Return 400 for invalid data
- AC-9: Return updated profile in response

---

## 4. LOAN APPLICATION MODULE

### 4.1 Loan Application Creation

#### **Story: LOAN-FE-001 - Loan Type Selection**
- **Title:** Display loan type selection page
- **Type:** Frontend
- **Module:** Loan Application
- **Page:** Select Loan Type Page
- **Priority:** Critical
- **Complexity:** 3 points

**Description:**  
As a customer wanting to apply for a loan, I want to select the type of loan I need.

**Acceptance Criteria:**
- AC-1: Display 3 loan type cards: Personal, Home, Auto
- AC-2: Show loan type descriptions and benefits
- AC-3: Show indicative interest rates for each type
- AC-4: Show quick loan features for each type
- AC-5: Clicking card redirects to application form
- AC-6: Show loan calculator link on each card
- AC-7: Responsive card layout for mobile

**Loan Type Details:**
- **Personal Loan:** 10,000 - 500,000, 12-60 months, 10-15% interest
- **Home Loan:** 500,000 - 10,000,000, 60-240 months, 6-10% interest
- **Auto Loan:** 100,000 - 2,000,000, 24-84 months, 7-12% interest

---

#### **Story: LOAN-FE-002 - Multi-Step Application Form UI**
- **Title:** Display multi-step loan application form
- **Type:** Frontend
- **Module:** Loan Application
- **Page:** Loan Application Form
- **Priority:** Critical
- **Complexity:** 10 points

**Description:**  
As a customer applying for a loan, I want to fill out a multi-step form with validation and progress tracking.

**Acceptance Criteria:**
- AC-1: Display progress indicator showing current step (1/4, 2/4, etc.)
- AC-2: Show step titles: Personal Info, Employment, Financial, Loan Details
- AC-3: Implement form validation on each step
- AC-4: Show "Previous" and "Next" buttons
- AC-5: Disable "Previous" button on step 1
- AC-6: Disable "Next" button until current step is valid
- AC-7: Show "Save as Draft" button
- AC-8: Show confirmation page before final submission
- AC-9: Display "Finish" button on final step
- AC-10: Store form data in local state

**Step 1: Personal Information**
- Fields: First Name, Last Name, Email, Phone, DOB, Gender, Marital Status
- Validation: All required, email format, DOB valid date

**Step 2: Employment Information**
- Fields: Company Name, Designation, Employment Type, Annual Income, Years in Job
- Validation: All required, income > 0, years valid

**Step 3: Financial Information**
- Fields: Existing Loans, Monthly Expenses, Monthly Income, Other Sources
- Validation: All required, amounts valid

**Step 4: Loan Details**
- Fields: Loan Amount, Tenure (months), Purpose
- Validation: Amount within range, tenure valid

**Component Structure:**
```
LoanApplicationForm
├── ProgressBar
├── StepContainer
│   ├── Step1PersonalInfo
│   │   ├── FirstNameInput
│   │   ├── LastNameInput
│   │   ├── EmailInput
│   │   ├── PhoneInput
│   │   ├── DOBInput
│   │   ├── GenderSelect
│   │   └── MaritalStatusSelect
│   ├── Step2EmploymentInfo
│   ├── Step3FinancialInfo
│   └── Step4LoanDetails
├── NavigationButtons
│   ├── PreviousButton
│   ├── SaveDraftButton
│   └── NextButton
└── ConfirmationPage
```

---

#### **Story: LOAN-FE-003 - Application Draft Save**
- **Title:** Save application as draft
- **Type:** Frontend
- **Module:** Loan Application
- **Page:** Loan Application Form
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
As a customer, I want to save my application as draft and continue later.

**Acceptance Criteria:**
- AC-1: Clicking "Save as Draft" button saves current form data
- AC-2: Show loading state during save
- AC-3: Display success message: "Application saved as draft"
- AC-4: Store draft on backend
- AC-5: Redirect to dashboard after save
- AC-6: Allow customer to resume draft from dashboard

---

#### **Story: LOAN-BE-001 - Create Loan Application Endpoint**
- **Title:** Create new loan application
- **Type:** Backend
- **Module:** Loan Application
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 6 points

**Description:**  
Create new loan application with customer data and store in database.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/applications
- AC-2: Authenticate using JWT token
- AC-3: Validate all required fields
- AC-4: Generate unique application ID (format: APP-XXXXXX)
- AC-5: Set initial status: SUBMITTED
- AC-6: Store customer information
- AC-7: Validate loan amount within type limits
- AC-8: Calculate initial EMI
- AC-9: Send confirmation email with Application ID
- AC-10: Return application ID in response

**API Specification:**
```json
POST /api/v1/applications
Request:
{
  "loanType": "PERSONAL",
  "amount": 50000,
  "tenure": 36,
  "purpose": "Business Expansion",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-15",
    "gender": "MALE",
    "maritalStatus": "MARRIED"
  },
  "employmentInfo": {
    "companyName": "Tech Corp",
    "designation": "Manager",
    "employmentType": "PERMANENT",
    "annualIncome": 600000,
    "yearsInJob": 3
  },
  "financialInfo": {
    "existingLoans": 100000,
    "monthlyExpenses": 30000,
    "monthlyIncome": 50000
  },
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

Response (201):
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "APP-001234",
  "referenceNumber": "REF-20260521-001",
  "nextSteps": "Please upload required documents",
  "applicantName": "John Doe"
}
```

**Database Schema:**
```sql
CREATE TABLE Applications (
  ApplicationId UUID PRIMARY KEY,
  UserId UUID NOT NULL FOREIGN KEY REFERENCES Users(UserId),
  LoanType VARCHAR(50) NOT NULL,
  LoanAmount DECIMAL(15,2) NOT NULL,
  Tenure INT NOT NULL,
  Purpose VARCHAR(255) NOT NULL,
  Status VARCHAR(50) NOT NULL DEFAULT 'SUBMITTED',
  CreatedAt TIMESTAMP DEFAULT NOW(),
  SubmittedAt TIMESTAMP NULL,
  ApprovedAt TIMESTAMP NULL,
  RejectedAt TIMESTAMP NULL,
  RejectionReason VARCHAR(500) NULL,
  CalculatedEMI DECIMAL(10,2) NOT NULL,
  ApprovedAmount DECIMAL(15,2) NULL,
  ApprovedRate DECIMAL(5,2) NULL
);

CREATE TABLE ApplicationDetails (
  DetailId UUID PRIMARY KEY,
  ApplicationId UUID NOT NULL FOREIGN KEY REFERENCES Applications(ApplicationId),
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  DateOfBirth DATE NOT NULL,
  Gender VARCHAR(20) NOT NULL,
  MaritalStatus VARCHAR(50) NOT NULL,
  CompanyName VARCHAR(255) NOT NULL,
  Designation VARCHAR(100) NOT NULL,
  EmploymentType VARCHAR(50) NOT NULL,
  AnnualIncome DECIMAL(15,2) NOT NULL,
  YearsInJob INT NOT NULL,
  ExistingLoans DECIMAL(15,2) NOT NULL,
  MonthlyExpenses DECIMAL(15,2) NOT NULL,
  Street VARCHAR(255) NOT NULL,
  City VARCHAR(100) NOT NULL,
  State VARCHAR(100) NOT NULL,
  PostalCode VARCHAR(20) NOT NULL,
  Country VARCHAR(100) NOT NULL
);
```

---

#### **Story: LOAN-BE-002 - Save Application as Draft**
- **Title:** Save draft application
- **Type:** Backend
- **Module:** Loan Application
- **Page:** N/A
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Save application as draft for later completion.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/applications/draft
- AC-2: Set application status to DRAFT
- AC-3: Allow partial data submission (not all fields required)
- AC-4: Generate application ID
- AC-5: Store current step number
- AC-6: Return draft details for resume
- AC-7: Set draft expiry to 30 days

---

#### **Story: LOAN-BE-003 - Resume Draft Application**
- **Title:** Retrieve and resume draft application
- **Type:** Backend
- **Module:** Loan Application
- **Page:** N/A
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Retrieve saved draft application for customer to resume filling.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/applications/{applicationId}/draft
- AC-2: Check if draft belongs to authenticated user
- AC-3: Check if draft is not expired
- AC-4: Return all saved data
- AC-5: Return current step number
- AC-6: Return 404 if draft expired or not found

---

### 4.2 EMI Calculation

#### **Story: LOAN-FE-004 - EMI Calculation Display**
- **Title:** Show EMI calculation in application form
- **Type:** Frontend
- **Module:** Loan Application
- **Page:** Loan Application Form (Step 4)
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Show calculated EMI in real-time as customer adjusts loan amount and tenure.

**Acceptance Criteria:**
- AC-1: Display EMI calculation section on Step 4
- AC-2: Show formula: EMI = P[r(1+r)^n]/[(1+r)^n-1]
- AC-3: Real-time calculation when amount or tenure changes
- AC-4: Display: Monthly EMI, Total Interest, Total Amount Payable
- AC-5: Show amortization schedule preview (first 3 months)
- AC-6: Add "View Full Schedule" link
- AC-7: Show calculation breakdowns in card format

---

#### **Story: LOAN-BE-004 - Calculate EMI Endpoint**
- **Title:** Calculate EMI for loan amount
- **Type:** Backend
- **Module:** Loan Application
- **Page:** N/A
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Calculate EMI based on loan parameters and interest rate.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/loans/calculate-emi
- AC-2: Input: loanAmount, tenure, interestRate
- AC-3: Calculate monthly EMI
- AC-4: Calculate total interest
- AC-5: Calculate total payable amount
- AC-6: Validate inputs (amount > 0, tenure > 0, rate >= 0)
- AC-7: Return results with formatting for display

**API Specification:**
```json
POST /api/v1/loans/calculate-emi
Request:
{
  "loanAmount": 500000,
  "tenure": 36,
  "annualInterestRate": 10.5
}

Response (200):
{
  "success": true,
  "data": {
    "monthlyEMI": 16088.24,
    "totalInterest": 78176.64,
    "totalPayable": 578176.64,
    "interestRate": 10.5,
    "monthlyRate": 0.875
  }
}
```

---

### 4.3 Application Submission & Confirmation

#### **Story: LOAN-FE-005 - Application Confirmation Page**
- **Title:** Display application confirmation before submission
- **Type:** Frontend
- **Module:** Loan Application
- **Page:** Application Confirmation
- **Priority:** Critical
- **Complexity:** 5 points

**Description:**  
Show all entered details for review before final submission.

**Acceptance Criteria:**
- AC-1: Display all entered information organized by sections
- AC-2: Show loan details summary
- AC-3: Show personal information section
- AC-4: Show employment information section
- AC-5: Show calculated EMI and payment details
- AC-6: Show disclaimer/terms checkbox (required)
- AC-7: Disable Submit button until checkbox is checked
- AC-8: Show "Edit" buttons for each section
- AC-9: Show "Cancel" button to return to dashboard
- AC-10: Implement loading state during submission

---

#### **Story: LOAN-BE-005 - Submit Loan Application Endpoint**
- **Title:** Final submission of loan application
- **Type:** Backend
- **Module:** Loan Application
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 6 points

**Description:**  
Final submission of complete loan application with all validations.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/applications/{applicationId}/submit
- AC-2: Verify all required fields are filled
- AC-3: Update application status to "UNDER_REVIEW"
- AC-4: Set submittedAt timestamp
- AC-5: Create initial application workflow entry
- AC-6: Trigger document upload request email
- AC-7: Trigger admin notification
- AC-8: Return reference number and next steps
- AC-9: Log submission with all details

---

#### **Story: LOAN-INT-001 - Application Submission Notification**
- **Title:** Send application submission confirmation email
- **Type:** Integration
- **Module:** Loan Application
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 3 points

**Description:**  
Send confirmation email to customer after application submission with reference number and next steps.

**Acceptance Criteria:**
- AC-1: Send email via SendGrid
- AC-2: Include application ID and reference number
- AC-3: Include loan details summary
- AC-4: Include next steps and document upload link
- AC-5: Include expected timeline for review
- AC-6: Add link to track application status
- AC-7: Retry 3 times if send fails

---

## 5. DOCUMENT MANAGEMENT MODULE

### 5.1 Document Upload

#### **Story: DOC-FE-001 - Document Upload UI**
- **Title:** Display document upload interface
- **Type:** Frontend
- **Module:** Document Management
- **Page:** Upload Documents
- **Priority:** Critical
- **Complexity:** 7 points

**Description:**  
As a customer with submitted application, I want to upload required documents.

**Acceptance Criteria:**
- AC-1: Display list of required documents based on loan type
- AC-2: Show upload status for each document (Not Uploaded, Uploaded, Verified)
- AC-3: Implement drag-and-drop upload for each document
- AC-4: Show file input with browse button
- AC-5: Show file size limit (5MB) and allowed formats (PDF, JPG, PNG)
- AC-6: Validate file before upload (size, format, virus scan)
- AC-7: Show progress bar during upload
- AC-8: Display uploaded file preview option
- AC-9: Allow file replacement
- AC-10: Show success message after upload
- AC-11: Disable further actions until all required documents uploaded

**Required Documents:**
- Personal Loan: ID Proof, Income Proof (Salary Slip), Bank Statement
- Home Loan: ID Proof, Income Proof, Bank Statement, Property Documents, Affidavit
- Auto Loan: ID Proof, Income Proof, Bank Statement, Auto Insurance Quote

**Component Structure:**
```
DocumentUploadPage
├── DocumentList
│   └── DocumentCard (repeatable)
│       ├── DocumentName
│       ├── DocumentStatus
│       ├── UploadStatus
│       ├── DragDropArea
│       ├── FileInput
│       ├── ProgressBar
│       ├── FilePreview
│       └── RemoveButton
├── UploadSummary
└── SubmitButton
```

---

#### **Story: DOC-BE-001 - Upload Document Endpoint**
- **Title:** Handle document upload and storage
- **Type:** Backend
- **Module:** Document Management
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 7 points

**Description:**  
Receive document upload, validate, encrypt, and store in secure storage.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/applications/{applicationId}/documents
- AC-2: Authenticate using JWT token
- AC-3: Validate file format (PDF, JPG, PNG only)
- AC-4: Validate file size (max 5MB)
- AC-5: Scan for viruses using antivirus API
- AC-6: Encrypt file using AES-256
- AC-7: Generate unique file name with timestamp
- AC-8: Store in Azure Blob Storage with access control
- AC-9: Store metadata in database (filename, size, hash, uploadedAt)
- AC-10: Return document ID and upload confirmation
- AC-11: Log upload with user ID and filename

**API Specification:**
```json
POST /api/v1/applications/{applicationId}/documents
Content-Type: multipart/form-data
Request:
{
  "applicationId": "APP-001",
  "documentType": "ID_PROOF",
  "file": <binary file data>
}

Response (201):
{
  "success": true,
  "message": "Document uploaded successfully",
  "documentId": "DOC-12345",
  "documentType": "ID_PROOF",
  "fileName": "id_proof_001.pdf",
  "uploadedAt": "2026-05-21T10:30:00Z",
  "fileHash": "sha256hash...",
  "status": "UPLOADED"
}
```

**Database Schema:**
```sql
CREATE TABLE ApplicationDocuments (
  DocumentId UUID PRIMARY KEY,
  ApplicationId UUID NOT NULL FOREIGN KEY REFERENCES Applications(ApplicationId),
  DocumentType VARCHAR(100) NOT NULL,
  OriginalFileName VARCHAR(255) NOT NULL,
  StoredFileName VARCHAR(255) NOT NULL,
  FileSize INT NOT NULL,
  FileHash VARCHAR(255) NOT NULL,
  ContentType VARCHAR(100) NOT NULL,
  BlobUrl VARCHAR(500) NOT NULL,
  IsEncrypted BIT DEFAULT 1,
  EncryptionKey VARCHAR(255) NOT NULL,
  VirusScanStatus VARCHAR(50) NOT NULL,
  VerificationStatus VARCHAR(50) DEFAULT 'PENDING',
  VerifiedBy VARCHAR(100) NULL,
  VerifiedAt TIMESTAMP NULL,
  RejectionReason VARCHAR(500) NULL,
  UploadedAt TIMESTAMP DEFAULT NOW(),
  UpdatedAt TIMESTAMP DEFAULT NOW()
);
```

---

#### **Story: DOC-FE-002 - Document Verification Status**
- **Title:** Display document verification status
- **Type:** Frontend
- **Module:** Document Management
- **Page:** Upload Documents / Application Details
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Show verification status of each uploaded document.

**Acceptance Criteria:**
- AC-1: Display status icons: Uploaded, Under Review, Verified, Rejected
- AC-2: Show comment from admin if rejected
- AC-3: Allow re-upload if rejected
- AC-4: Show estimated review time
- AC-5: Display verification date when approved

---

#### **Story: DOC-BE-002 - Get Document Status Endpoint**
- **Title:** Retrieve document verification status
- **Type:** Backend
- **Module:** Document Management
- **Page:** N/A
- **Priority:** High
- **Complexity:** 2 points

**Description:**  
Get current status of uploaded documents.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/applications/{applicationId}/documents
- AC-2: Return all documents for application
- AC-3: Include verification status for each
- AC-4: Include rejection reason if rejected
- AC-5: Only return user's own documents

---

### 5.2 Document Review (Admin)

#### **Story: DOC-BE-003 - Verify Document Endpoint (Admin)**
- **Title:** Verify or reject uploaded document
- **Type:** Backend
- **Module:** Document Management
- **Page:** N/A
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Admin endpoint to verify or reject customer documents.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/documents/{documentId}/verify
- AC-2: Authenticate as admin/loan officer
- AC-3: Allow status update: VERIFIED, REJECTED
- AC-4: Allow adding rejection reason
- AC-5: Log action with admin ID
- AC-6: Send notification to customer
- AC-7: Update verification date

**API Specification:**
```json
POST /api/v1/documents/{documentId}/verify
Request:
{
  "status": "VERIFIED",
  "rejectionReason": null
}

Response (200):
{
  "success": true,
  "message": "Document verified",
  "documentId": "DOC-12345",
  "status": "VERIFIED"
}
```

---

## 6. APPLICATION TRACKING MODULE

### 6.1 Application Status Tracking

#### **Story: TRACK-FE-001 - Application Status Timeline**
- **Title:** Display application status timeline
- **Type:** Frontend
- **Module:** Application Tracking
- **Page:** Application Details
- **Priority:** Critical
- **Complexity:** 6 points

**Description:**  
As a customer, I want to see the complete status timeline of my application.

**Acceptance Criteria:**
- AC-1: Display vertical timeline showing all status changes
- AC-2: Show status steps: Submitted → Under Review → Approved/Rejected
- AC-3: Highlight current status
- AC-4: Show date and time for each status change
- AC-5: Show comments from loan officer for each step
- AC-6: Show expected timeline (e.g., "Review: 3-5 days")
- AC-7: Show next expected action
- AC-8: Color-code statuses (green=approved, red=rejected, blue=pending)

**Status Workflow:**
```
1. SUBMITTED (Customer submits) → Awaiting Documents
2. DOCUMENTS_SUBMITTED → Under Document Review (1-2 days)
3. DOCUMENTS_VERIFIED → Credit Check In Progress (2-3 days)
4. UNDER_REVIEW → Final Review (1-2 days)
5. APPROVED → Offer Sent
   OR
   REJECTED → Rejection Reason Provided
```

**Component Structure:**
```
ApplicationTimeline
├── TimelineHeader
├── TimelineSteps (dynamic)
│   └── TimelineStep (repeatable)
│       ├── StatusIcon
│       ├── StatusTitle
│       ├── StatusDate
│       ├── Comments
│       ├── Documents
│       └── NextAction
└── CurrentStatusCard
```

---

#### **Story: TRACK-BE-001 - Get Application Timeline**
- **Title:** Retrieve application status timeline
- **Type:** Backend
- **Module:** Application Tracking
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 4 points

**Description:**  
Retrieve complete status history and timeline for application.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/applications/{applicationId}/timeline
- AC-2: Return all status changes chronologically
- AC-3: Include timestamps and comments
- AC-4: Include acting user (who made change)
- AC-5: Return current status and next steps
- AC-6: Include document verification status

**API Response:**
```json
GET /api/v1/applications/APP-001/timeline

Response (200):
{
  "success": true,
  "data": {
    "applicationId": "APP-001",
    "currentStatus": "UNDER_REVIEW",
    "currentStatusDate": "2026-05-21T14:00:00Z",
    "timeline": [
      {
        "stepNumber": 1,
        "status": "SUBMITTED",
        "statusDate": "2026-05-21T10:00:00Z",
        "comment": "Application submitted successfully",
        "actionBy": "System",
        "documents": ["ID_PROOF", "INCOME_PROOF"]
      },
      {
        "stepNumber": 2,
        "status": "DOCUMENTS_VERIFIED",
        "statusDate": "2026-05-21T12:00:00Z",
        "comment": "All documents verified",
        "actionBy": "Loan Officer John",
        "documentsStatus": "VERIFIED"
      },
      {
        "stepNumber": 3,
        "status": "UNDER_REVIEW",
        "statusDate": "2026-05-21T14:00:00Z",
        "comment": "Application under final review",
        "actionBy": "System",
        "expectedResolution": "2026-05-23"
      }
    ]
  }
}
```

**Database Schema:**
```sql
CREATE TABLE ApplicationStatusLog (
  LogId UUID PRIMARY KEY,
  ApplicationId UUID NOT NULL FOREIGN KEY REFERENCES Applications(ApplicationId),
  PreviousStatus VARCHAR(50) NOT NULL,
  NewStatus VARCHAR(50) NOT NULL,
  ChangedBy VARCHAR(100) NOT NULL,
  Comment VARCHAR(500) NULL,
  ChangedAt TIMESTAMP DEFAULT NOW(),
  Metadata JSON NULL
);
```

---

### 6.2 Status Notifications

#### **Story: TRACK-INT-001 - Application Status Change Email**
- **Title:** Send notification on application status change
- **Type:** Integration
- **Module:** Application Tracking
- **Page:** N/A
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Send email notification when application status changes.

**Acceptance Criteria:**
- AC-1: Trigger on each status change
- AC-2: Use SendGrid email service
- AC-3: Include new status and action details
- AC-4: Include link to view application
- AC-5: Include expected next steps
- AC-6: Retry 3 times if send fails
- AC-7: Log email send with status code

---

#### **Story: TRACK-FE-002 - In-App Notifications**
- **Title:** Display in-app notifications for status changes
- **Type:** Frontend
- **Module:** Application Tracking
- **Page:** Dashboard / Application Details
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Show in-app notifications for application updates.

**Acceptance Criteria:**
- AC-1: Display notification badge in header
- AC-2: Show notification dropdown with recent updates
- AC-3: Mark notifications as read/unread
- AC-4: Show notification timestamp
- AC-5: Allow dismiss notifications
- AC-6: Use WebSocket for real-time updates

---

## 7. LOAN CALCULATOR MODULE

### 7.1 EMI Calculator (Public)

#### **Story: CALC-FE-001 - Public Loan Calculator**
- **Title:** Display public loan calculator
- **Type:** Frontend
- **Module:** Loan Calculator
- **Page:** Loan Calculator Page
- **Priority:** High
- **Complexity:** 6 points

**Description:**  
As a prospective customer, I want to calculate EMI for different loan amounts and tenures.

**Acceptance Criteria:**
- AC-1: Accessible without login
- AC-2: Input fields: Loan Type, Amount, Tenure, Interest Rate
- AC-3: Show real-time calculation as user adjusts values
- AC-4: Display: Monthly EMI, Total Interest, Total Amount Payable
- AC-5: Show amortization schedule (first 3 months)
- AC-6: Option to download full amortization schedule as PDF
- AC-7: Show slider for quick tenure adjustment
- AC-8: Preset interest rates for each loan type
- AC-9: Comparison mode for multiple loan scenarios
- AC-10: Responsive design

**Loan Type Details:**
```
Personal Loan:
  Amount Range: 10,000 - 500,000
  Tenure Range: 12 - 60 months
  Interest Rate Range: 10% - 15%

Home Loan:
  Amount Range: 500,000 - 10,000,000
  Tenure Range: 60 - 240 months
  Interest Rate Range: 6% - 10%

Auto Loan:
  Amount Range: 100,000 - 2,000,000
  Tenure Range: 24 - 84 months
  Interest Rate Range: 7% - 12%
```

**Component Structure:**
```
LoanCalculator
├── CalculatorHeader
├── InputSection
│   ├── LoanTypeSelect
│   ├── AmountSlider
│   ├── TenureSlider
│   ├── InterestRateSlider
│   └── ResetButton
├── OutputSection
│   ├── EMICard
│   ├── InterestCard
│   ├── TotalPayableCard
│   └── ComparisonToggle
├── AmortizationPreview
└── DownloadPDFButton
```

---

#### **Story: CALC-BE-001 - Calculate EMI with Amortization**
- **Title:** Calculate EMI and generate amortization schedule
- **Type:** Backend
- **Module:** Loan Calculator
- **Page:** N/A
- **Priority:** High
- **Complexity:** 4 points

**Description:**  
Calculate EMI and create complete amortization schedule.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/calculator/emi
- AC-2: Input: principal, rate, tenure
- AC-3: Calculate monthly EMI
- AC-4: Generate month-by-month amortization
- AC-5: Calculate total interest and total payable
- AC-6: No authentication required
- AC-7: Cache results for 1 hour

**Amortization Calculation:**
```
Monthly Rate = Annual Rate / 12 / 100
Number of Payments = Tenure

EMI = Principal × (Monthly Rate × (1 + Monthly Rate)^n) / ((1 + Monthly Rate)^n - 1)

For each month:
  Interest = Remaining Principal × Monthly Rate
  Principal = EMI - Interest
  Remaining = Remaining - Principal
```

---

#### **Story: CALC-FE-002 - Download Amortization Schedule**
- **Title:** Generate and download amortization schedule PDF
- **Type:** Frontend
- **Module:** Loan Calculator
- **Page:** Loan Calculator Page
- **Priority:** High
- **Complexity:** 5 points

**Description:**  
Download complete amortization schedule as PDF document.

**Acceptance Criteria:**
- AC-1: Download button generates PDF
- AC-2: PDF includes: Loan details, EMI calculation, full schedule
- AC-3: Schedule shows: Month, Payment, Principal, Interest, Balance
- AC-4: Format: Professional table layout
- AC-5: Include branding (logo, company info)
- AC-6: Use jsPDF and html2pdf libraries
- AC-7: File name: `amortization_[date].pdf`

---

## 8. ADMIN PANEL MODULE

### 8.1 Admin Dashboard

#### **Story: ADMIN-FE-001 - Admin Dashboard**
- **Title:** Display admin dashboard with metrics
- **Type:** Frontend
- **Module:** Admin Panel
- **Page:** Admin Dashboard
- **Priority:** High
- **Complexity:** 7 points

**Description:**  
As an admin, I want to see dashboard with key metrics and application management.

**Acceptance Criteria:**
- AC-1: Display key metrics cards: Total Applications, Pending Review, Approved, Rejected
- AC-2: Show approval rate percentage
- AC-3: Show average processing time
- AC-4: Display applications requiring action
- AC-5: Show chart: Applications by Loan Type (pie chart)
- AC-6: Show chart: Applications over time (line chart)
- AC-7: Show recent applications table
- AC-8: Add filters by date range and loan type
- AC-9: Add search functionality

**Metrics:**
- Total Applications (Today, This Month, All Time)
- Pending Reviews (count)
- Approved Today (count)
- Rejected Today (count)
- Average Processing Time (hours)
- Approval Rate (%)
- Document Pending (count)

---

#### **Story: ADMIN-BE-001 - Admin Dashboard Metrics**
- **Title:** Retrieve dashboard metrics
- **Type:** Backend
- **Module:** Admin Panel
- **Page:** N/A
- **Priority:** High
- **Complexity:** 5 points

**Description:**  
Retrieve dashboard metrics and statistics for admin.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/admin/dashboard
- AC-2: Authenticate as admin
- AC-3: Return applications count by status
- AC-4: Return metrics: approval rate, avg processing time
- AC-5: Return recent applications (last 10)
- AC-6: Return chart data: by type, by date
- AC-7: Cache results for 5 minutes
- AC-8: Return 403 if not admin

---

### 8.2 Application Review

#### **Story: ADMIN-FE-002 - Application Review Interface**
- **Title:** Display application for admin review
- **Type:** Frontend
- **Module:** Admin Panel
- **Page:** Application Review
- **Priority:** Critical
- **Complexity:** 8 points

**Description:**  
As a loan officer, I want to review application details and make decisions.

**Acceptance Criteria:**
- AC-1: Display all application information
- AC-2: Show customer personal details
- AC-3: Show employment and financial details
- AC-4: Show uploaded documents with preview
- AC-5: Show document verification status
- AC-6: Add action buttons: Approve, Reject, Request Documents
- AC-7: Show comments section for internal notes
- AC-8: Display previous status history
- AC-9: Show EMI calculation details
- AC-10: Implement keyboard shortcuts for actions

**Component Structure:**
```
ApplicationReview
├── ApplicationHeader
├── CustomerSection
│   ├── PersonalInfo
│   ├── ContactInfo
│   └── AddressInfo
├── LoanDetailsSection
│   ├── LoanInfo
│   └── EMICalculation
├── EmploymentSection
├── FinancialSection
├── DocumentsSection
│   └── DocumentList
│       ├── DocumentPreview
│       └── VerifyButton
├── CommentsSection
│   └── CommentForm
├── HistoryTimeline
└── ActionButtons
```

---

#### **Story: ADMIN-BE-002 - Update Application Status**
- **Title:** Update application status by admin
- **Type:** Backend
- **Module:** Admin Panel
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 5 points

**Description:**  
Update application status with admin action.

**Acceptance Criteria:**
- AC-1: Endpoint: PUT /api/v1/applications/{applicationId}/status
- AC-2: Authenticate as admin/loan officer
- AC-3: Allow status updates: APPROVED, REJECTED, REQUEST_DOCUMENTS
- AC-4: Require rejection reason for rejection
- AC-5: Generate approval offer if approved
- AC-6: Send notification to customer
- AC-7: Log action with admin ID
- AC-8: Store action comments

---

#### **Story: ADMIN-FE-003 - Add Review Comments**
- **Title:** Add internal notes and comments
- **Type:** Frontend
- **Module:** Admin Panel
- **Page:** Application Review
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Add internal comments and notes for application review.

**Acceptance Criteria:**
- AC-1: Display comment input form
- AC-2: Show existing comments with author and timestamp
- AC-3: Allow edit of own comments
- AC-4: Show comment count
- AC-5: Real-time update of comments

---

#### **Story: ADMIN-BE-003 - Add Application Comment**
- **Title:** Store application comment in database
- **Type:** Backend
- **Module:** Admin Panel
- **Page:** N/A
- **Priority:** High
- **Complexity:** 3 points

**Description:**  
Store admin comments on applications.

**Acceptance Criteria:**
- AC-1: Endpoint: POST /api/v1/applications/{applicationId}/comments
- AC-2: Authenticate as admin
- AC-3: Store comment with admin ID, timestamp
- AC-4: Return updated comment list

---

### 8.3 User Management

#### **Story: ADMIN-FE-004 - User Management Interface**
- **Title:** Display user management interface
- **Type:** Frontend
- **Module:** Admin Panel
- **Page:** User Management
- **Priority:** Medium
- **Complexity:** 6 points

**Description:**  
As an admin, I want to manage platform users and their roles.

**Acceptance Criteria:**
- AC-1: Display users in table format
- AC-2: Show columns: Name, Email, Role, Status, CreatedAt, Actions
- AC-3: Add filters by role and status
- AC-4: Add search by name/email
- AC-5: Implement pagination (20 per page)
- AC-6: Add button: Create User
- AC-7: Add action buttons: Edit, Deactivate, Reset Password
- AC-8: Show user details in modal

---

#### **Story: ADMIN-BE-004 - User Management Endpoints**
- **Title:** APIs for user management
- **Type:** Backend
- **Module:** Admin Panel
- **Page:** N/A
- **Priority:** Medium
- **Complexity:** 5 points

**Description:**  
Create APIs for admin user management.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/admin/users (list users)
- AC-2: Endpoint: POST /api/v1/admin/users (create user)
- AC-3: Endpoint: PUT /api/v1/admin/users/{userId} (update user)
- AC-4: Endpoint: DELETE /api/v1/admin/users/{userId} (deactivate user)
- AC-5: Endpoint: POST /api/v1/admin/users/{userId}/reset-password
- AC-6: Support filtering and pagination
- AC-7: Authenticate as admin only

---

### 8.4 Reporting

#### **Story: ADMIN-FE-005 - Reporting Dashboard**
- **Title:** Display reports and analytics
- **Type:** Frontend
- **Module:** Admin Panel
- **Page:** Reports
- **Priority:** Medium
- **Complexity:** 7 points

**Description:**  
As an admin, I want to generate and view reports on applications.

**Acceptance Criteria:**
- AC-1: Display multiple report types: Daily, Weekly, Monthly
- AC-2: Show filter options: Date Range, Loan Type, Status
- AC-3: Display table with: Applications, Approvals, Rejections, Avg Processing Time
- AC-4: Show charts: Approval Rate, Applications by Type, Applications by Date
- AC-5: Add export to Excel button
- AC-6: Add export to PDF button
- AC-7: Store report preferences
- AC-8: Show report generation timestamp

---

#### **Story: ADMIN-BE-005 - Generate Reports**
- **Title:** Generate application reports
- **Type:** Backend
- **Module:** Admin Panel
- **Page:** N/A
- **Priority:** Medium
- **Complexity:** 6 points

**Description:**  
Generate detailed reports on applications and metrics.

**Acceptance Criteria:**
- AC-1: Endpoint: GET /api/v1/admin/reports
- AC-2: Support report types: Daily, Weekly, Monthly, Custom
- AC-3: Support filters: dateRange, loanType, status
- AC-4: Return: count, approvals, rejections, avg processing time
- AC-5: Include chart data for visualization
- AC-6: Support export format: JSON, CSV
- AC-7: Cache reports for 1 hour
- AC-8: Log report generation

---

## 9. INTEGRATION STORIES

### 9.1 Email Service Integration

#### **Story: INT-EMAIL-001 - Email Service Integration**
- **Title:** Integration with email service provider
- **Type:** Integration
- **Module:** Notifications
- **Page:** N/A
- **Priority:** Critical
- **Complexity:** 4 points

**Description:**  
Integrate SendGrid email service for sending emails.

**Acceptance Criteria:**
- AC-1: Use SendGrid API v3
- AC-2: Support multiple email templates
- AC-3: Implement retry logic (3 attempts)
- AC-4: Log all email sends
- AC-5: Track email delivery status
- AC-6: Handle send failures gracefully
- AC-7: Support dynamic template variables

**Email Templates:**
1. Welcome Email (Registration)
2. Email Verification OTP
3. Password Reset Link
4. Application Confirmation
5. Document Upload Request
6. Status Change Notification
7. Approval Offer
8. Rejection Notice

---

### 9.2 Payment Integration (Phase 2)

#### **Story: INT-PAYMENT-001 - Payment Gateway Integration**
- **Title:** Integration with payment gateway
- **Type:** Integration
- **Module:** Payments
- **Page:** N/A
- **Priority:** Medium
- **Complexity:** 6 points

**Description:**  
Integrate payment gateway for loan EMI payments (Phase 2).

**Acceptance Criteria:**
- AC-1: Support Razorpay or Stripe
- AC-2: Generate payment orders
- AC-3: Handle payment callbacks
- AC-4: Store payment records
- AC-5: Generate payment receipts
- AC-6: Support multiple payment methods (Card, UPI, Bank Transfer)
- AC-7: Implement webhook for payment confirmation

---

### 9.3 SMS Notifications (Optional)

#### **Story: INT-SMS-001 - SMS Notification Integration**
- **Title:** Send SMS notifications via SMS provider
- **Type:** Integration
- **Module:** Notifications
- **Page:** N/A
- **Priority:** Low
- **Complexity:** 2 points

**Description:**  
Send SMS notifications for application updates (optional feature).

**Acceptance Criteria:**
- AC-1: Use Twilio or AWS SNS
- AC-2: Support SMS templates
- AC-3: Handle delivery status
- AC-4: Log all SMS sends
- AC-5: Support opt-in/opt-out

---

## 10. SYSTEM INTEGRATION POINTS

### 10.1 Architecture Integration Flow

```
Frontend (React)
    ↓
API Gateway (Azure)
    ↓
Authentication Service (OAuth 2.0/JWT)
    ↓
Application Services
├── Customer Service
├── Application Service
├── Document Service
├── Notification Service
└── Reporting Service
    ↓
Data Layer
├── SQL Server Database
├── Azure Blob Storage (Documents)
└── Redis Cache
    ↓
External Services
├── SendGrid (Email)
├── Azure Key Vault (Secrets)
└── Application Insights (Logging)
```

### 10.2 Data Flow Sequence Diagrams

**Registration Flow:**
```
User → Frontend Form → API → Validation → DB → Email Service → User
        ↓
    Verification OTP Email
    ↓
    User Clicks Link
    ↓
    Frontend → API → DB Update → User Activated
```

**Loan Application Flow:**
```
Customer → Fill Form → Save Draft → Submit → API → DB → Status Log → Email
    ↓
    Dashboard Updates
    ↓
    Documents Upload → Verification → Loan Officer Review → Approval/Rejection
    ↓
    Status Updates → Email/SMS → Customer Notification
```

### 10.3 API Gateway Specifications

**Base URL:** `https://api.smartloan.com/api/v1`

**Authentication:** 
- JWT Token in Authorization header: `Authorization: Bearer {token}`
- Token refresh endpoint: POST `/auth/refresh-token`

**Response Format:**
```json
Success (2xx):
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2026-05-21T10:30:00Z"
}

Error (4xx/5xx):
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2026-05-21T10:30:00Z"
}
```

**Rate Limiting:**
- 100 requests per minute per user
- 1000 requests per minute per API key

**Pagination:**
- Default limit: 10, Max limit: 100
- Offset-based pagination

---

## 11. ACCEPTANCE CRITERIA SUMMARY

### Frontend Stories Checklist
- [ ] All UI components responsive (mobile, tablet, desktop)
- [ ] Form validation implemented
- [ ] Error handling with user-friendly messages
- [ ] Loading states for all async operations
- [ ] Accessibility (WCAG 2.1 Level AA)
- [ ] Keyboard navigation support
- [ ] Loading time < 2 seconds
- [ ] 95% Lighthouse score

### Backend Stories Checklist
- [ ] API endpoints tested with unit tests (>80% coverage)
- [ ] Input validation and sanitization
- [ ] Authentication and authorization checks
- [ ] Error handling with appropriate HTTP codes
- [ ] Logging implemented
- [ ] Database constraints and foreign keys
- [ ] API response time < 500ms
- [ ] Load testing passed (500+ concurrent users)

### Integration Stories Checklist
- [ ] Third-party service integration tested
- [ ] Retry logic implemented
- [ ] Fallback mechanisms in place
- [ ] Webhook handling (if applicable)
- [ ] Service health monitoring
- [ ] Error logging and alerting

---

## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Project Manager | Deepa | - | - |
| Tech Lead | - | - | - |
| Business Analyst | - | - | - |
| QA Lead | - | - | - |

---

**End of Document**

Version History:
- v1.0 (May 20, 2026): Initial BRD
- v2.0 (May 21, 2026): Refined user stories with page-wise and module-wise organization
