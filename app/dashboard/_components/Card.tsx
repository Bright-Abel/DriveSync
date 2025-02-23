"use client";
import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateAndTime from "./FormattedDateAndTime";
import ActionDropDowns from "./ActionDropDowns";

const Card = ({ item }: { item: Models.Document }) => {
  // const handleDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  // };
  return (
    <Link href={item.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          url={item.url}
          type={item.fileType}
          extention={item.extention}
          className="!size-16"
          imageClassName="!size-11"
        />
        <div className="flex items-end flex-col justify-between">
          <ActionDropDowns
            item={item}
            // handleDropdownClick={handleDropdownClick}
          />
          <p className="dark:text-light-500">{convertFileSize(item.size)}</p>
        </div>
      </div>

      <div className="file-card-details text-light-100 dark:text-light-500">
        <p className="subtitle-2 line-clamp-1 ">{item.name}</p>
        <FormattedDateAndTime
          date={item.$createdAt}
          className="body-2 text-light-100 dark:text-light-500"
        />
        <p className="caption line-clamp-1 text-light-200 ">
          By: {item.owner.fullname}
        </p>
      </div>
    </Link>
  );
};

export default Card;
