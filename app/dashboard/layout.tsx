import React from "react";
import Sidebar from "./_components/Sidebar";
import MobileNavigation from "./_components/MobileNavigation";
import Header from "./_components/Header";

import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/texting";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="h-full flex-1 flex flex-col">
        <MobileNavigation {...currentUser} />
        <Header ownerId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content bg-light-400 dark:bg-dark_1-300">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default layout;
