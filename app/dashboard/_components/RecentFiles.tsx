import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import ActionDropDown from "./ActionDropDown";

import FormattedDateAndTime from "./FormattedDateAndTime";

const RecentFiles = ({ file: item }: { file: Models.Document }) => {
  // console.log(item);
  return (
    <div className="flex items-center justify-between gap-4 ">
      <div className="flex-1 flex items-center gap-4">
        <Thumbnail
          url={item.url}
          type={item.fileType}
          extention={item.extention}
          className="!size-16"
          imageClassName="!size-11"
        />
        <div className="">
          <h4 className="subtitle-2 line-clamp-1 text-light-100 dark:text-light-500">
            {item.name}
          </h4>
          <FormattedDateAndTime
            date={item.$createdAt}
            className="body-2 text-light-100 dark:text-light-500"
          />
        </div>
      </div>
      <ActionDropDown item={item} />
    </div>
  );
};

export default RecentFiles;
