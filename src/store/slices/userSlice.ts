import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';

interface UserSliceState {
  data: [];
  isLoading: boolean;
  error: null | SerializedError;
}

const initialState: UserSliceState = {
  data: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      }),
      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
