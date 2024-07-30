import React from "react";
import { FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-[#272727] flex flex-col min-h-full">
      <div>
        <div>
          <div className=" p-6"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <p className="flex flex-row gap-2 justify-center items-center p-4 border-t-2 border-green-400 w-4/5">
            <FaRegCopyright /> 2024 Mk Solution™. All Rights Reserved. Admin
          </p>
        </div>
      </div>
    </div>
  );
}
