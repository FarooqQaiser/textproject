import React from "react";
import { MdOutlineClose } from "react-icons/md";

export default function BookDetails(props) {
  return (
    <div className="fixed grid grid-rows-[1fr_10fr] mx-[25%] w-1/2 h-4/5 bg-[#272727] rounded-lg">
      <div className="grid grid-cols-[22fr_1fr] w-full">
        <div className="flex items-center justify-center mt-2 text-center text-xl text-[#6395af] font-semibold">
          <h1>Book Details</h1>
        </div>
        <div className="flex justify-end">
          <button
            className="text-white align-top h-1/4 p-3"
            onClick={props.closeBookDetails}
          >
            <MdOutlineClose />
          </button>
        </div>
      </div>
      <div className="ml-5 flex flex-col items-center gap-4 ">
        <p className="text-xl font-semibold text-[#6395af]">
          Title of the book:
          <span className="text-white text-2xl font-bold ml-3 border-b-2 border-white">
            {props.bookTitle}
          </span>
        </p>
        <div className="flex flex-col gap-4 text-left w-full ">
          <p className="text-[#6395af]">
            Published by:{" "}
            <strong className="font-semibold text-white">
              {props.bookPublisher}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Published in:{" "}
            <strong className="font-semibold text-white">
              {props.bookYear}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Book handle:{" "}
            <strong className="font-semibold text-white">
              {props.bookHandle}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Book number of pages:{" "}
            <strong className="font-semibold text-white">
              {props.bookPages}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Book villains:{" "}
            <strong className="font-semibold text-white">
              {props.bookVillains}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Book notes:{" "}
            <strong className="font-semibold text-white">
              {props.bookNotes}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Book created at:{" "}
            <strong className="font-semibold text-white">
              {props.bookCreatedAt}
            </strong>
          </p>
          <p className="text-[#6395af]">
            Book ISBN:{" "}
            <strong className="font-semibold text-white">
              {props.bookISBN}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
