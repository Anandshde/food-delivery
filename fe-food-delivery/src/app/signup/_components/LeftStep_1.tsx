"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { Dispatch, useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  createdAt: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email. Use a format like example@email.com")
    .required("Required"),
});

type LeftStep1Props = {
  onNext: () => void;
  setEmail: Dispatch<React.SetStateAction<string>>;
};

export const LeftStep1: React.FC<LeftStep1Props> = ({ onNext, setEmail }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        setEmail(values.email);
        onNext();
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <div className="space-y-6">
            {/* Back Icon */}
            <div className="cursor-pointer w-fit">
              <ChevronLeft width={24} height={24} className="border rounded" />
            </div>

            {/* Title and Description */}
            <div className="space-y-1">
              <h3 className="text-[24px] font-semibold">
                Create a strong password
              </h3>
              <p className="text-[#71717A]">
                Sign up to explore your favorite dishes.
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <Field
                name="email"
                type="email"
                placeholder="Enter your email address"
                as={Input}
                className="w-[400px]"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-[400px] h-[36px] bg-[#a6a6a6] text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : "Let's Go"}
            </Button>

            {/* Log In Link */}
            <div className="flex justify-center gap-1 text-sm">
              <span className="text-[#71717A]">Already have an account?</span>
              <span className="text-[#2563EB] cursor-pointer">Log in</span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
