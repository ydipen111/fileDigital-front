import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/appApi";


export const authApi = createApi({
  //reducerPath
  reducerPath: 'authApi',

  //baseUrl
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),

  //endPoints
  endpoints: (builder) => ({

    //userSignUp
    userSignUp: builder.mutation({
      query: (query) => ({
        url: '/users/signup',
        body: query,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),

    //userLogin
    userLogin: builder.mutation({
      query: (query) => ({
        url: '/users/login',
        body: query,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),

    //userLogout
    userLogOut: builder.mutation({
      query: () => ({
        url: '/users/logout',

        method: 'POST'
      }),
      invalidatesTags: ['User']
    })

  })

})

export const {
  useUserSignUpMutation,
  useUserLoginMutation,
  useUserLogOutMutation
} = authApi;