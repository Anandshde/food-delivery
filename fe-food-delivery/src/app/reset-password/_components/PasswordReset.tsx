"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type LoginProps = {
  onBack: () => void;
};
export const PasswordReset = ({ onBack }: LoginProps) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="space-y-6">
        {/* Back Icon */}
        <div className="cursor-pointer w-fit" onClick={onBack}>
          <ChevronLeft width={24} height={24} className="border rounded" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-[24px] font-semibold">Reset your password</h3>
          <p className="text-[#71717A]">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Field
            name="email"
            type="email"
            placeholder="Email"
            as={Input}
            className="w-[400px]"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-[400px] h-[36px]">
          Send link
        </Button>

        {/* Optional Link */}
        <div className="flex justify-center gap-1 text-sm">
          <span className="text-[#71717A]">Don’t have an account?</span>
          <span
            className="text-[#2563EB] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Sign up
          </span>
        </div>
      </Form>
    </Formik>
  );
};
