import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/userSlice';
import { albumsApi } from './apis/alubmsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export const {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useRemovePhotoMutation,
} = photosApi;
