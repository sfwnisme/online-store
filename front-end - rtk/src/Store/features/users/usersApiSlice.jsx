import { apiSlice } from "../../api/apiSlice"

const usersApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['users'],
  endpoints: builder => ({
    //users
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['posts']
    })
  })
})


export const { useGetUsersQuery } = usersApiSlice