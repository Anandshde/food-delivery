"use client";
import React from "react";
import { Right } from "../signup/_components/Right";
import { EmailSend } from "./_components/EmailVerify";

const EmailVerifyPage = () => {
  return (
    <div className="flex h-screen p-5">
      {/* Left Form Section */}
      <div className="flex w-1/3 justify-center items-center">
        <EmailSend onBack={() => console.log("Back button clicked")} />
      </div>

      {/* Right Image Section */}
      <div className="w-2/3 h-full">
        <Right />
      </div>
    </div>
  );
};

export default EmailVerifyPage;
