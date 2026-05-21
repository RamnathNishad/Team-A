export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  panNumber: string;
  aadharNumber: string;
  permanentAddress: string;
  residentialAddress: string;
  city: string;
  state: string;
  postalCode: string;
  employmentStatus: string;
  companyName: string;
  designation: string;
  annualIncome: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  productType: 'personal' | 'home' | 'auto' | 'business' | 'education';
  loanAmountRequested: number;
  loanAmountApproved?: number;
  loanTenure: number;
  loanPurpose: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  createdAt: string;
  submittedAt?: string;
  approvedAt?: string;
  documents: Document[];
  financialDetails: {
    monthlyIncome: number;
    monthlyExpenses: number;
    existingEmiObligation: number;
  };
}

export interface Document {
  id: string;
  applicationId: string;
  documentType: string;
  documentCategory: string;
  fileName: string;
  fileUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verifiedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}
