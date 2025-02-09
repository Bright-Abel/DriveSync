import Loader from "@/components/Loader";
import React from "react";

const Verification = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      <Loader color="#EA6365" height="80" width="80" />
      <h1 className="h1">Verification In Progress...</h1>
    </div>
  );
};

export default Verification;
