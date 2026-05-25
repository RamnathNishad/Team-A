# Business Requirements Document (BRD)
## SmartLoan - Customer & Loan Application Modules

---

## 1. Executive Summary

This BRD outlines detailed requirements for two critical modules of the SmartLoan system: the **Customer Module** and the **Loan Application Module**. These modules form the foundation of the loan origination process, handling customer registration, profile management, and the complete loan application workflow. Together, they enable seamless customer onboarding and efficient loan application processing, directly impacting customer satisfaction and operational efficiency.

---

## 2. Project Overview

### 2.1 Scope
This document covers:
- **Customer Module**: Customer registration, profile management, KYC data, contact management, and preferences
- **Loan Application Module**: Loan application creation, form management, document collection, application status tracking, and lifecycle management

### 2.2 Modules Integration
```
┌─────────────────────────────────────┐
│      Customer Module                │
│  ├─ Customer Registration          │
│  ├─ Profile Management             │
│  ├─ KYC Information                │
│  ├─ Contact Management             │
│  └─ Communication Preferences      │
└────────────────┬────────────────────┘
                 │
                 │ (Customer Link)
                 │
┌────────────────▼────────────────────┐
│   Loan Application Module           │
│  ├─ Application Creation            │
│  ├─ Form Management                 │
│  ├─ Document Collection             │
│  ├─ Application Tracking            │
│  └─ Application Lifecycle           │
└─────────────────────────────────────┘
```

### 2.3 Business Value
- Streamline customer onboarding process
- Enable faster loan applications
- Improve data quality and consistency
- Reduce manual data entry errors
- Enable 24/7 self-service application submission

---

## 3. Business Objectives

### 3.1 Customer Module Objectives
1. **Simplify registration**: Enable customers to register in < 5 minutes
2. **Centralize customer data**: Single source of truth for all customer information
3. **Ensure data quality**: Validate and standardize all customer data
4. **Enable personalization**: Track customer preferences and communication history
5. **Support multi-channel access**: Support web, mobile, and branch-based registration

### 3.2 Loan Application Module Objectives
1. **Automate application**: Reduce manual form filling by 80%
2. **Accelerate processing**: Enable application completion in < 15 minutes
3. **Minimize errors**: Validate data in real-time to reduce resubmissions
4. **Track status**: Provide real-time application status to customers
5. **Support multiple products**: Handle personal loans, home loans, auto loans, etc.

### 3.3 Expected Outcomes
- Customer registration time: < 5 minutes
- Application completion time: < 15 minutes
- Application resubmission rate: < 5%
- Customer satisfaction (registration/application): > 90%
- Data accuracy rate: > 95%

---

## 4. Detailed Module Requirements

## SECTION A: CUSTOMER MODULE

### 4.1 Customer Registration & Onboarding

#### 4.1.1 Registration Flow
```
Start
  │
  ├─→ Channel Selection (Web/Mobile/Branch)
  │     │
  │     └─→ Existing Customer? (Yes/No)
  │           │
  │           ├─ Yes → Login Screen → Dashboard
  │           │
  │           └─ No → Registration Form
  │
  ├─→ Personal Information Collection
  │     ├─ Mobile Number & Email (OTP Verification)
  │     ├─ Full Name & Date of Birth
  │     ├─ Gender & Marital Status
  │     └─ Identification Type (PAN, Aadhar, etc.)
  │
  ├─→ Address Information
  │     ├─ Permanent Address
  │     ├─ Current Residential Address
  │     └─ Address Verification
  │
  ├─→ Employment Information
  │     ├─ Employment Type (Employed/Self-employed/Retired)
  │     ├─ Company Name
  │     ├─ Designation
  │     ├─ Employment Type Duration
  │     └─ Income Details
  │
  ├─→ Document Upload
  │     ├─ ID Proof (PAN, Aadhar, Passport, Driving License)
  │     ├─ Address Proof (Utility Bill, Bank Statement, etc.)
  │     ├─ Income Proof (Salary Slip, Tax Returns, etc.)
  │     └─ Employment Proof (Letter from Employer, etc.)
  │
  ├─→ Account Setup
  │     ├─ Create Login Credentials
  │     ├─ Set Security Questions
  │     └─ Enable MFA (optional)
  │
  ├─→ Communication Preferences
  │     ├─ Preferred Language
  │     ├─ Notification Channel (Email, SMS, Push)
  │     └─ Marketing Consent
  │
  ├─→ Agreement & Consent
  │     ├─ Terms & Conditions
  │     ├─ Privacy Policy
  │     ├─ KYC Acknowledgment
  │     └─ E-sign consent
  │
  └─→ Verification
        ├─ Email Verification (Link)
        ├─ Mobile OTP Verification
        ├─ Automated KYC Checks
        └─ Account Activation

```

#### 4.1.2 Functional Requirements - Registration

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Multi-Channel Registration | Support web, mobile app, and in-branch registration | High |
| OTP Verification | Send OTP to mobile/email for verification | High |
| Document Upload | Support multiple document formats (PDF, JPG, PNG) | High |
| Data Validation | Real-time validation of all input fields | High |
| Duplicate Check | Check for existing customer before registration | High |
| Auto-Fill from Documents | Extract data from uploaded ID/address proofs | Medium |
| Partially Saved Draft | Allow customers to save and resume later | Medium |
| Registration Confirmation | Send welcome email with account details | High |
| Referral Code Support | Support referral code entry during registration | Low |

#### 4.1.3 Data Elements - Registration Form

```
Personal Information Section:
├─ Mobile Number (Required, unique, verified via OTP)
├─ Email Address (Required, unique, verified)
├─ Full Name (Required)
├─ Date of Birth (Required, age > 18)
├─ Gender (Required, Dropdown: Male/Female/Others)
├─ Marital Status (Optional, Dropdown)
├─ PAN (Required if income > 5 lakhs)
├─ Aadhar Number (Optional)
├─ Voter ID (Optional)
└─ Passport Number (Optional)

Address Information Section:
├─ Permanent Address
│  ├─ House/Flat Number
│  ├─ Building Name
│  ├─ Street Name
│  ├─ Area/Locality
│  ├─ City
│  ├─ State
│  ├─ Postal Code
│  ├─ Country
│  └─ Years at Address
├─ Current Residential Address (if different)
└─ Address Verification Status

Employment Information Section:
├─ Employment Status (Employed/Self-employed/Retired/Unemployed/Student)
├─ Company/Organization Name
├─ Designation
├─ Industry/Sector
├─ Employment Type (Permanent/Contractual/Self-employed)
├─ Years in Current Employment
├─ Office Address (if applicable)
└─ Annual Income

Document Upload Section:
├─ Primary ID Proof
│  ├─ Document Type
│  ├─ Document Number
│  ├─ Issue Date
│  ├─ Expiry Date
│  └─ Document Image
├─ Address Proof
├─ Income Proof
└─ Employment Proof

Account Setup Section:
├─ Username (Optional, auto-generated if not provided)
├─ Password
├─ Security Question 1
├─ Security Answer 1
├─ Security Question 2
├─ Security Answer 2
└─ Enable Two-Factor Authentication

Communication Preferences Section:
├─ Preferred Language (English/Hindi/Regional)
├─ Email Notifications (Yes/No)
├─ SMS Notifications (Yes/No)
├─ Push Notifications (Yes/No)
├─ Marketing Communications (Yes/No)
└─ Preferred Contact Time
```

### 4.2 Customer Profile Management

#### 4.2.1 Profile Components

| Component | Description | Edit Permission |
|-----------|-------------|-----------------|
| Personal Details | Name, DOB, gender, marital status | Customer |
| Contact Information | Mobile, email, alternate contact | Customer |
| Address Information | Permanent and residential addresses | Customer |
| Employment Details | Current and past employment | Customer |
| Financial Information | Income, bank accounts | Customer & Admin |
| Document Storage | Uploaded identity and proof documents | Customer & Admin |
| KYC Status | KYC verification status and details | Admin Only |
| Preferences | Communication preferences and settings | Customer |
| Application History | List of submitted applications | View Only |
| Loan Accounts | Active and closed loan accounts | View Only |

#### 4.2.2 Profile Management Features

| Feature | Description | Priority |
|---------|-------------|----------|
| View Full Profile | Complete view of customer information | High |
| Edit Profile | Update personal and contact details | High |
| Change Password | Secure password change option | High |
| Account Security | View login history and active sessions | High |
| Document Management | Upload/update/view documents | High |
| Profile Completeness | Show % of profile completion | Medium |
| Account Deactivation | Option to temporarily disable account | Medium |
| Data Export | Export customer data in PDF/Excel | Medium |
| Profile Picture | Upload and manage profile photo | Low |

#### 4.2.3 Profile Data Structure

```
Customer Profile {
  customerId: "CUST-20260520-001",
  registrationDate: "2026-05-20",
  status: "Active|Inactive|Suspended",
  
  personalDetails: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    phoneticName: "" // For languages
  },
  
  contactInformation: {
    primaryMobile: "",
    alternativeMobile: "",
    emailAddress: "",
    alternativeEmail: ""
  },
  
  addressInformation: {
    permanentAddress: {
      houseNumber: "",
      building: "",
      street: "",
      area: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      yearsAtAddress: 0
    },
    residentialAddress: { /* Same structure */ },
    addressVerificationStatus: ""
  },
  
  employmentInformation: {
    currentEmployment: {
      status: "Employed|Self-employed|Retired|Others",
      companyName: "",
      designation: "",
      industry: "",
      employmentType: "Permanent|Contractual",
      yearsInCurrent: 0,
      officeAddress: "",
      annualIncome: 0
    },
    previousEmployments: [ /* Array */ ]
  },
  
  financialInformation: {
    bankAccounts: [
      {
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountType: "Savings|Current",
        accountStatus: "Active|Inactive"
      }
    ],
    totalAssets: 0,
    totalLiabilities: 0,
    creditScore: 0
  },
  
  documents: {
    identityProof: { documentType: "", fileUrl: "", verificationStatus: "" },
    addressProof: { /* Same */ },
    incomeProof: [ /* Array */ ],
    employmentProof: { /* Same */ }
  },
  
  kycInformation: {
    kycStatus: "Pending|Completed|Failed",
    kycVerificationDate: "",
    kycVerificationBy: "",
    pepCheckStatus: "Passed|Failed",
    sanctionsListStatus: "Clear|Alert"
  },
  
  preferences: {
    preferredLanguage: "English|Hindi",
    emailNotifications: true|false,
    smsNotifications: true|false,
    pushNotifications: true|false,
    marketingConsent: true|false,
    preferredContactTime: "Morning|Afternoon|Evening"
  },
  
  accountSecurity: {
    password: "hashed",
    twoFactorEnabled: true|false,
    securityQuestions: [],
    lastLoginDate: "",
    loginAttempts: 0,
    accountLockedUntil: ""
  },
  
  audit: {
    createdBy: "System|Admin",
    createdAt: "",
    lastModifiedBy: "",
    lastModifiedAt: "",
    lastLoginAt: ""
  }
}
```

### 4.3 KYC & Compliance Data

#### 4.3.1 KYC Verification Workflow

| Step | Task | Responsibility | Status |
|------|------|-----------------|--------|
| 1 | Document Upload | Customer | Pending/Complete |
| 2 | Document Validation | System | Auto-verified/Manual review |
| 3 | Identity Verification | System/Manual | Passed/Failed |
| 4 | Address Verification | System/Third-party | Verified/Pending |
| 5 | PEP Check | System | Passed/Alert |
| 6 | Sanctions List Screening | System | Clear/Alert |
| 7 | Final KYC Approval | Compliance Officer | Approved/Rejected |
| 8 | Customer Notification | System | Sent |

#### 4.3.2 KYC Data Fields

```
KYC Information {
  identityVerification: {
    documentType: "Aadhar|PAN|Passport|DL",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    documentUrl: "",
    ocrExtractionStatus: "Success|Failed",
    manualVerificationRequired: true|false,
    verificationStatus: "Pending|Verified|Failed"
  },
  
  addressVerification: {
    addressProofType: "UtilityBill|BankStatement|etc",
    addressProofUrl: "",
    addressVerificationMethod: "Auto|Manual|ThirdParty",
    verificationStatus: "Verified|Pending|Failed"
  },
  
  pepCheck: {
    pepCheckStatus: "Passed|Alert|Failed",
    pepCheckDate: "",
    pepCheckProvider: "Internal|ThirdParty",
    matchesFound: []
  },
  
  sanctionsListCheck: {
    sanctionsStatus: "Clear|Alert|Failed",
    checkDate: "",
    checkProvider: "ThirdParty",
    matchesFound: []
  },
  
  finalKycStatus: {
    status: "Pending|Approved|Rejected|OnHold",
    approvedDate: "",
    approvedBy: "",
    rejectionReason: "",
    kycValidUntil: ""
  }
}
```

### 4.4 Contact & Communication Management

#### 4.4.1 Contact Types

| Contact Type | Storage | Required | Verified | Updatable |
|--------------|---------|----------|----------|-----------|
| Primary Mobile | Database | Yes | OTP | Yes |
| Alternative Mobile | Database | No | Manual | Yes |
| Email Address | Database | Yes | Link | Yes |
| Alternate Email | Database | No | Manual | Yes |
| Office Contact | Database | No | No | Yes |
| Residence Contact | Database | No | No | Yes |

#### 4.4.2 Communication Preferences

```
Communication Preferences {
  preferredLanguage: "English|Hindi|Regional",
  
  notificationChannels: {
    email: {
      enabled: true|false,
      emailAddress: "",
      preferences: ["ApplicationUpdates", "PromotionalOffers", "ProductNews"]
    },
    sms: {
      enabled: true|false,
      mobileNumber: "",
      preferences: ["ApplicationUpdates", "AccountAlerts", "PaymentReminders"]
    },
    push: {
      enabled: true|false,
      preferences: ["ApplicationUpdates", "ImportantNotices"]
    },
    ivr: {
      enabled: true|false,
      mobileNumber: "",
      preferences: ["PaymentReminders", "AccountAlerts"]
    }
  },
  
  preferredContactTime: "Morning|Afternoon|Evening|AnyTime",
  doNotDisturb: {
    enabled: true|false,
    startTime: "",
    endTime: ""
  },
  
  marketingConsent: true|false,
  consentDate: "",
  privacyPolicyAgreed: true|false,
  termsAgreed: true|false
}
```

---

## SECTION B: LOAN APPLICATION MODULE

### 4.5 Loan Application Creation

#### 4.5.1 Application Initiation Flow

```
Start
  │
  ├─→ New Application or Continue Draft?
  │     │
  │     ├─ New → Select Loan Product
  │     │          │
  │     │          └─ Personal Loan / Home Loan / Auto Loan / etc.
  │     │
  │     └─ Continue Draft → Load Previous Application
  │
  ├─→ Loan Details Form
  │     ├─ Loan Amount Requested
  │     ├─ Loan Purpose
  │     ├─ Loan Tenure (Duration)
  │     ├─ Preferred Disbursement Timeline
  │     └─ Collateral (if applicable)
  │
  ├─→ Financial Details
  │     ├─ Monthly Income
  │     ├─ Other Income Sources
  │     ├─ Monthly Expenses
  │     ├─ Existing Loan Obligations
  │     └─ Savings/Investments
  │
  ├─→ Co-Applicant Information (Optional)
  │     ├─ Relationship to Primary Applicant
  │     ├─ Co-Applicant Details
  │     └─ Income Information
  │
  ├─→ Document Collection
  │     ├─ Required Documents (Salary Slip, Tax Returns, etc.)
  │     ├─ Additional Documents (as needed)
  │     └─ Document Upload Interface
  │
  ├─→ Declaration & Consent
  │     ├─ Information Accuracy Declaration
  │     ├─ Credit Bureau Consent
  │     ├─ Document Verification Consent
  │     └─ Terms & Conditions
  │
  └─→ Application Submission
        ├─ Final Review
        ├─ Confirmation
        └─ Application Reference Number Generation
```

#### 4.5.2 Loan Product Selection

| Product | Min Amount | Max Amount | Min Tenure | Max Tenure | Collateral | Auto-Assessment |
|---------|-----------|-----------|-----------|-----------|-----------|-----------------|
| Personal Loan | 50,000 | 50,00,000 | 12 months | 60 months | No | Yes |
| Home Loan | 10,00,000 | 1,00,00,000 | 120 months | 360 months | Yes | Yes |
| Auto Loan | 2,00,000 | 30,00,000 | 24 months | 84 months | Yes | Yes |
| Business Loan | 5,00,000 | 50,00,000 | 12 months | 84 months | Yes | Yes |
| Education Loan | 1,00,000 | 20,00,000 | 24 months | 120 months | Optional | Yes |

#### 4.5.3 Application Data Structure

```
Loan Application {
  applicationId: "APP-20260520-001",
  applicationNumber: "SMLOAN/20260520/001",
  customerId: "CUST-20260520-001",
  
  applicationMetadata: {
    createdDate: "",
    submittedDate: "",
    lastModifiedDate: "",
    channel: "Web|Mobile|Branch",
    status: "Draft|Submitted|Under Review|Approved|Rejected|Closed",
    statusChangedDate: "",
    statusChangedBy: ""
  },
  
  loanDetails: {
    productType: "Personal|Home|Auto|Business|Education",
    loanAmountRequested: 0,
    loanAmountApproved: 0,
    loanTenure: 0, // in months
    tenureApproved: 0,
    loanPurpose: "",
    purposeCategory: "",
    preferredDisbursementDate: "",
    collateralRequired: true|false,
    collateralDetails: {
      collateralType: "Property|Vehicle|Securities|Others",
      collateralValue: 0,
      collateralDocuments: []
    }
  },
  
  applicantDetails: {
    primaryApplicant: {
      customerId: "",
      name: "",
      dateOfBirth: "",
      mobileNumber: "",
      emailAddress: ""
    },
    coApplicant: {
      customerId: "",
      name: "",
      dateOfBirth: "",
      relationship: "Spouse|Parent|Sibling|Others",
      mobileNumber: "",
      emailAddress: "",
      incomeContribution: 0
    }
  },
  
  financialInformation: {
    monthlyIncome: 0,
    otherIncomeMonthly: 0,
    totalMonthlyIncome: 0,
    
    monthlyExpenses: {
      rent: 0,
      utilities: 0,
      groceries: 0,
      insurance: 0,
      otherExpenses: 0,
      totalExpenses: 0
    },
    
    existingObligations: {
      activeLoanCount: 0,
      totalMonthlyEmiObligation: 0,
      creditCardOutstanding: 0,
      otherObligations: 0,
      totalMonthlyObligation: 0
    },
    
    assets: {
      savingsAccounts: 0,
      fixedDeposits: 0,
      investments: 0,
      realEstate: 0,
      otherAssets: 0,
      totalAssets: 0
    },
    
    debtToIncomeRatio: 0,
    disposableIncomeAfterLoan: 0
  },
  
  documentsRequired: [
    {
      documentType: "Salary Slip",
      documentCategory: "IncomeProof",
      mandatory: true,
      uploadedStatus: "Pending|Uploaded|Verified|Rejected",
      uploadedFileUrl: "",
      uploadedDate: "",
      verificationDate: "",
      verificationStatus: "Pending|Verified|VerificationFailed",
      verificationComments: ""
    }
    // ... more documents
  ],
  
  declarations: {
    informationAccuracy: {
      accepted: true|false,
      acceptanceDate: "",
      acceptedBy: "" // Customer ID
    },
    creditBureauConsent: {
      accepted: true|false,
      acceptanceDate: "",
      bureaus: ["CIBIL", "Equifax", "CRIF"]
    },
    documentVerificationConsent: {
      accepted: true|false,
      acceptanceDate: ""
    },
    termsAndConditions: {
      accepted: true|false,
      acceptanceDate: "",
      version: "1.0"
    }
  },
  
  creditAssessment: {
    creditScore: 0,
    creditScoreDate: "",
    riskRating: "Low|Medium|High|VeryHigh",
    debtorCategory: "Regular|NPA",
    previousDefaultHistory: true|false,
    recommendedApprovalAmount: 0,
    recommendedTenure: 0,
    recommendedInterestRate: 0
  },
  
  approvalWorkflow: {
    stage: 1 to 5, // Current approval stage
    currentApprover: "",
    approvalHistory: [
      {
        stage: 1,
        approverId: "",
        approverName: "",
        actionDate: "",
        action: "Approved|Rejected|Pending|RequestMoreInfo",
        comments: ""
      }
    ]
  },
  
  disbursement: {
    disbursalAmount: 0,
    disbursalDate: "",
    disbursalMethod: "Bank Transfer|Check|Others",
    beneficiaryBankAccount: "",
    disbursalStatus: "Pending|Processed|Completed|Failed",
    transactionReference: ""
  },
  
  audit: {
    createdBy: "CustomerId",
    createdAt: "",
    lastModifiedBy: "",
    lastModifiedAt: ""
  }
}
```

### 4.6 Application Form Management

#### 4.6.1 Form Fields by Product Type

**Personal Loan Form:**
- Loan Amount (50K - 50L)
- Tenure (12-60 months)
- Loan Purpose (dropdown)
- Current Monthly Income
- Monthly Expenses
- Existing EMI/Obligations
- Employment Status
- Company Name
- Designation

**Home Loan Form:**
- Property Address
- Property Cost
- Loan Amount (up to 80% LTV)
- Tenure (120-360 months)
- Co-applicant Details (if applicable)
- Annual Income
- Employment Details
- Existing Liabilities
- Property Documentation

**Auto Loan Form:**
- Vehicle Type & Model
- Vehicle Cost
- Loan Amount
- Tenure (24-84 months)
- Trade-in Value (if applicable)
- Down Payment
- Annual Income
- Employment Details
- Insurance Details

#### 4.6.2 Form Validation Rules

```
Validation Rules {
  loanAmount: {
    required: true,
    type: "number",
    min: productMinAmount,
    max: productMaxAmount,
    message: "Loan amount must be between X and Y"
  },
  
  monthlyIncome: {
    required: true,
    type: "number",
    min: 0,
    validation: function(income, loanAmount) {
      // Loan EMI should not exceed 50% of monthly income
      const monthlyEMI = calculateEMI(loanAmount, rate, tenure);
      if (monthlyEMI / income > 0.5) {
        return "Monthly EMI exceeds 50% of income";
      }
      return true;
    }
  },
  
  dateOfBirth: {
    required: true,
    type: "date",
    min: getCurrentDate().minusYears(65),
    max: getCurrentDate().minusYears(18),
    message: "Age must be between 18 and 65 years"
  },
  
  tenure: {
    required: true,
    type: "number",
    min: productMinTenure,
    max: productMaxTenure,
    message: "Tenure must be between X and Y months"
  }
}
```

### 4.7 Document Collection & Management

#### 4.7.1 Document Requirements by Product

**Personal Loan - Required Documents:**
1. Recent Salary Slips (Last 3 months)
2. Pan Card (Copy)
3. Address Proof (Utility bill/Bank statement)
4. Aadhar Card (Copy)
5. Employment Letter (if not salaried)

**Personal Loan - Optional Documents:**
1. Income Tax Returns (Last 2 years)
2. Bank Statements (Last 6 months)
3. Additional Income Proof
4. Co-applicant Documents

**Home Loan - Required Documents:**
1. ID Proof (Passport/PAN/Aadhar)
2. Address Proof
3. Income Proof (Salary Slip + IT Returns)
4. Property Documents (Sale Deed/Agreement)
5. Property Valuation Report
6. Insurance Quote

**Home Loan - Additional Documents:**
1. Employment Letter
2. No Objection Certificate (if applicable)
3. Co-owner Consent (if applicable)
4. Previous Loan Documents (if any)

#### 4.7.2 Document Upload Interface

```
Document Upload Component {
  documentType: "Salary Slip",
  category: "IncomeProof",
  mandatory: true,
  
  uploadInterface: {
    allowedFormats: ["PDF", "JPG", "PNG"],
    maxFileSize: 5, // MB
    maxDocuments: 3, // Multiple files allowed
    dragAndDrop: true,
    cameraCapture: true, // For mobile
    documentScanning: true
  },
  
  validations: {
    fileSize: "Max 5MB per file",
    fileFormat: "Only PDF, JPG, PNG allowed",
    documentClarity: "Document must be clear and legible",
    documentType: "Document type must match selection"
  },
  
  ocr: {
    enabled: true,
    autoExtractData: ["Name", "Date", "Amount", "Company"],
    manualReviewRequired: false
  },
  
  status: {
    uploaded: "File uploaded successfully",
    verifying: "Document is being verified",
    verified: "Document verified",
    rejected: "Document rejected - reason shown",
    resubmit: "Please resubmit document"
  }
}
```

### 4.8 Application Status Tracking

#### 4.8.1 Application Status Workflow

```
┌─────────────────────────────────────────────┐
│         Application Status Flow             │
└─────────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Draft                                   │
│ (Application created but not submitted) │
│ Actions: Edit, Submit, Delete, Save    │
└──────────────┬─────────────────────────┘
               │ Submit
               ▼
┌────────────────────────────────────────┐
│ Submitted                               │
│ (Awaiting document verification)        │
│ Actions: View Status, Add Documents    │
└──────────────┬─────────────────────────┘
               │ Documents Verified
               ▼
┌────────────────────────────────────────┐
│ Under Review                            │
│ (Pending credit assessment)             │
│ Actions: View Status, Provide Updates  │
└──────────────┬─────────────────────────┘
               │ Credit Assessment Complete
               ▼
┌────────────────────────────────────────┐
│ Credit Assessment Done                  │
│ (Awaiting approval workflow)            │
│ Actions: View Assessment Report         │
└──────────────┬─────────────────────────┘
               │ All Approvals Received
               ├──────────────────┬─────────────────┐
               │                  │                 │
               ▼                  ▼                 ▼
    ┌──────────────────┐ ┌──────────┐ ┌────────────────┐
    │ Approved         │ │ Rejected │ │ On Hold        │
    │ (Ready to        │ │ (Reasons │ │ (Additional    │
    │ disburse)        │ │ provided)│ │ info required) │
    └──────┬───────────┘ └──────────┘ └────────────────┘
           │
           ├─ Request More Info
           ▼
┌────────────────────────────────────────┐
│ Disbursement Scheduled                  │
│ (Waiting for scheduled date)            │
│ Actions: View Disbursal Details        │
└──────────────┬─────────────────────────┘
               │ Disbursement Processed
               ▼
┌────────────────────────────────────────┐
│ Disbursed                               │
│ (Funds transferred to customer)         │
│ Actions: View Loan Account              │
└────────────────────────────────────────┘
```

#### 4.8.2 Status Tracking Features

| Feature | Description | Notification |
|---------|-------------|--------------|
| Real-time Status | Live application status display | Yes |
| Status History | Timeline of all status changes | View only |
| Estimated Timeline | Projected approval/disbursement date | Yes |
| Next Steps | What action is expected next | Yes |
| Reasons for Delay | Explanation if processing delayed | Yes |
| Escalation | Option to escalate if stuck too long | Yes |

### 4.9 Application Submission & Validation

#### 4.9.1 Pre-Submission Validation

```
Checklist Before Submission {
  ✓ All mandatory fields filled
  ✓ Loan amount within product limits
  ✓ Applicant age between 18-65
  ✓ DTI ratio acceptable (< 50%)
  ✓ Employment/Income details provided
  ✓ All required documents uploaded
  ✓ All declarations accepted
  ✓ Contact details verified (OTP)
  
  If validation fails:
    → Show errors with specific field highlighting
    → Provide correction guidance
    → Allow user to navigate back to section
    → Save progress automatically
}
```

#### 4.9.2 Submission Confirmation

```
On Successful Submission:

1. Display Confirmation Page
   ├─ Application Reference Number
   ├─ Application Summary
   ├─ Estimated Timeline
   ├─ Next Steps
   └─ Download Application Copy (PDF)

2. Send Confirmation Email
   ├─ Application details
   ├─ Reference number
   ├─ Next steps and timeline
   ├─ Document checklist
   └─ Support contact information

3. Send SMS Notification
   ├─ Application submitted
   ├─ Reference number
   ├─ Support contact

4. Update Application Status
   ├─ Set to "Submitted"
   ├─ Lock application from further edits
   ├─ Trigger document verification workflow
   └─ Create audit log entry
```

### 4.10 Application Lifecycle Management

#### 4.10.1 Application Duration

| Phase | Duration | Status During | Actions Available |
|-------|----------|---------------|--------------------|
| Draft | Unlimited | Draft | Edit, Save, Delete, Submit |
| Processing | 24-48 hours | Submitted, Under Review | Track Status |
| Approval | 2-5 days | In Approval Workflow | Check Status, Provide Updates |
| Post Approval | 1-7 days | Approved | Review Terms, Accept Offer |
| Disbursement | 1-3 days | Disbursement Scheduled | View Details |
| Closed | Ongoing | Disbursed | View Loan Account |

#### 4.10.2 Application Lifecycle Events

```
Application Lifecycle Events {
  application_created: {
    trigger: "Application form initiated",
    actions: ["Send welcome email", "Create application record"]
  },
  
  application_submitted: {
    trigger: "Application submitted for processing",
    actions: ["Send confirmation", "Trigger document verification", "Update status"]
  },
  
  documents_uploaded: {
    trigger: "Customer uploads documents",
    actions: ["Validate documents", "Request OCR extraction", "Trigger verification"]
  },
  
  documents_verified: {
    trigger: "All required documents verified",
    actions: ["Move to credit assessment", "Send notification"]
  },
  
  credit_assessment_complete: {
    trigger: "Credit bureau data received and assessed",
    actions: ["Generate risk report", "Trigger approval workflow", "Notify approvers"]
  },
  
  approved: {
    trigger: "All approval levels completed",
    actions: ["Generate approval letter", "Send to customer", "Schedule disbursement"]
  },
  
  rejected: {
    trigger: "Application rejected at any stage",
    actions: ["Generate rejection letter", "Send reasons", "Offer reapplication option"]
  },
  
  disbursed: {
    trigger: "Funds successfully transferred",
    actions: ["Create loan account", "Generate documents", "Send confirmation"]
  }
}
```

---

## 5. Integration Points

### 5.1 Internal System Integrations

| System | Integration Point | Data Flow |
|--------|------------------|-----------|
| Customer Database | Profile management | Customer data sync |
| Document Management | Document upload/storage | File storage and retrieval |
| Credit Assessment Engine | Application processing | Application data → Risk score |
| Approval Workflow Engine | Application approval | Application status updates |
| Notification System | Customer communication | Status updates via email/SMS |
| Accounting System | Disbursement | Loan account creation |
| Reporting System | Analytics | Application metrics and KPIs |

### 5.2 External System Integrations

| System | Purpose | Data Exchange |
|--------|---------|-----------------|
| Credit Bureaus (CIBIL) | Credit score fetching | Customer ID → Credit score, report |
| SMS Gateway (Twilio) | SMS notifications | Application status → SMS message |
| Email Service (SendGrid) | Email notifications | Application data → Email |
| Payment Gateway | Document verification fees | Payment processing |
| Bank APIs | Account verification | Account details verification |

---

## 6. User Interface Requirements

### 6.1 Customer Portal Pages

```
Main Navigation:
├─ Dashboard
│  ├─ Application Summary
│  ├─ Loan Status
│  ├─ Quick Actions
│  └─ Notifications
│
├─ New Application
│  ├─ Loan Product Selection
│  ├─ Application Form
│  ├─ Document Upload
│  └─ Submission Review
│
├─ My Applications
│  ├─ Active Applications
│  ├─ Completed Applications
│  ├─ Rejected Applications
│  └─ Application Details
│
├─ My Profile
│  ├─ Personal Information
│  ├─ Contact Details
│  ├─ Address Information
│  ├─ Employment Details
│  ├─ Documents
│  └─ Preferences
│
├─ My Loans
│  ├─ Active Loans
│  ├─ Loan Details
│  ├─ Payment Schedule
│  └─ Statements
│
└─ Support
   ├─ FAQs
   ├─ Chat Support
   ├─ Ticket System
   └─ Contact Us
```

### 6.2 Design Specifications

| Element | Requirement |
|---------|-------------|
| Responsive Design | Mobile, tablet, desktop compatible |
| Load Time | Pages < 3 seconds |
| Accessibility | WCAG 2.1 AA compliance |
| Language Support | English, Hindi, Regional languages |
| Theme Support | Light/Dark mode |
| Offline Capability | Save forms locally |

---

## 7. Testing Strategy

### 7.1 Customer Module Testing

**Unit Tests:**
- Registration validation
- Profile update logic
- Document upload handling
- KYC verification workflows

**Integration Tests:**
- Customer registration end-to-end
- Profile update with database
- Document storage integration
- KYC system integration

**UI/UX Tests:**
- Registration form usability
- Profile management workflow
- Document upload process
- Mobile responsiveness

**Performance Tests:**
- Registration with 1000+ concurrent users
- Profile page load time
- Document upload speed

### 7.2 Loan Application Module Testing

**Unit Tests:**
- Form validation logic
- Calculation logic (EMI, DTI)
- Status transitions
- Document requirements

**Integration Tests:**
- Application submission end-to-end
- Document verification workflow
- Credit assessment integration
- Approval workflow trigger

**UI/UX Tests:**
- Application form usability
- Document upload workflow
- Status tracking display
- Multi-step form navigation

**Data Tests:**
- Application data structure
- Calculation accuracy
- Data persistence
- Application lifecycle

---

## 8. Success Metrics

### 8.1 Customer Module Metrics
- Registration completion rate: > 95%
- Registration time: < 5 minutes average
- Profile completion rate: > 85%
- Document upload success rate: > 90%
- KYC approval rate: > 90%
- Customer satisfaction: > 4.5/5

### 8.2 Loan Application Module Metrics
- Application submission rate: > 90%
- Application completion time: < 15 minutes
- Application resubmission rate: < 5%
- Document acceptance rate on first upload: > 85%
- Application processing time: < 3 days
- Approval rate: > 70%

### 8.3 Combined Metrics
- End-to-end time from registration to disbursement: < 5 days
- System uptime: 99.9%
- Error rate: < 0.1%
- User satisfaction: > 4/5

---

## 9. Non-Functional Requirements

### 9.1 Performance
- Page load time: < 3 seconds
- Form submission response: < 2 seconds
- Document upload progress: Real-time feedback
- API response time: < 500ms (95th percentile)
- Support 500+ concurrent users

### 9.2 Security
- HTTPS/TLS encryption for all data
- PCI-DSS compliance for payment data
- GDPR compliance for personal data
- Annual penetration testing
- Data encryption at rest (AES-256)
- Password requirements: 8+ chars, mixed case, numbers

### 9.3 Reliability
- System uptime: 99.9% SLA
- Daily backups of customer data
- Disaster recovery: RTO 4 hours, RPO 1 hour
- Automated failover for critical systems

### 9.4 Usability
- Mobile-first design
- Keyboard navigation support
- Screen reader compatibility
- Clear error messages
- Progress indicators for multi-step forms
- Auto-save functionality

---

## 10. Risks & Mitigation

### 10.1 Technical Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Document upload failures | Customer frustration | Retry logic, alternate channels |
| Database performance | Slow application | Query optimization, caching |
| Integration failures | Processing delays | Circuit breaker, fallback logic |
| Security vulnerabilities | Data breach | Regular security audits, pen tests |

### 10.2 Business Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Low adoption | ROI impact | User training, simplified UX |
| High support load | Operational cost | Self-service FAQs, chatbot |
| Data quality issues | Processing delays | Validation rules, data cleansing |

---

## 11. Deployment Plan

### 11.1 Deployment Phases
- **Phase 1**: Alpha testing with internal team (1 week)
- **Phase 2**: Beta testing with limited customers (2 weeks)
- **Phase 3**: Full production release (1 week)
- **Phase 4**: Monitoring and optimization (Ongoing)

### 11.2 Rollback Plan
- Automated rollback for critical failures
- Manual rollback capability
- Database backup before each deployment
- 24/7 support monitoring post-release

---

## 12. Approval Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | [Name] | | |
| Technical Lead | [Name] | | |
| QA Lead | [Name] | | |
| Business Sponsor | [Name] | | |

---

**Document Version**: 1.0  
**Last Updated**: May 20, 2026  
**Status**: Final - Ready for Development  
**Team**: SmartLoan Product Team
