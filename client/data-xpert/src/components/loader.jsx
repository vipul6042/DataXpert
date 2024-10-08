import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <p className=" w-full flex justify-center items-center text-[30px]">
        We are cooking the computation result,
      </p>
      <p className=" w-full flex justify-center items-center text-[30px]">
        wait for atleast 2 minutes.
      </p>
      <div className="m-8 animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default Loader;
