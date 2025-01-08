import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the form data
interface FormData {
  name: string;
  description: string;
  price:number
}

// Define the initial state for the slice
interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: FormState = {
  loading: false,
  success: false,
  error: null,
};

// Create an async thunk for posting data
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(import.meta.env.VITE_POST_DATA_API_URL, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Create the slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetFormState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFormState } = formSlice.actions;

export default formSlice.reducer;
