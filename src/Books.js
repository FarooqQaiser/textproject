import React from "react";

export default function Books(props) {
  const handleClick = (bookId) => {
    props.sendBookId(bookId);
  };

  return (
    <div
      className="flex flex-col gap-4 justify-between text-start w-72 h-60 p-5 bg-[#131313]/90 border-4 border-gray-400 rounded-md hover:bg-[#272727]/90 hover:text-white hover:border-8"
      key={props.book.id}
    >
      <h2 className="text-center text-2xl font-semibold">
        {" "}
        {props.book.Title}
      </h2>
      <p>
        Published by: <strong>{props.book.Publisher}</strong>
      </p>
      <button
        className="bg-[#0000FF] p-3 rounded-md"
        onClick={() => handleClick(props.book.id)}
      >
        Open
      </button>
    </div>
  );
}
