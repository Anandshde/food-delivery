"use client";
import { LeftStep1 } from "./_components/LeftStep_1";
import { LeftStep2 } from "./_components/LeftStep_2";
import { Right } from "./_components/Right";

import { useEffect, useState } from "react";

const SignUpPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  return (
    <div className="flex h-screen p-5">
      {/* Left Form Section */}
      <div className="flex w-1/3 justify-center items-center">
        {step === 1 && (
          <LeftStep1 onNext={() => setStep(2)} setEmail={setEmail} />
        )}
        {step === 2 && <LeftStep2 onBack={() => setStep(1)} email={email} />}
      </div>

      {/* Right Image Section */}
      <div className="w-2/3 h-full">
        <Right />
      </div>
    </div>
  );
};

export default SignUpPage;
