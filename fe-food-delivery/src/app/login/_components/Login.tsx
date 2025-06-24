"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginProps = {
  onBack: () => void;
  onNext: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const Login = ({ onBack }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await api.post("/auth/login", {
            email: values.email,
            password: values.password,
          });

          localStorage.setItem("token", res.data.token);
          alert("Login successful! Welcome back.");
          router.push("/");
        } catch (err: any) {
          alert(err.response?.data?.message || "Invalid credentials");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="space-y-6">
          {/* Back Icon */}
          <div className="cursor-pointer w-fit" onClick={onBack}>
            <ChevronLeft width={24} height={24} className="border rounded" />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h3 className="text-[24px] font-semibold">
              Log in to your account
            </h3>
            <p className="text-[#71717A]">
              Enter your credentials to continue.
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

          {/* Password */}
          <div className="space-y-1">
            <Field name="password">
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
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Show password toggle */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="w-[16px] h-[16px] border rounded-md"
            />
            <span className="text-[#71717A]">Show password</span>
          </label>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
            className="w-[400px] h-[36px]"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>

          {/* Optional Link */}
          <div className="flex justify-center gap-1 text-sm">
            <span className="text-[#71717A]">Don’t have an account?</span>
            <span
              className="text-[#2563EB] cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};
