"use client";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import React, { MouseEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/lib/constant";
import { useToast } from "@/hooks/use-toast";
import { fileUpload } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import clsx from "clsx";
interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
  showUplaodButton?: boolean;
  uploaderClassName?: string;
}

const FileUploader = ({
  ownerId,
  accountId,
  className,
  showUplaodButton = true,
  uploaderClassName,
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const path = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadFilePromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max size is 50MB.
              </p>
            ),
            className: "!text-black !bg-brand",
          });
        }
        return fileUpload({ file, ownerId, accountId, path }).then(
          (uploadFile) => {
            if (uploadFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            }
          }
        );
      });

      await Promise.all(uploadFilePromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleRemoveFile = (
    e: MouseEvent<HTMLImageElement>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  return (
    <>
      <div
        {...getRootProps()}
        className={clsx("cursor-pointer", uploaderClassName)}
      >
        <input {...getInputProps()} />
        <Button type="button" className={cn("uploader-button", className)}>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={24}
            height={24}
          />
          {showUplaodButton && <p>Upload</p>}
        </Button>
      </div>

      {files.length > 0 && (
        <ul className="uploader-preview-list ">
          <h4 className="h4 text-light-100 dark:text-light-400">Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                className="uploader-preview-item"
                key={`${file.name}-${index}`}
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extention={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="loading"
                      width={80}
                      height={26}
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  alt="close"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FileUploader;
