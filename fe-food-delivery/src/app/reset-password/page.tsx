"use client";
import React from "react";
import { Right } from "../signup/_components/Right";
import { PasswordReset } from "./_components/PasswordReset";

const EmailVerificationPage = () => {
  return (
    <div className="flex h-screen p-5">
      {/* Left Form Section */}
      <div className="flex w-1/3 justify-center items-center">
        <PasswordReset onBack={() => console.log("Back button clicked")} />
      </div>

      {/* Right Image Section */}
      <div className="w-2/3 h-full">
        <Right />
      </div>
    </div>
  );
};

export default EmailVerificationPage;
