import { useNavigate } from "react-router";
import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { base } from "../app/appApi";
import { useGetUploadFileQuery } from "../features/file/UploadFileApi";
import { DeleteFile } from "../features/file/FileDelete";

const HomeFeatures = () => {
  const { isLoading, isError, error, data } = useGetUploadFileQuery();
  console.log(data);


  const nav = useNavigate();
  const TABLE_HEAD = ["", "Title", "CreatedAt",
    "Edit", "Delete"];

  if (isLoading) {
    return <h1>Loading....</h1>
  }



  return (
    <div className="grid grid-cols-4 gap-4">

      {/* DashBoard */}
      <div className=" col-span-1 bg-gray-300">
        <div className="">
          <ul className="space-y-2 text-lg  ">
            <li className="bg-gray-700  text-4xl p-4 text-white">Dashboard</li>
            <li className="bg-gray-500 px-3 rounded-md p-2  hover:translate-x-3 ease-in-out duration-300  ">My files</li>

            <li onClick={() => nav('/file-form')} className="bg-gray-500 px-3 rounded-md p-2 cursor hover:translate-x-3 ease-in-out duration-300  ">Uploads</li>

            <li className="bg-gray-500 px-3 rounded-md p-2   hover:translate-x-3 ease-in-out duration-300 ">File Converson</li>
          </ul>

        </div>

        {/* filemanagement */}
        <div>
          <ul className="space-y-2 text-lg ">
            <li className=" px-3 text-2xl rounded-md p-2 mt-4  hover:translate-x-3 ease-in-out duration-300 ">File Management</li>
            <li className="bg-gray-500 px-3 rounded-md p-2  hover:translate-x-3 ease-in-out duration-300 ">Folder Management </li>
            <li className="bg-gray-500 px-3 rounded-md p-2  hover:translate-x-3 ease-in-out duration-300  ">Document libary</li>
            <li className="bg-gray-500 px-3 rounded-md p-2   hover:translate-x-3 ease-in-out duration-300 ">Archive </li>
          </ul>

        </div>

        {/* support */}
        <div>
          <ul className="space-y-2 text-lg ">
            <li className=" px-3 text-2xl rounded-md p-2  ">Support</li>
            <li className="bg-gray-500 px-3 rounded-md p-2  hover:translate-x-3 ease-in-out duration-300  ">My files</li>
            <li className="bg-gray-500 px-3 rounded-md p-2  hover:translate-x-3 ease-in-out duration-300 ">Help center</li>
            <li className="bg-gray-500 px-3 rounded-md p-2  hover:translate-x-3 ease-in-out duration-300  ">Contact us </li>
            <li className="bg-gray-500 px-3 rounded-md p-2   hover:translate-x-3 ease-in-out duration-300 ">Setting </li>
          </ul>

        </div>

      </div>
      <div className="p-5 col-span-3 bg-gray-400">



        {/* uploaded file */}
        <div className="mb-4 flex justify-between">
          <h1 className="text-lg font-semibold">Welcome To a file uploaded</h1>
          <Button onClick={() => nav('/file-form')} className="py-2 px-4" color="deep-purple" size="lg">Add File</Button>
        </div>

        {<Card className="max-w-3xl">
          <table className=" table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.file.map(({ description, fileType, createdAt, _id, metaData, name }, index) => {
                const isLast = index === data.file.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td >
                      <Avatar
                        className="rounded-none"
                        src={`${base}/${fileType}`} alt="avatar" />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {createdAt}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Button onClick={() => nav(`/product-edit/${_id}`)} color="light-green" size="sm">Edit</Button>
                    </td>

                    <td className={classes}>

                      <DeleteFile id={_id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>}

      </div>
    </div>
  )
}
export default HomeFeatures


