"use client";

import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateAndTime from "./FormattedDateAndTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdCloseCircle } from "react-icons/io";

const ImageThumbbail = ({ file }: { file: Models.Document }) => (
  <div className="file-details-thumbnail">
    <Thumbnail
      type={file.type}
      extention={file.extension}
      url={file.image_url}
    />
    <div className="flex flex-col dark:!text-white">
      <p className="subtitle-2 mb-1">{file.name}</p>
      <FormattedDateAndTime date={file.$createdAt} className="caption" />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex w-full justify-center">
    <p className="file-details-label">{label}</p>
    <p className="file-details-value">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbbail file={file} />
      <DetailRow label="Format:" value={file.extention} />
      <DetailRow label="Size:" value={convertFileSize(file.size)} />
      <DetailRow label="Owner:" value={file.owner.fullname} />
      <DetailRow label="Created At:" value={formatDateTime(file.$createdAt)} />
      <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareFile = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbbail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100 dark:text-light-500">
          Share file with other user...
        </p>
        <Input
          type="email"
          placeholder="Enter user's email"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="share-input-field"
        />

        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100 dark:text-light-300">
              Shared with:
            </p>
            <p className="subtitle-2 text-light-100 dark:text-light-400">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((user: string) => (
              <li key={user} className="flex items-center justify-between">
                <p className="subtitle-2 dark:text-light-400">{user}</p>
                <Button
                  type="button"
                  onClick={() => onRemove(user)}
                  className="share-remove-user"
                >
                  <IoMdCloseCircle className="text-2xl text-light-100 dark:text-light-400" />
                  {/* <Image
                    src="/assets/icons/remove.svg"
                    alt="remove"
                    width={24}
                    height={24}
                    className="remove-icon"
                  /> */}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
