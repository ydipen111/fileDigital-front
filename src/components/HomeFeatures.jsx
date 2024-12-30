import { useGetFileByUserIdQuery } from "../features/file/UploadFileApi";
import { DeleteFile } from "../features/file/FileDelete";
import { useSelector } from "react-redux";
import HomeFeaturesData from "./HomeFeaturesData";

const HomeFeatures = () => {
  const { user } = useSelector((state) => state.userSlice);

  // Call hooks unconditionally
  const token = user?.token;
  const { isLoading, isError, error, data } = useGetFileByUserIdQuery(token, {
    skip: !token, // Skip the query if token is not available
  });

  console.log(data);

  // Handle the case when user is not logged in
  if (!user || !user.token) {
    return <h1>Please log in to view your files.</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.data.message}</h1>;
  }

  return (
    <div>
      <HomeFeaturesData data={data} />


      {/* {data && data.file?.length > 0 ? (
        <div className="p-4 grid grid-cols-3">
          {data.file.map((file) => {
            return (
              <div key={file._id} className="border-2 border-gray-400 p-4 bg-gray-200">
                <h1>{file.name}</h1>
                <img src={`${base}/${file.image}`} alt="" />
                <DeleteFile id={file._id} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>No files found.</p>
        </div>
      )} */}
    </div>
  );
};

export default HomeFeatures;