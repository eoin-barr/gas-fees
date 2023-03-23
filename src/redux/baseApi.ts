import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { NEXTAPI } from '@/lib/config';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['GetGasFee'],
  baseQuery: fetchBaseQuery({
    baseUrl: NEXTAPI.BASE_URL,
  }),
  endpoints: () => ({}),
});
