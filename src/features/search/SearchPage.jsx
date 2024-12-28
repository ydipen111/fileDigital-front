import React from 'react';
import { useParams } from "react-router";
import { useGetUploadFileQuery } from "../file/UploadFileApi";
import { base } from "../../app/appApi";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react';
// import notFoundAnimation from '../../animations/not-found.json';

const SearchPage = () => {
  const { search } = useParams();
  console.log(search);

  const { isLoading, isError, error, data } = useGetUploadFileQuery(search);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.data.message}</h1>;
  }

  return (
    <div>

      {data && data.file?.length > 0 ? (
        <div className="p-4 grid grid-cols-3">
          {data.file.map((file) => {
            return (
              <div key={file._id} className="border-2 border-gray-400 p-4 bg-gray-200">
                <h1>{file.name}</h1>
                <img src={`${base}/${file.image}`} alt="" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col  items-start">

          <DotLottieReact

            src="https://lottie.host/3c6d199d-c895-4de9-9e6f-d6d4d229a9b6/8EIB76GkXp.lottie"

            loop
            autoplay
          // style={{ width: '300px', height: '300px' }} 
          // Set custom width and height
          />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
