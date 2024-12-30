import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/appApi";


export const uploadFileApi = createApi({
  reducerPath: 'uploadFileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: (builder) => ({

    //get Alluploaded file
    getUploadFile: builder.query({
      query: (search) => ({
        url: `/file/get-file`,
        method: 'GET',
        params: {
          search: search
        }
      }),
      providesTags: ['File']
    }),

    // get File by userId
    //get Alluploaded file
    getFileByUserId: builder.query({
      query: (token) => ({
        url: `/file/userFile`,
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }

        // params: {
        //   search: search
        // }
      }),
      providesTags: ['File']
    }),


    //getFileById
    getFileById: builder.query({
      query: (id) => ({
        url: `/file/${id}`,
        method: 'GET'
      }),
      providesTags: ['File']
    }),

    // addFile
    addFile: builder.mutation({
      query: (q) => ({
        url: `/file/post-file`,
        body: q.body,
        headers: {
          'Authorization': `${q.token}`,
          // 'Content-Type': 'multipart/form-data'



        },
        method: 'POST',
      }),
      invalidatesTags: ['file']
    }),

    //updateProuct

    updateFile: builder.mutation({
      query: (q) => ({
        url: `/file/${q.id}`,
        body: q.body,
        method: 'PATCH',
        headers: {
          'Authorization': `${q.token}`
        }
      }),
      invalidatesTags: ['file']

    }),

    //removeProduct
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/file/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['file']

    })

  })
})

export const {
  useGetUploadFileQuery,
  useGetFileByUserIdQuery,
  useGetFileByIdQuery,
  useAddFileMutation,
  useUpdateFileMutation,
  useRemoveProductMutation
} = uploadFileApi;