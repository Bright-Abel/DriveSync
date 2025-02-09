"use client";
import LogoWhite from "@/components/LogoWhite";
import ThemeToggle from "@/components/ThemeToggle";
import { navItems } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  fullname: string;
  email: string;
  avatar_url: string;
}

const Sidebar = ({ fullname, email, avatar_url: AvatarUrl }: Props) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href={"/dashboard"}>
        <div className="hidden lg:block">
          <LogoWhite dark={true} />
        </div>
        {/* <Image
          src={"/assets/icons/logo-full-brand.svg"}
          alt={"StoreIt"}
          width={160}
          height={50}
          className="hidden lg:block h-auto"
        /> */}
        <Image
          src={"/assets/icons/logo-brand.svg"}
          alt={"StoreIt"}
          width={52}
          height={52}
          className="lg:hidden block h-auto"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-2">
          {navItems.map(({ url, name, icon }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
          <ThemeToggle />
        </ul>
      </nav>

      {/* <Image
        src={"/assets/images/files-2.png"}
        alt="logo"
        width={400}
        height={10}
        className="w-full h-[200px] "
      /> */}
      <div className="sidebar-user-info">
        <Image
          src={AvatarUrl}
          alt="avatar"
          width={44}
          height={44}
          className="sidebar-use-avatar size-[44px] rounded-full"
        />
        <div className="hidden lg:block ">
          <p className="subtitle-2 capitalize dark:text-light-400 ">
            {fullname}
          </p>
          <p className="caption dark:text-dark_1-100">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
