import React from "react";

export default function SearchedBook(props) {
  const handleClick = (bookId) => {
    props.sendBookId(bookId);
  };

  return (
    <div
      className="flex flex-col gap-4 justify-between text-start w-72 h-60 p-5 bg-[#131313]/90 border-4 border-gray-400 rounded-md hover:bg-[#272727]/90 hover:text-white hover:border-8"
      key={props.bookId}
    >
      <h2 className="text-center text-2xl font-semibold"> {props.bookTitle}</h2>
      <p>
        Published by: <strong>{props.bookPublisher}</strong>
      </p>
      <button
        className="bg-[#0000FF] p-3 rounded-md"
        onClick={() => handleClick(props.bookId)}
      >
        Open
      </button>
    </div>
  );
}
