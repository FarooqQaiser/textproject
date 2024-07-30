import React, { useState } from "react";
import HeaderForSignUpAndLogIn from "./Header";
import Footer from "./Footer";

export default function SignUp() {
  const [firstName, setName] = useState("");
  const [lastName, setEmail] = useState("");
  const [Email, setPassword] = useState("");
  const [Gender, setGender] = useState("");

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

  const onChangeValue = (event) => {
    setGender(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <header>
        <HeaderForSignUpAndLogIn loggedIn={loggedIn} searchBook={searchBook} />
      </header>
      <main className=" flex justify-center">
        <div className="flex flex-col items-center py-4 w-1/3 h-1/2 bg-[#1d1d1d] rounded-3xl">
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
            <div
              onChange={onChangeValue}
              className="flex flex-row gap-10 justify-center"
            >
              <div className="flex flex-row gap-2 items-center text-[#6796AF]">
                Male
                <input type="radio" value={"male"} name="gender" className="" />
              </div>
              <div className="flex flex-row gap-2 items-center text-[#6796AF]">
                Female
                <input
                  type="radio"
                  value={"female"}
                  name="gender"
                  className=""
                />
              </div>
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
            <a href="/LogIn">Already have an account?</a>
          </div>
        </div>
      </main>
      <footer className="mt-10">
        <Footer />
      </footer>
    </>
  );
}
