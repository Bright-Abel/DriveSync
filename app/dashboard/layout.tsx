import React from "react";
import Sidebar from "./_components/Sidebar";
import MobileNavigation from "./_components/MobileNavigation";
import Header from "./_components/Header";

import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/texting";
import FileUploader from "./_components/FileUploader";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <main className="flex h-screen w-full">
      <Sidebar {...currentUser} />
      <section className="h-full flex-1 flex flex-col flex-shrink-0 w-full">
        <MobileNavigation {...currentUser} />
        <Header ownerId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content relative flex-shrink-0 bg-light-400 w-full dark:bg-dark_1-300">
          {children}
          <FileUploader
            // toggleSidebar={toggleSidebar}
            ownerId={currentUser.$id}
            accountId={currentUser.accountId}
            showUplaodButton={false}
            uploaderClassName="fixed bottom-10 right-4 z-40 block sm:hidden"
          />
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default layout;
