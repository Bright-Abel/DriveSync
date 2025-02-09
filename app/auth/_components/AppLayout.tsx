"use client";
import Image from "next/image";
import SideContent from "./SideContent";
import LogoWhite from "@/components/LogoWhite";

const AppLayout = ({
  children,
  type,
}: Readonly<{
  children: React.ReactNode;
  type: "sign-in" | "sign-up";
}>) => {
  return (
    <div className="w-full h-screen">
      <section className="h-full flex items-center">
        <SideContent type={type} />

        <section className="w-full h-full flex flex-1 flex-col lg:justify-center bg-white p-4 py-10 lg:p-10 lg:py-0 items-center">
          <div className="mb-16 lg:hidden">
            <LogoWhite dark={true} />
            {/* <Image
              src={"/assets/icons/logo-full-brand.svg"}
              alt={"logo"}
              width={224}
              height={82}
              className="h-auto w-[200px] lg:w-[250px]"
            /> */}
          </div>

          {children}
        </section>
      </section>
    </div>
  );
};

export default AppLayout;
