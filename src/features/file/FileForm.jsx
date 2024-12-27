import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddFileMutation } from "./UploadFileApi";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useFormik } from 'formik';

const FileForm = () => {
  const [addFile, { isLoading }] = useAddFileMutation();
  const nav = useNavigate();

  const productSchema = Yup.object({
    name: Yup.string().required(),
    fileType: Yup.string().required(),
    description: Yup.string().required(),
    metaData: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      fileType: '',
      description: '',
      metaData: '',
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        await addFile(values).unwrap();
        toast.success('File uploaded successfully');
        nav('/');
      } catch (error) {
        toast.error('Failed to upload file');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Form fields */}
      <button type="submit" loading={isLoading}>Upload</button>
    </form>
  );
};

export default FileForm;