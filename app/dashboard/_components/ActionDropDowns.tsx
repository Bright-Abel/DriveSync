"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Divider } from "@heroui/divider";
import { Input } from "@/components/ui/input";
import { deleteFile, renameFile, shareFile } from "@/lib/actions/file.action";
import { actionsDropdownItems } from "@/lib/constant";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useState } from "react";
import { FileDetails, ShareFile } from "./ActionModalContent";
import { Button } from "@heroui/button";
import { IoClose } from "react-icons/io5";

interface Props {
  // handleDropdownClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  item: Models.Document;
}

const ActionDropDowns = ({ item }: Props) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState<string>(item.name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const path = usePathname();

  const handleRemoveUser = async (email: string) => {
    const UpdateEmail = emails.filter((em) => em !== email);
    const success = await shareFile({
      fileId: item.$id,
      emails: UpdateEmail,
      path,
    });
    if (success) setEmails(UpdateEmail);
    closeModals();
  };

  const closeModals = () => {
    onOpenChange();
    setAction(null);
    setName(item.name);
    setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;
    const actions = {
      rename: () =>
        renameFile({ fileId: item.$id, name, extention: item.extention, path }),
      share: () => shareFile({ fileId: item.$id, emails: emails, path }),
      delete: () =>
        deleteFile({ fileId: item.$id, bucketFileId: item.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) {
      setIsLoading(false);
      closeModals();
    }
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { label, value } = action;

    return (
      <ModalContent
        className="
            shad-dialog button space-y-4"
      >
        {(onClose) => (
          <>
            <ModalHeader className="text-center w-full flex items-center justify-between text-light-100 dark:text-light-500">
              <h2 className=""> {label}</h2>
              <Button type="button" onPress={onClose}>
                <IoClose className="text-xl" />
              </Button>
            </ModalHeader>
            <ModalBody className="px-6 ">
              {value === "rename" && (
                <Input
                  type="text"
                  className="text-light-100 dark:text-light-500 dark:border-light-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              {value === "details" && <FileDetails file={item} />}
              {value === "share" && (
                <ShareFile
                  file={item}
                  onInputChange={setEmails}
                  onRemove={handleRemoveUser}
                />
              )}
              {value === "delete" && (
                <p className="delete-confirmation">
                  Are you sure you want to delete{" "}
                  <span className="delete-file-name">{item.name}</span>
                </p>
              )}
            </ModalBody>
            {["rename", "share", "delete"].includes(value) && (
              <ModalFooter className="flex flex-col md:flex-row gap-3">
                <Button onClick={closeModals} className="modal-cancel-button">
                  Cancel
                </Button>
                <Button
                  className="capitalize modal-submit-button"
                  onClick={handleAction}
                >
                  {" "}
                  {isLoading ? (
                    <div className="flex gap-2 items-center">
                      <p className="">Loading</p>
                      <Image
                        src={"/assets/icons/loader.svg"}
                        alt={"loader"}
                        width={24}
                        height={24}
                        className="object-contain animate-spin"
                      />
                    </div>
                  ) : (
                    value
                  )}
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    );
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger className="shad-no-focus">
          <Image
            src={"/assets/icons/dots.svg"}
            alt="dots"
            width={34}
            height={34}
            className="object-contain cursor-pointer"
            onClick={(e) => e.preventDefault()}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="File actions"
          className="bg-white dark:bg-dark_1-200 border border-solid border-gray-300 dark:border-gray-500 rounded-lg max-w-[200px] truncate"
        >
          <>
            <DropdownSection
              showDivider
              // title={item.name}
              aria-label="File actions"
              className="truncate font-semibold dark:text-light-500"
            >
              <DropdownItem
                key={"key"}
                className="truncate font-semibold dark:text-light-500"
              >
                {item.name}
              </DropdownItem>
            </DropdownSection>

            {actionsDropdownItems.map((actiontem) => (
              <DropdownItem
                key={actiontem.value}
                className="shad-dropdown-item dark:text-light-500"
                onPress={() => {
                  setAction(actiontem);
                  if (
                    ["rename", "share", "delete", "details"].includes(
                      actiontem.value
                    )
                  ) {
                    onOpen();
                  }
                }}
              >
                {actiontem.value === "download" ? (
                  <Link
                    href={constructDownloadUrl(item.bucketFileId)}
                    download={item.name}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={actiontem.icon}
                      alt={actiontem.value}
                      width={30}
                      height={30}
                    />
                    <p className="capitalize">{actiontem.value}</p>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={actiontem.icon}
                      alt={actiontem.value}
                      width={30}
                      height={30}
                    />
                    <p className="capitalize">{actiontem.value}</p>
                  </div>
                )}
              </DropdownItem>
            ))}
          </>
        </DropdownMenu>
      </Dropdown>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        placement="center"
        hideCloseButton
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
        {renderDialogContent()}
      </Modal>
    </>
  );
};

export default ActionDropDowns;
