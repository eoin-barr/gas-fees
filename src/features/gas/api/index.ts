import { NEXTAPI } from '@/lib/config';
import { baseApi } from '@/redux/baseApi';

export const gasAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGasFee: builder.query({
      query: () => ({
        url: NEXTAPI.GAS_FEE.gasFee,
        method: 'GET',
      }),
      providesTags: ['GetGasFee'],
    }),
    updateGasFee: builder.mutation({
      query: ({ gasFee }: { gasFee: number }) => ({
        url: NEXTAPI.GAS_FEE.gasFee,
        method: 'PUT',
        body: { gasFee },
      }),
      invalidatesTags: ['GetGasFee'],
    }),
  }),
});

export const { useGetGasFeeQuery, useUpdateGasFeeMutation } = gasAPi;
