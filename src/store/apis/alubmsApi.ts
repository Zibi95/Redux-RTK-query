import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../slices/userSlice';
import { faker } from '@faker-js/faker';

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export const albumsApi = createApi({
  reducerPath: 'albums',
  tagTypes: ['Album', 'UsersAlbums'],
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
        providesTags: (result, error, user) => {
          return result
            ? [
                ...result?.map(({ id }) => ({ type: 'Album' as const, id })),
                { type: 'UsersAlbums', id: user.id },
              ]
            : [{ type: 'UsersAlbums', id: user.id }];
        },
      }),
      addAlbum: builder.mutation<Album, User>({
        query: (user) => ({
          url: '/albums',
          method: 'POST',
          body: {
            userId: user.id,
            title: faker.commerce.productName(),
          },
        }),
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        },
      }),
      removeAlbum: builder.mutation<void, Album>({
        query: (album) => ({
          url: `/albums/${album.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
      }),
    };
  },
});
