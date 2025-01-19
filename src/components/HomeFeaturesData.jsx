import { Avatar, Button, Card, Typography } from '@material-tailwind/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { base } from '../app/appApi';
import { DeleteFile } from '../features/file/FileDelete';

const HomeFeaturesData = ({ data }) => {
  console.log(data);

  const nav = useNavigate();
  const TABLE_HEAD = ["", "Title", "CreatedAt", "Edit", "Delete"];

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {/* DashBoard */}
        <div className="col-span-1 bg-gray-300">
          <div className="">
            <ul className="space-y-2 text-lg">
              <li className="bg-gray-700 text-4xl p-4 text-white">Dashboard</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">My files</li>
              <li onClick={() => nav('/file-form')} className="bg-gray-500 px-3 rounded-md p-2 cursor hover:translate-x-3 ease-in-out duration-300">Uploads</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">File Conversion</li>
            </ul>
          </div>

          
          {/* ocrFeatures */}
          <div>
            <ul className="space-y-2 text-lg">
              <li className="px-3 text-2xl rounded-md p-2 mt-4 hover:translate-x-3 ease-in-out duration-300">Ocr & Ai</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">nepAI</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Ocr</li>
            </ul>
          </div>

          {/* filemanagement */}
          <div>
            <ul className="space-y-2 text-lg">
              <li className="px-3 text-2xl rounded-md p-2 mt-4 hover:translate-x-3 ease-in-out duration-300">File Management</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Folder Management</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Document library</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Archive</li>
            </ul>
          </div>

          {/* support */}
          <div>
            <ul className="space-y-2 text-lg">
              <li className="px-3 text-2xl rounded-md p-2">Support</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">My files</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Help center</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Contact us</li>
              <li className="bg-gray-500 px-3 rounded-md p-2 hover:translate-x-3 ease-in-out duration-300">Setting</li>
            </ul>
          </div>
        </div>

        <div className="p-5 col-span-3 bg-gray-400">
          {/* uploaded file */}
          <div className="mb-4 flex justify-between">
            <h1 className="text-lg font-semibold">Welcome To a file uploaded</h1>
            <Button onClick={() => nav('/file-form')} className="py-2 px-4" color="deep-purple" size="lg">Add File</Button>
          </div>

          {/* <div>
          {data && data.file?.length > 0 ? (
            <div className="p-4 grid grid-cols-3">
              {data.file.map((file) => (
                <div key={file._id} className="border-2 border-gray-400 p-4 bg-gray-200">
                  <h1>{file.name}</h1>
                  <img src={`${base}/${file.image}`} alt="" />
                  <DeleteFile id={file._id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p>No files found.</p>
            </div>
          )}
        </div> */}

          {/* Uncomment this section if you want to use the table layout */}

          <Card className="max-w-3xl">
            <table className="table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.files?.map(({ description, fileType, createdAt, _id, metaData, name }, index) => {
                  const isLast = index === data.files.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td>
                        <Avatar className="rounded-none" src={`${base}/${fileType}`} alt="avatar" />
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          <span className="font-bold">Filename:</span> {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {createdAt}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button onClick={() => nav(`/edit-file/${_id}`)} color="light-green" size="sm">Edit</Button>
                      </td>
                      <td className={classes}>
                        <DeleteFile id={_id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>


    </div>
  )
}

export default HomeFeaturesData
