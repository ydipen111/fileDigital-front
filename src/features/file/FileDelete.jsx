

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRemoveProductMutation } from "./UploadFileApi";
export function DeleteFile({ id }) {
  const dispatch = useDispatch();



  const [open, setOpen] = React.useState(false);
  const [deleteFile, { isLoading }] = useRemoveProductMutation()
  // console.log(deleteFile);

  // const { user } = useSelector((state) => state.userSlice);

  const handleOpen = () => setOpen(!open);


  const handleSubmit = async () => {

    try {
      const delProduct = await deleteFile(id).unwrap();
      toast.success('success');
      // dispatch(clearCarts());

    } catch (err) {
      toast.error(`${err.data?.message}`);
    }
  }

  return (
    <>

      <Button size="sm" loading={isLoading} onClick={handleOpen} >Delete</Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are you Sure</DialogHeader>
        <DialogBody>
          You Want To order
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            handleSubmit();
            handleOpen();
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}