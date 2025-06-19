"use client";

import { Right } from "../signup/_components/Right";
import { Login } from "./_components/Login";
import { useEffect, useState } from "react";

interface LoginProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

const LoginUp = ({ onNext, setEmail }: LoginProps) => {
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (step === 2) {
      onNext();
    }
  }, [step, onNext]);

  return (
    <div className="flex h-screen p-5">
      {/* Зүүн талын формын хэсэг */}
      <div className="flex w-1/3 justify-center items-center">
        {step === 1 && (
          <Login
            onNext={() => setStep(2)}
            setEmail={setEmail}
            onBack={() => console.log("Back clicked")} // 👈 энэ мөрийг нэм
          />
        )}
      </div>

      {/* Баруун талын зурагтай хэсэг */}
      <div className="w-2/3 h-full">
        <Right />
      </div>
    </div>
  );
};

export default LoginUp;
