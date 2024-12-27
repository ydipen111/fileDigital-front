import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/appApi";


export const uploadFileApi = createApi({
  reducerPath: 'uploadFileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: (builder) => ({

    //get uploaded file
    getUploadFile: builder.query({
      query: (q) => ({
        url: `/file/get-file`,
        method: 'GET',
      }),
      providerTags: ['File']
    }),

    //getFileById
    getFileById: builder.query({
      query: (id) => ({
        url: `/file/${id}`,
        method: 'GET'
      }),
      providerTags: ['File']
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
        method: 'PATCH',
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
  useGetFileByIdQuery,
  useAddFileMutation,
  useUpdateFileMutation,
  useRemoveProductMutation
} = uploadFileApi;