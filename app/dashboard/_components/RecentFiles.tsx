import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import ActionDropDowns from "./ActionDropDowns";

import FormattedDateAndTime from "./FormattedDateAndTime";
// import DropdownExample from "./Menu";

const RecentFiles = ({ file: item }: { file: Models.Document }) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 ">
      <div className="flex-1 flex items-center gap-4 flex-shrink-0">
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
      {/* <DropdownExample /> */}
      <ActionDropDowns item={item} />
    </div>
  );
};

export default RecentFiles;
