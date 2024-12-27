import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetFileByIdQuery } from '../file/UploadFileApi';
import FileEditForm from './FileEditForm';

const FileEdit = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetFileByIdQuery(id);
  // console.log(data);

  return (
    <div>
      {data && <FileEditForm data={data} />

      }

    </div>
  )
}

export default FileEdit
