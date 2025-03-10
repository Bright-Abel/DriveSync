"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { myAvatar } from "@/lib/constant";
// import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { getUserAvatar } from "@/lib/features/projectSlice";

const ImageDialog = () => {
  // const { userAvatar } = useSelector((state: RootState) => state.dataSlice);
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [open, setOpen] = useState(false);

  const closeModals = () => {
    setOpen(false);
  };

  const handleAction = () => {
    dispatch(getUserAvatar(imgUrl));
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="space-y-3">
        <h2 className="h2 text-light-400">
          Please Select an Avatar for your Profile
        </h2>
        <div className="grid grid-cols-6 gap-4">
          {myAvatar.map((item, index) => {
            return (
              <Image
                key={index}
                src={item}
                alt={"avaatar"}
                width={40}
                height={40}
                onClick={() => setImgUrl(item)}
                className="size-[50px] object-contain rounded-full"
              />
            );
          })}
        </div>
      </DialogTrigger>
      <DialogContent
        className="
      size-[350px] flex items-center flex-col !bg-white border-0"
      >
        <DialogHeader>
          <DialogTitle className="text-center hidden text-light-100 dark:text-light-500">
            Avatar Preview
          </DialogTitle>
          <DialogDescription>
            <Image
              src={imgUrl}
              alt="avatar"
              height={200}
              width={200}
              className="h-[240px] w-full"
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col md:flex-row gap-3 w-full">
          <Button
            onClick={closeModals}
            className="h-[52px] flex-1 rounded-full !bg-dark_1-100  !text-light-500 dark:hover:bg-white/80"
          >
            Cancel
          </Button>
          <Button
            className="capitalize modal-submit-button"
            onClick={handleAction}
          >
            select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
