import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/auth/userSlice";
import { authApi } from "../features/auth/authApi";
import { uploadFileApi } from "../features/file/UploadFileApi";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [uploadFileApi.reducerPath]: uploadFileApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    uploadFileApi.middleware
  ])
})