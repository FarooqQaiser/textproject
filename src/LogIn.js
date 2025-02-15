import React from "react";
import HeaderForSignUpAndLogIn from "./Header";
import Footer from "./Footer";

export default function LogIn() {
  const loggedIn = false;
  const searchBook = " ";

  return (
    <div>
      <header>
        <HeaderForSignUpAndLogIn loggedIn={loggedIn} searchBook={searchBook} />
      </header>
      <main className="flex justify-center">
        <div className="flex flex-col items-center py-4 w-1/3 h-1/2 bg-[#1d1d1d] rounded-3xl">
          <p className=" text-2xl text-white">Login</p>
          <div className="grid gap-1 mt-4 justify-start">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[#6796AF]">
                Email Address
              </label>
              <input
                type="text"
                name="lastname"
                id="email"
                className="mt-1 w-96 p-3 bg-inherit border-b-2 border-[#6796AF]"
                // value={lastName}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-[#6796AF]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 w-96 p-3 bg-inherit border-b-2 border-[#6796AF]"
                // value={Email}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
              />
            </div>
            <div className="flex justify-center">
              <button className="mt-3 px-3 py-2 bg-[#06B6D4] font-bold rounded-md">
                <a href="/Home">Login</a>
              </button>
            </div>
          </div>
          <div className="mt-2">
            <a href="/SignUp">Don't have an account?</a>
          </div>
        </div>
      </main>
      <footer className="mt-28">
        <Footer />
      </footer>
    </div>
  );
}
