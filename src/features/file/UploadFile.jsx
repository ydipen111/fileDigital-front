import { Card, CardBody, CardFooter, CardHeader, Typography, Button } from "@material-tailwind/react";
// import { useGetProductsQuery } from "./productApi"
// import TopProducts from "./TopProducts"
// import { base } from "../../data/apis";
// import CardLoading from "../../ui/CardLoading";
import { useNavigate } from "react-router";
import { useGetUploadFileQuery } from "./UploadFileApi";
import { base } from "../../app/appApi";

const UploadFile = () => {
  const nav = useNavigate();
  const { isLoading, isError, error, data } = useGetUploadFileQuery();
  console.log(data);


  return (
    <div>

      {/* <TopProducts /> */}
      {/* {isLoading ? <CardLoading /> : */}

      <div className="grid grid-cols-3 gap-4">
        hellow

        {data && data.file?.map((file) => {
          return <Card className="" key={file._id}>
            <CardHeader shadow={false} floated={false} className="h-56">
              <img
                src={`${base}/${file.name} `}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {file.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  ${file.createdAt}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {file.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={() => nav(`/product-detail/${product._id}`)}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                View More
              </Button>
            </CardFooter>
          </Card>
        })}

      </div>

      {/* } */}





    </div>
  )
}
export default UploadFile