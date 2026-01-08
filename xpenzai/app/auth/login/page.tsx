"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import ProfileIcon from "@/component/ProfileIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginUser } from "@/hook/authHook";

export type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { mutate, isPending } = useLoginUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
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
          Welcome Back
        </h1>
        <p className="text-sm lg:text-lg font-semibold text-slate-500 mb-6">
          LogIn to continue your expense tracking!!
        </p>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                className={`h-11 border-slate-200 rounded-xl shadow-sm focus-visible:ring-green-600 px-4 ${
                  errors.email ? "border-red-500" : ""
                }`}
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
            <div className="flex justify-between items-center mr-1">
              <Label
                className="ml-1 text-slate-700 font-bold text-base"
                htmlFor="password"
              >
                Password :
              </Label>
              <Link
                className="text-xs font-bold text-green-600 hover:text-green-700"
                href="/"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                className={`h-11 border-slate-200 rounded-xl shadow-sm focus-visible:ring-green-600 px-4 ${
                  errors.password ? "border-red-500" : ""
                }`}
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
              "Sign In"
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

        {/* Register Link */}
        <p className="text-center text-sm lg:text-base font-medium text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            className="font-bold text-green-600 hover:underline underline-offset-4"
            href="/auth/register"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
