import React from "react";
import ParamsPage from "./_components/ParamsPage";

const page = async ({ searchParams }: SearchParamProps) => {
  const userId = ((await searchParams)?.userId as string) || "";
  const secret = ((await searchParams)?.secret as string) || "";
  console.log("USERID", userId);
  console.log("SECRET", secret);

  return (
    <div>
      <ParamsPage userId={userId} secret={secret} />
    </div>
  );
};

export default page;
