import React from "react";

export default function Pagination({
  totalPages,
  renderNextPage,
  renderPreviousPage,
  generateButtonsForPagination,
}) {
  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_1fr] my-4 justify-center">
        <div className="flex justify-end">
          <button
            className="text-[#6395af] border-b-2 border-[#6395af] text-lg"
            onClick={renderPreviousPage}
          >
            Prev
          </button>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
          {generateButtonsForPagination(totalPages)}
        </div>
        <div className="flex justify-start">
          <button
            className="text-[#6395af] border-b-2 border-[#6395af] text-lg"
            onClick={renderNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
