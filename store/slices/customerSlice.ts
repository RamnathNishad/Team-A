import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  documents: Array<{ id: string; type: string; url: string; status: string }>;
}

const initialState: CustomerState = {
  profile: null,
  isLoading: false,
  error: null,
  documents: [],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action: PayloadAction<CustomerState['profile']>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<CustomerState['profile']>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addDocument: (state, action: PayloadAction<(typeof state.documents)[0]>) => {
      state.documents.push(action.payload);
    },
    clearProfile: (state) => {
      state.profile = null;
      state.documents = [];
    },
  },
});

export const { setLoading, setProfile, updateProfile, setError, addDocument, clearProfile } =
  customerSlice.actions;
export default customerSlice.reducer;
