import Image from "next/image";

import ImageDialog from "./ImageDialog";
import LogoWhite from "@/components/LogoWhite";

const SideContent = ({ type }: { type: "sign-in" | "sign-up" }) => {
  return (
    <section className="h-full hidden w-1/2 items-center justify-center lg:flex xl:w-2/5 p-10 bg-brand">
      <div className="flex max-h-[800px] max-w-[430px] flex-col space-y-8 justify-center items-center ">
        <LogoWhite />
        {/* <Image
          src={"/assets/icons/logo-full.svg"}
          alt="logo"
          width={224}
          height={82}
          className="h-auto object-contain"
        /> */}

        <div className="text-white space-y-4">
          <h2 className="text-[46px] leading-[56px] font-bold">
            Manage your files the best way
          </h2>

          <p className="body-1 !text-sm">
            Awesome, we&apos;ve created the perfect place for you to store all
            your documents.
          </p>
        </div>
        {type === "sign-in" && (
          <Image
            src="/assets/images/files.png"
            alt="folder"
            width={240}
            height={342}
            className="transition-all hover:scale-105 hover:rotate-2 duration-500 object-contain"
          />
        )}
        {type === "sign-up" && <ImageDialog />}
      </div>
    </section>
  );
};

export default SideContent;
