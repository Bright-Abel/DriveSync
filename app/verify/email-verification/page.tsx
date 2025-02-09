import { getCurrentUser } from "@/lib/actions/texting";

import Image from "next/image";
import React from "react";
import ResendButon from "./_component/ResendButon";

const page = async () => {
  const [currentUser] = await Promise.all([
    getCurrentUser(),
    // verificationEmail(),
  ]);

  return (
    <div className="w-full h-screen flex flex-col text-center gap-6 bg-white justify-center items-center">
      <Image
        src={"/assets/images/email.avif"}
        alt="email_image"
        width={200}
        height={200}
      />
      <div className="text-dark_1-200 space-y-3 max-w-[600px] w-full">
        <h2 className="h2 ">Verify your email address</h2>
        <p className="subtitle-2">
          A verification email has been sent to your email{" "}
          <span className="text-brand font-semibold">
            {currentUser?.email}.
          </span>{" "}
        </p>
        <p className="subtitle-2">
          Please check your email and click the link provided in the email to
          complete your account registration.
        </p>
      </div>

      <div className="text-dark_1-200 max-w-[600px] w-full">
        <p className="subtitle-2">
          If you do not receive the email in the next five minute. Use the
          button below to resend verification email.
        </p>
      </div>
      <ResendButon />
    </div>
  );
};

export default page;
