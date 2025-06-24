"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type LoginProps = {
  onBack: () => void;
};

export const PasswordReset = ({ onBack }: LoginProps) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  const EmailSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const PasswordSchema = yup.object().shape({
    otp: yup.string().required("OTP is required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters")
      .required("Password is required"),
  });

  if (step === 1) {
    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={EmailSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.post("/auth/reset-password-request", { email: values.email });
            setEmail(values.email);
            setStep(2);
          } catch (err: any) {
            alert(err.response?.data?.message || "Failed to send OTP");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="cursor-pointer w-fit" onClick={onBack}>
              <ChevronLeft width={24} height={24} className="border rounded" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[24px] font-semibold">Reset your password</h3>
              <p className="text-[#71717A]">
                Enter your email to receive a password reset code.
              </p>
            </div>
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
            <Button type="submit" disabled={isSubmitting} className="w-[400px] h-[36px]">
              {isSubmitting ? "Sending..." : "Send code"}
            </Button>
            <div className="flex justify-center gap-1 text-sm">
              <span className="text-[#71717A]">Don’t have an account?</span>
              <span className="text-[#2563EB] cursor-pointer" onClick={() => router.push("/signup")}>Sign up</span>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={{ otp: "", password: "" }}
      validationSchema={PasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await api.post("/auth/reset-password", {
            email,
            otp: values.otp,
            password: values.password,
          });
          alert("Password updated successfully");
          router.push("/login");
        } catch (err: any) {
          alert(err.response?.data?.message || "Failed to reset password");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="cursor-pointer w-fit" onClick={() => setStep(1)}>
            <ChevronLeft width={24} height={24} className="border rounded" />
          </div>
          <div className="space-y-1">
            <h3 className="text-[24px] font-semibold">Enter OTP and new password</h3>
          </div>
          <div className="space-y-1">
            <Field name="otp" placeholder="OTP" as={Input} className="w-[400px]" />
            <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="space-y-1">
            <Field
              name="password"
              type="password"
              placeholder="New Password"
              as={Input}
              className="w-[400px]"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-[400px] h-[36px]">
            {isSubmitting ? "Updating..." : "Reset Password"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
