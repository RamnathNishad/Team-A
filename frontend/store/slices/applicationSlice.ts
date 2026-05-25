import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoanApplication {
  id: string;
  productType: string;
  loanAmount: number;
  tenure: number;
  status: string;
  createdDate: string;
  submittedDate?: string;
}

interface ApplicationState {
  applications: LoanApplication[];
  currentApplication: LoanApplication | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: ApplicationState = {
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,
  totalCount: 0,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setApplications: (
      state,
      action: PayloadAction<{ applications: LoanApplication[]; totalCount: number }>
    ) => {
      state.applications = action.payload.applications;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentApplication: (state, action: PayloadAction<LoanApplication | null>) => {
      state.currentApplication = action.payload;
    },
    updateCurrentApplication: (state, action: PayloadAction<Partial<LoanApplication>>) => {
      if (state.currentApplication) {
        state.currentApplication = { ...state.currentApplication, ...action.payload };
      }
    },
    addApplication: (state, action: PayloadAction<LoanApplication>) => {
      state.applications.unshift(action.payload);
      state.totalCount += 1;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setApplications,
  setCurrentApplication,
  updateCurrentApplication,
  addApplication,
  setError,
  clearError,
} = applicationSlice.actions;
export default applicationSlice.reducer;
