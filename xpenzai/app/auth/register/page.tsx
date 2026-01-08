"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import ProfileIcon from "@/component/ProfileIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRegisterUser } from "@/hook/authHook";

export interface RegisterInputs {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { mutate, isPending } = useRegisterUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] px-6 font-(family-name:--font-baloo-bhai)">
      <div className="w-full max-w-[400px] flex flex-col">
        {/* Profile Icon */}
        <div className="mb-4 self-start lg:self-center">
          <ProfileIcon />
        </div>

        {/* Header Text */}
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Create Account
        </h1>
        <p className="text-sm lg:text-lg font-semibold text-slate-500 mb-6">
          Register to start your expense tracking journey!!
        </p>

        {/* Register Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label
              className="ml-1 text-slate-700 font-bold text-base"
              htmlFor="username"
            >
              Username :
            </Label>
            <div className="relative">
              <Input
                id="username"
                className="h-11 border-slate-200 rounded-xl shadow-sm focus-visible:ring-green-600 px-4"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="absolute right-3 top-2.5 text-red-600 font-bold">
                  *
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label
              className="ml-1 text-slate-700 font-bold text-base"
              htmlFor="email"
            >
              Email :
            </Label>
            <div className="relative">
              <Input
                id="email"
                className="h-11 border-slate-200 rounded-xl shadow-sm focus-visible:ring-green-600 px-4"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="absolute right-3 top-2.5 text-red-600 font-bold">
                  *
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 w-full">
            <Label
              className="ml-1 text-slate-700 font-bold text-base"
              htmlFor="password"
            >
              Password :
            </Label>
            <div className="relative">
              <Input
                id="password"
                className="h-11 border-slate-200 rounded-xl shadow-sm focus-visible:ring-green-600 px-4"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="absolute right-3 top-2.5 text-red-600 font-bold">
                  *
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700 text-white font-bold h-11 rounded-xl shadow-sm mt-4 transition-all active:scale-95"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {/* Separator */}
        <div className="flex items-center w-full my-8">
          <div className="grow border-t border-slate-200"></div>
          <span className="px-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
            OR
          </span>
          <div className="grow border-t border-slate-200"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm lg:text-base font-medium text-slate-600">
          Already have an account?{" "}
          <Link
            className="font-bold text-green-600 hover:underline underline-offset-4"
            href="/auth/login"
          >
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
