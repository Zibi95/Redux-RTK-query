import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '..';
import { removeUser } from '../thunks/removeUser';

export interface User {
  id: number;
  name: string;
}

interface UserSliceState {
  data: User[];
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
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      const updatedData = state.data.filter(
        (user) => user.id !== action.payload
      );
      state.data = updatedData;
      state.isLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
