import { Button } from '@material-tailwind/react'
import React from 'react'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Rootlayout from './Rootlayout'
import Login from './features/auth/login'
import SignUp from './features/auth/SignUp'
import UserRoutes from './ui/UserRoutes'
import UploadFile from './features/file/UploadFile'
import FileAdmin from './features/admin/FIleAdmin'
import FileForm from './features/admin/FileForm'

const App = () => {

  const router = createBrowserRouter([{
    path: '/',
    element: <Rootlayout />,
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: 'file-upload',
        element: <FileAdmin />

      },
      {
        path: 'file-form',
        element: <FileForm />
      },

      {
        element: <UserRoutes />,
        children: [

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'sign-up',
            element: <SignUp />
          }]

      }




    ]

  }])



  return (<RouterProvider router={router} />


  )
}

export default App
