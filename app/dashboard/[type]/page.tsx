import { getFiles, getUserTotalSpace } from "@/lib/actions/file.action";
import Sorts from "../_components/Sorts";
import { Models } from "node-appwrite";
import Card from "../_components/Card";
import {
  convertFileSize,
  getFileTypesParams,
  getUsageSummary,
} from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = (await params)?.type as string;
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  // const files = await getFiles({ types, searchText, sort });

  const [files, totalSpace] = await Promise.all([
    getFiles({ types, searchText, sort }),
    getUserTotalSpace(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  const newSize = usageSummary.filter(
    (item) => item.title.toLocaleLowerCase() === type
  );

  return (
    <div className="page-container dark:text-white ">
      <section className="w-full sticky top-0 z-10 bg-light-400 py-7 dark:bg-dark_1-300">
        <h1 className="h1 capitalize ">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total:{" "}
            <span className="h5">{convertFileSize(newSize[0].size)}</span>
          </p>

          <div className="total-size-section">
            <p className="body-1 hidden text-light-200 dark:text-light-300 sm:block">
              Sort by:
            </p>
            <Sorts />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((item: Models.Document) => (
            <Card key={item.$id} item={item} />
          ))}
        </section>
      ) : (
        <div>No files found</div>
      )}
    </div>
  );
};

export default Page;
