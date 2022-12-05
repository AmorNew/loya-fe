import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const nominatimApi = createApi({
  reducerPath: 'nominatimApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://nominatim.openstreetmap.org",
  }),
  endpoints: (builder) => ({
    reverse: builder.query({
      query: ({
        lat, 
        lon,
    }) => ({ 
        url: `reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`, 
        method: 'GET',
      }),
    }),
  }),
})

export const { 
  useReverseQuery, 
 } = nominatimApi

export default nominatimApi;
