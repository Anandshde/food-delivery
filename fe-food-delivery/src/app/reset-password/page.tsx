"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Right } from "../signup/_components/Right";
import { PasswordReset } from "./_components/PasswordReset";

const EmailVerificationPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen p-5">
      {/* Left Form Section */}
      <div className="flex w-1/3 justify-center items-center">
        <PasswordReset onBack={() => router.push('/login')} />
      </div>

      {/* Right Image Section */}
      <div className="w-2/3 h-full">
        <Right />
      </div>
    </div>
  );
};

export default EmailVerificationPage;
