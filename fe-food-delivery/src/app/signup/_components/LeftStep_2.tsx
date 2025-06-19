"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = yup.object().shape({
  pass: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("pass")], "Passwords must match")
    .required("Confirm your password"),
});

type LeftStep2Props = {
  onBack: () => void;
  email: string;
};

export const LeftStep2 = ({ onBack, email }: LeftStep2Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{ pass: "", confirm: "" }}
      validationSchema={FormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post("http://localhost:8000/signup", {
            email,
            password: values.pass,
          });
          alert(response.data.message);
          // Maybe redirect after signup?
          router.push("/login");
        } catch (err: any) {
          alert(
            err?.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="space-y-6">
          {/* Back Icon */}
          <div className="cursor-pointer w-fit" onClick={onBack}>
            <ChevronLeft width={24} height={24} className="border rounded " />
          </div>

          {/* Title and Description */}
          <div className="space-y-1">
            <h3 className="text-[24px] font-semibold">
              Create a strong password
            </h3>
            <p className="text-[#71717A]">
              Create a strong password with letters and numbers.
            </p>
          </div>

          {/* Password Fields */}
          <div className="space-y-4">
            <Field name="pass">
              {({ field }: any) => (
                <Input
                  {...field}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="w-[400px]"
                />
              )}
            </Field>
            <ErrorMessage
              name="pass"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field name="confirm">
              {({ field }: any) => (
                <Input
                  {...field}
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  className="w-[400px]"
                />
              )}
            </Field>
            <ErrorMessage
              name="confirm"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Show Password Toggle */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="w-[16px] h-[16px] border rounded-md"
            />
            <span className="text-[#71717A]">Show password</span>
          </label>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
            className="w-[400px] h-[36px] bg-[#a6a6a6] text-white"
          >
            {isSubmitting ? "Loading..." : "Let's Go"}
          </Button>

          {/* Log In Link */}
          <div className="flex justify-center gap-1 text-sm">
            <span className="text-[#71717A]">Already have an account?</span>
            <span
              className="text-[#2563EB] cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Log in
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};
