import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album } from './alubmsApi';
import { faker } from '@faker-js/faker';

export interface Photo {
  id: number;
  albumId: number;
  url: string;
}

export const photosApi = createApi({
  reducerPath: 'photos',
  tagTypes: ['AlbumsPhotos', 'Photo'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<Photo[], Album>({
        query: (album) => ({
          url: '/photos',
          params: { albumId: album.id },
          method: 'GET',
        }),
        providesTags: (result, error, album) => {
          return result
            ? [
                ...result?.map(({ id }) => ({ type: 'Photo' as const, id })),
                { type: 'AlbumsPhotos', id: album.id },
              ]
            : [{ type: 'AlbumsPhotos', id: album.id }];
        },
      }),
      addPhoto: builder.mutation<Photo, Album>({
        query: (album) => ({
          url: '/photos',
          method: 'POST',
          body: {
            albumId: album.id,
            url: faker.image.url({ width: 150, height: 150 }),
          },
        }),
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumsPhotos', id: album.id }];
        },
      }),
      removePhoto: builder.mutation<void, Photo>({
        query: (photo) => ({
          url: `/photos/${photo.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
      }),
    };
  },
});
