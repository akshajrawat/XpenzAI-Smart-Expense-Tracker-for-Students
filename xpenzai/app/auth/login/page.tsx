"use client";

import ProfileIcon from "@/component/ProfileIcon";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { stateProps } from "../emailverification/[token]/page";

type Inputs = {
  email: string;
  password: number;
};

const Login = () => {
  const router = useRouter();
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<stateProps>({
    message: "",
    status: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  // handles login logic
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/users", data);
      toast.success(response?.data.message);
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      setError({
        message: error.response?.data.message || error.message,
        status: true,
      });
      console.error(
        "Error in login.tsx :- ",
        error.response?.data.message || error.message
      );
    }
  };

  return (
    <div className=" h-[94vh] lg:h-[90vh]  px-[10%] sm:px-[25%] xl:px-[32%] pt-8 w-full flex flex-col justify-center">
      {/* Profile Icon */}
      <ProfileIcon />

      {/* Text */}
      <h1 className="text-xl lg:text-3xl font-bold ml-1 mt-3"> Welcome Back</h1>
      <p className="text-sm lg:text-lg font-semibold text-[#00000077] ml-1">
        {" "}
        LogIn to continue your expense tracking!!
      </p>

      {/* login form */}
      <form
        className="flex flex-col justify-center items-center gap-3 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email */}
        <div className="flex flex-col w-full">
          <label
            className="ml-1 text-[#000000a7] font-semibold lg:text-lg"
            htmlFor="email"
          >
            Email :
          </label>
          <div className="flex gap-1">
            <input
              id="email"
              className="border-2 border-[#0000001d] py-1 px-4 rounded-xl shadow-sm outline-none w-full"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-700 font-bold text-sm">*</span>
            )}
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col w-full ">
          <label
            className="ml-1 text-[#000000a7] font-semibold lg:text-lg"
            htmlFor="password"
          >
            Password :
          </label>
          <div className="flex gap-1">
            <input
              id="password"
              className="border-2 border-[#0000001d] py-1 px-4 rounded-xl shadow-sm outline-none w-full"
              type="text"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-700 font-bold text-sm">*</span>
            )}
          </div>

          {/* forgot password */}
          <p className="text-right text-sm lg:text-lg font-semibold mt-1 mr-2">
            Forgot your password?{" "}
            <Link className="font-bold text-green-600" href={"/"}>
              Reset
            </Link>
          </p>
        </div>
        <input
          className="bg-green-600 text-white font-bold px-6 py-2 rounded-2xl mt-3 shadow-sm"
          type="submit"
        />
      </form>

      {/* seperator */}
      <div className="flex items-center w-full my-4">
        <div className="grow border-t border-gray-300"></div>
        <span className="px-3 text-sm lg:text-lg text-gray-500 font-medium">
          OR
        </span>
        <div className="grow border-t border-gray-300"></div>
      </div>

      {/* register */}
      <p className="text-center w-full lg:text-lg">
        Don't have an account?{" "}
        <Link className="font-bold text-green-600" href={"/auth/register"}>
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default Login;
