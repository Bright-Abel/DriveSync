import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";
import clsx from "clsx";
import Image from "next/image";
import FileUploader from "./FileUploader";
import { Separator } from "@radix-ui/react-separator";
import ThemeToggle from "@/components/ThemeToggle";
import { navItems } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  ownerId: string;
  accountId: string;
  fullname: string;
  email: string;
  avatar_url: string;
}

const MobileSidebar = ({
  isSidebarOpen,
  toggleSidebar,
  ownerId,
  accountId,
  fullname,
  email,
  avatar_url,
}: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-all",
        isSidebarOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
      )}
    >
      <aside
        className={clsx(
          `absolute bg-white dark:bg-dark_1-300 flex sm:hidden flex-col py-4 border-solid top-0 bottom-0 z-50 h-screen px-8 max-h-screen overflow-hidden transition-all ease-in-out duration-800 right-0`,
          isSidebarOpen
            ? "translate-x-0 w-[90%] duration-800"
            : "translate-x-full w-0 duration-800"
        )}
      >
        <div className="header-user relative">
          <button
            type="button"
            className="text-4xl absolute top-0 right-0 text-dark_1-200 dark:text-light-400"
            onClick={toggleSidebar}
          >
            <IoClose />
          </button>
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
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navItems.map(({ url, name, icon }) => (
              <Link
                href={url}
                key={name}
                className="lg:w-full"
                onClick={toggleSidebar}
              >
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
        <div className="flex flex-col justify-end h-full gap-5 pb-5">
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
      </aside>
    </div>
  );
};
export default MobileSidebar;
