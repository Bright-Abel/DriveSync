"use client";
import { myAvatar } from "@/lib/constant";
import { getUserAvatar } from "@/lib/features/projectSlice";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
const AvatarDialog = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState<string>("");
  //   const [open, setOpen] = useState(false);

  const handleAction = () => {
    dispatch(getUserAvatar(imgUrl));
  };

  const handleImgUrl = (imgLink: string) => {
    setImgUrl(imgLink);
    onOpen();
  };
  return (
    <>
      {/* <Button onPress={onOpen}>
        {" "} */}
      <div className="grid grid-cols-6 gap-4">
        {myAvatar.map((item, index) => {
          return (
            <Image
              key={index}
              src={item}
              alt={"avaatar"}
              width={40}
              height={40}
              onClick={() => handleImgUrl(item)}
              className="size-[50px] object-contain cursor-pointer rounded-full"
            />
          );
        })}
      </div>
      {/* </Button> */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        placement="center"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent
          className="
      w-[350px] h-[350px] px-2 py-2 shadow-drop-3 rounded-lg  !bg-white border-0"
        >
          {(onClose) => (
            <>
              <ModalBody className=" h-full">
                <Image
                  src={imgUrl}
                  alt="avatar"
                  height={200}
                  width={200}
                  className="h-[240px] w-full object-contain"
                />
              </ModalBody>
              <ModalFooter className="flex flex-col md:flex-row gap-3 w-full">
                <Button
                  onPress={onClose}
                  className="h-[52px] flex-1 rounded-full !bg-dark_1-100  !text-light-500 dark:hover:bg-white/80"
                >
                  Cancel
                </Button>
                <Button
                  className="capitalize modal-submit-button"
                  onPress={handleAction}
                >
                  select
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarDialog;
