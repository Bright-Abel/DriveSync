"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navItems } from "@/lib/constant";
import FileUploader from "./FileUploader";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";
import { IoMenu } from "react-icons/io5";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileSidebar from "./MobileSidebar";

interface Props {
  $id: string;
  accountId: string;
  fullname: string;
  email: string;
  avatar_url: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullname,
  email,
  avatar_url,
}: Props) => {
  const [open, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <MobileSidebar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        ownerId={ownerId}
        accountId={accountId}
        fullname={fullname}
        email={email}
        avatar_url={avatar_url}
      />
      <header className="mobile-header">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/primary.svg"
            alt="logo"
            width={52}
            height={52}
            className="h-auto"
          />
          <p className="text-xl font-semibold text-brand">DriveSync</p>
        </div>
        <div
          // type="button"
          onClick={toggleSidebar}
          aria-label="Sidebar Control"
          className="text-4xl  text-dark_1-200 dark:text-light-400"
        >
          <IoMenu />
        </div>
        {/* <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <IoMenu className="text-4xl  text-dark_1-200 dark:text-light-400" />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar_url}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar size-[44px] rounded-full"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize dark:text-light-400">
                  {fullname}
                </p>
                <p className="caption dark:text-dark_1-100">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20 dark:bg-dark_1-400" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link href={url} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active"
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
              <ThemeToggle className="block" />
            </ul>
          </nav>
          <Separator className="mb-5 bg-light-200/20 dark:bg-dark_1-400" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              onClick={async () => await signOutUser()}
              className="mobile-sign-out-button"
            >
              <Image
                src={"/assets/icons/logout.svg"}
                alt={"Logout"}
                width={24}
                height={24}
                className="w-6"
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet> */}
      </header>
    </>
  );
};

export default MobileNavigation;
