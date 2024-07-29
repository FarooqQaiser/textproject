import React, { useState } from "react";
import HeaderForSignUpAndLogIn from "./Header";
import FooterForSignUpAndLogIn from "./Footer";

export default function SignUp() {
  const [firstName, setName] = useState("");
  const [lastName, setEmail] = useState("");
  const [Email, setPassword] = useState("");
  const [Gender, setAbout] = useState("");

  const loggedIn = false;
  const searchBook = "";

  const saveUser = () => {
    const data = { firstName, lastName, Email, Gender };
    const dataStringified = JSON.stringify(data);
    console.log(data);
    fetch("https://385f-154-192-156-24.ngrok-free.app/api/add/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: dataStringified,
    }).then((result) => {
      console.log("result: ", result);
    });
  };

  return (
    <>
      <header>
        <HeaderForSignUpAndLogIn loggedIn={loggedIn} searchBook={searchBook} />
      </header>
      <main className=" flex justify-center">
        <div className="px-4 pl-10 py-4 w-2/5 h-1/2 bg-[#1d1d1d] rounded-3xl">
          <p className=" text-2xl text-white">Register</p>
          <div className="grid gap-1 mt-4 justify-start">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-[#6796AF]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="mt-1 w-96 p-3 bg-inherit border-b-2 border-[#6796AF]"
                value={firstName}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[#6796AF]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="mt-1 w-96 p-3 bg-inherit border-b-2 border-[#6796AF]"
                value={lastName}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-[#6796AF]">
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="Email"
                className="mt-1 w-96 p-3 bg-inherit border-b-2 border-[#6796AF]"
                value={Email}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="about" className="text-[#6796AF]">
                Gender
              </label>
              <textarea
                className="mt-1 w-96 h-32 p-3 bg-inherit border-b-2 border-[#6796AF]  focus:border-none"
                type="text"
                name="Gender"
                id="Gender"
                value={Gender}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={saveUser}
                className="mt-3 px-3 py-2 bg-[#06B6D4] font-bold rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="mt-2">
            <a href="/Home">Already have an account?</a>
          </div>
        </div>
      </main>
      <footer>
        <FooterForSignUpAndLogIn />
      </footer>
    </>
  );
}
