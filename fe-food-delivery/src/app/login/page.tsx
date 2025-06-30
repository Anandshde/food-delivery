"use client";

import { useEffect, useState } from "react";
import { Right } from "../signup/_components/Right";
import { Login } from "./_components/Login";

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (step === 2) {
      // Do something after login, like route control if needed
      console.log("Login complete for:", email);
    }
  }, [step, email]);

  return (
    <div className="flex h-screen p-5">
      {/* Left: Login Form */}
      <div className="flex w-1/3 justify-center items-center">
        {step === 1 && (
          <Login
            onNext={() => setStep(2)}
            setEmail={setEmail}
            onBack={() => console.log("Back clicked")}
          />
        )}
      </div>

      {/* Right: Image or Design */}
      <div className="w-2/3 h-full">
        <Right />
      </div>
    </div>
  );
}
