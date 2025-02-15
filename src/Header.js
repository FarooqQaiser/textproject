import React from "react";
import { Link } from "react-router-dom";

export default function Header({ loggedIn, searchBook, showAllBooks }) {
  return (
    <div className="sticky grid grid-cols-[3fr_7fr] top-0 pb-3 pt-3  mb-10 bg-[#1d1d1d]">
      {loggedIn ? (
        <>
          <div
            className="flex justify-start cursor-pointer aurthor"
            onClick={showAllBooks}
          >
            <h1 className="pl-10 text-3xl font-bold">Stephen King Books</h1>
          </div>
          <div className="flex flex-row gap-3 justify-end pr-10">
            <input
              type="text"
              className="inputToSearchABook p-3 w-1/3 rounded-md text-black"
              name="searchBar"
              placeholder="Search by book name"
            />
            <button
              onClick={searchBook}
              className="bg-[#0000FF] p-3 rounded-md"
            >
              Search
            </button>
            <Link to="/LogIn">
              {" "}
              <button className="bg-blue-800 rounded-md p-3">Logout</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <a href="/LogIn">
            <div className="flex justify-start cursor-pointer">
              <h1 className="pl-10 text-3xl font-bold">Stephen King Books</h1>
            </div>
          </a>
          <div className=" w-full flex justify-end">
            <div className="grid grid-flow-col gap-4 items-center pr-10">
              <div className="flex w-16 h-10 justify-center">
                <Link
                  to="/LogIn"
                  className="flex justify-center w-full bg-blue-800 rounded-md"
                >
                  <button>Login</button>
                </Link>
              </div>
              <div className="flex w-16 h-10 justify-center">
                <Link
                  to="/SignUp"
                  className="flex justify-center w-full bg-blue-800 rounded-md"
                >
                  <button>Signup</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
