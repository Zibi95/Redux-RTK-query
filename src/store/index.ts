import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: { users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
