import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Option,
  Select,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddFileMutation } from "../file/UploadFileApi";

const FileForm = () => {

  const [addFile, { isLoading }] = useAddFileMutation();
  const { user } = useSelector((state) => state.userSlice);


  const id = user.id;
  console.log(id);




  const nav = useNavigate();

  const productSchema = Yup.object({
    name: Yup.string().required(),
    fileType: Yup.string().required(),
    description: Yup.string().required(),
    metaData: Yup.string().required(),

    // newfileType: Yup.mixed().required().test('fileType', 'invalid image', (e) => {
    //   return ['fileType/jpg', 'fileType/png', 'fileType/jpeg'].includes(e.type);
    // })

  });

  const { values, handleChange,
    handleSubmit, errors, setFieldValue, touched } = useFormik({

      initialValues: {
        name: '',
        description: '',
        metaData: '',
        fileType: null,
        newfileType: '',
        userId: id



      },

      onSubmit: async (val, { resetForm }) => {
        const formData = new FormData();

        console.log(formData);

        // Object.entries(val).forEach(([k, v]) => {
        //   formData.append(k, v);
        // });

        formData.append('name', val.name);
        formData.append('description', val.description);
        formData.append('metaData', val.metaData);
        formData.append('fileType', val.fileType);
        formData.append('fileType', id);
        try {
          await addFile({
            body: formData,
            token: user.token
          }).unwrap();
          toast.success('add success');

          nav(-1);
        } catch (err) {
          console.log(err);
          toast.error(err.data?.message);
        }

      },
      validationSchema: productSchema

    });

  return (
    <Card color="transparent" shadow={false} className="max-w-sm  mx-auto mt-4 mb-4">
      <Typography variant="h4" color="blue-gray">
        Add a file
      </Typography>

      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-1 flex flex-col gap-3 space-y-2">
          {/* image */}
          <div className='space-y-2'>
            <h1>Select a file</h1>

            <Input
              label=" File name"
              onChange={(e) => {
                const file = e.target.files[0];
                setFieldValue('newfileType', URL.createObjectURL(file))
                setFieldValue('fileType', file);
              }}
              type='file'
              name='fileType'
              multiple
              accept='image/*'
            />
            {/* 
            {errors.fileType && touched.fileType && <h1 className='text-pink-700'>{errors.fileType}</h1>} */}

            {/* {values.newfileType && <img className="object-cover h-[400px] w-[400px]" src={values.newfileType} alt="" />} */}
          </div>

          {/*file name  */}
          <Input
            size="lg"
            placeholder="File name"
            label="File name"
            name="name"
            onChange={handleChange}
          />
          {errors.name && touched.name && <h1 className='text-pink-700'>{errors.name}</h1>}

          {/* meta data */}
          <Input
            size="lg"
            placeholder="Meta-data"
            label="Meta-data"
            name="metaData"
            onChange={handleChange}
          />
          {errors.metaData && touched.metaData && <h1 className='text-pink-700'>{errors.metaData}</h1>}

          {/* <Input
            size="lg"
            placeholder="countInStock"
            label="countInStock"
            onChange={handleChange}
            name="stock"
          />
          {errors.stock && touched.stock && <h1 className='text-pink-700'>{errors.stock}</h1>} */}


          <Textarea
            size="lg"
            placeholder="File_detail"
            label="File_detail"
            name="description"
            onChange={handleChange}
          />
          {errors.description && touched.description && <h1 className='text-pink-700'>{errors.description}</h1>}



        </div>

        <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
          Submit
        </Button>

      </form>
    </Card>
  )
}
export default FileForm