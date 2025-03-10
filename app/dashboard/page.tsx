import { Separator } from "@/components/ui/separator";
import { getFiles, getUserTotalSpace } from "@/lib/actions/file.action";
import { convertFileSize, getFileTypeIcon, getUsageSummary } from "@/lib/utils";
import FormattedDateAndTime from "./_components/FormattedDateAndTime";
import Image from "next/image";
import Link from "next/link";
import { Chart } from "./_components/Chart";
import RecentFiles from "./_components/RecentFiles";
import { Models } from "node-appwrite";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getUserTotalSpace(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container w-full h-full py-7">
      <section className="">
        <Chart used={totalSpace.used} />
        {/* Uploaded file type summaries */}
        <div className="">
          <ul className="dashboard-summary-list ">
            {usageSummary.map((summary) => (
              <Link
                href={`dashboard${summary.url}`}
                key={summary.title}
                className="dashboard-summary-card"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-3">
                    <Image
                      src={summary.icon}
                      width={100}
                      height={100}
                      alt="uploaded image"
                      className="summary-type-icon"
                    />
                    <div className="flex items-center justify-between w-full">
                      <figure className="flex-center size-[50px] min-w-[50px] overflow-hidden rounded-full bg-light-400">
                        <Image
                          src={getFileTypeIcon(summary.title) as string}
                          alt="logo"
                          width={28}
                          height={28}
                          className="hidden dark:block"
                        />
                      </figure>
                      <h4 className="summary-type-size">
                        {convertFileSize(summary.size) || 0}
                      </h4>
                    </div>
                  </div>

                  <h5 className="summary-type-title">{summary.title}</h5>
                  <Separator className="!bg-light-400 " />
                  <div className="text-sm">
                    <p className="text-center text-light-200 dark:text-light-500">
                      Last updated:
                    </p>
                    <FormattedDateAndTime
                      date={summary.latestDate}
                      className="text-center !text-light-100 dark:!text-light-300"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      <section className="dashboard-recent-files hidden md:block  !pb-10 w-full relative">
        <div className="w-full px-5 xl:px-7 pt-6 bg-white dark:bg-dark_1-400 sticky top-0 z-10">
          <h2 className="h2 text-light-100 dark:text-light-400 ">
            Recent files uploaded
          </h2>
        </div>
        <div className=" w-full space-y-4 p-5 xl:p-7 h-full custom-scrollbar overflow-auto ">
          {files.documents.length > 0
            ? files.documents.map((file: Models.Document) => (
                <RecentFiles key={file.$id} file={file} />
              ))
            : "No files found"}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
