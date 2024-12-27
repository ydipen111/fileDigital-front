import {
  Card,
  Input,

  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useUserSignUpMutation } from "./authApi";



const SignUp = () => {
  const nav = useNavigate();

  const [userSignUp, { isLoading }] = useUserSignUpMutation();
  console.log(userSignUp);


  const { handleChange, handleSubmit, values, errors, setFieldValue, touched } = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      phoneNum: '',
      password: ''
    },
    onSubmit: async (val) => {
      console.log(val);


      try {
        const response = await userSignUp(val).unwrap();
        console.log(response);

        toast.success(response?.message);
        nav(-1);
      } catch (err) {
        //console.log(err);
        toast.error(err.data?.message);
      }



    }
  });


  return (
    <Card color="transparent" shadow={false} className="p-4 mx-auto max-w-[350px]">
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="space-y-6">
          <div>
            <Input
              name="fullname"
              onChange={handleChange}
              value={values.fullname}
              label="fullname" />
          </div>


          <div>
            <Input
              name="phoneNum"
              onChange={handleChange}
              value={values.phoneNum}
              label="Contact number" />
          </div>



          <div>
            <Input
              name="email"
              onChange={handleChange}
              value={values.email}
              label="Email" />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              label="Password" />
          </div>
        </div>




        <Button type="submit" loading={false} className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}


export default SignUp