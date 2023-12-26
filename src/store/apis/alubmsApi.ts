import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../slices/userSlice';

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<Album[], User>({
        query: (user) => ({
          url: '/albums',
          params: {
            userId: user.id,
          },
          method: 'GET',
        }),
      }),
    };
  },
});
