import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Pagination({
  totalPages,
  renderNextPage,
  renderPreviousPage,
  generateButtonsForPagination,
}) {
  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_1fr] my-4 justify-center">
        <div className="flex justify-end mr-4">
          <button
            className="text-[#272727] border-2 p-2 border-[#131313] text-lg rounded-lg hover:bg-[#272727] hover:text-white"
            onClick={renderPreviousPage}
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] ">
          {generateButtonsForPagination(totalPages)}
        </div>
        <div className="flex">
          <button
            className="text-[#272727] border-2 p-2 border-[#131313] text-lg rounded-lg hover:bg-[#272727] hover:text-white"
            onClick={renderNextPage}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
