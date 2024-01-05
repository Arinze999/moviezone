import React from "react";

export default function Componentload() {
  return (
    <>
      <div className="inline-block">
        <div className="flex flex-col justify-center items-center mx-4">
          <div className="loader-img text-white rounded-md block bg-gray-600 h-[140px] sm:h-[102px] md:h-[125px] lg:h-[102px] w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px]"></div>
          <div>
            <div className="text-white rounded-md block bg-gray-600 lazy-text my-2 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px]"></div>
            <div className="text-white rounded-md block bg-gray-600 lazy-text my-1 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px]"></div>
            <div className="text-white rounded-md block bg-gray-600 lazy-text my-1 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px]"></div>
            <div className="text-white rounded-md block bg-gray-600 lazy-text my-1 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
