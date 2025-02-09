import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  dark?: boolean;
  className?: string;
}

const LogoWhite = ({ dark = false, className }: Props) => {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <Image
        src={dark ? "/assets/images/primary.svg" : "/assets/images/whiteBg.svg"}
        alt="logo"
        width={70}
        height={70}
        className="h-auto object-contain"
      />
      <p
        className={clsx(
          "text-3xl font-semibold",
          dark ? "text-brand" : "text-white"
        )}
      >
        DriveSync
      </p>
    </div>
  );
};

export default LogoWhite;
