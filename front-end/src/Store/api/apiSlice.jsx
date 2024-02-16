import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:8000/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log('headers', headers)
      console.log(
        '%get token from authSlice.jsx',
        'background: green',
        getState().auth.TOKEN)
      if (getState().auth.TOKEN) {
        headers.set('authorization', `Bearer ${getState().auth.TOKEN} kd`)
      }
    },
  }),
})

//comment