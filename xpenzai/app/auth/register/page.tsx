"use client";
import ProfileIcon from "@/component/ProfileIcon";
import axiosInstance from "@/utils/axios";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { stateProps } from "../emailverification/[token]/page";
import { useState } from "react";
import toast from "react-hot-toast";

interface Inputs {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
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

  // Handle submit of data
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/users/signup", data);
      toast.success(response?.data.message);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError({
        message: error.response?.data.message || error.message,
        status: true,
      });
      console.error(
        "Error in register.tsx :- ",
        error.response?.data.message || error.message
      );
    }
  };
  return (
    <div className="h-[94vh] lg:h-[90vh] px-[10%] sm:px-[25%] xl:px-[32%] pt-8 w-full flex flex-col justify-center">
      {/* Profile Icon */}
      <ProfileIcon />

      {/* Text */}
      <h1 className="text-xl lg:text-3xl font-bold ml-1 mt-3"> Welcome Back</h1>
      <p className="text-sm lg:text-lg font-semibold text-[#00000077] ml-1">
        {" "}
        Register to continue your expense tracking!!
      </p>

      {/* login form */}
      <form
        className="flex flex-col justify-center items-center gap-3 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* username */}
        <div className="flex flex-col w-full">
          <label
            className="ml-1 text-[#000000a7] font-semibold text-lg"
            htmlFor="username"
          >
            Username :
          </label>
          <div className="flex  gap-1">
            <input
              id="username"
              className="border-2 w-full border-[#0000001d] py-1 px-4 rounded-xl shadow-sm outline-none"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-800 text-sm font-bold">*</span>
            )}
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col w-full">
          <label
            className="ml-1 text-[#000000a7] font-semibold text-lg"
            htmlFor="email"
          >
            Email :
          </label>
          <div className="flex gap-1">
            <input
              id="email"
              className="border-2 w-full border-[#0000001d] py-1 px-4 rounded-xl shadow-sm outline-none"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-800 text-sm font-bold">*</span>
            )}
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col w-full">
          <label
            className="ml-1 text-[#000000a7] font-semibold text-lg"
            htmlFor="password"
          >
            Password :
          </label>
          <div className="flex gap-1">
            <input
              id="password"
              className="border-2 w-full border-[#0000001d] py-1 px-4 rounded-xl shadow-sm outline-none"
              type="text"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-800 text-sm font-bold">*</span>
            )}
          </div>
        </div>
        <input
          className="bg-green-600 text-white font-bold px-6 py-2 rounded-2xl mt-3 shadow-sm"
          type="submit"
        />
      </form>

      {/* seperator */}
      <div className="flex items-center w-full my-4">
        <div className="grow border-t border-gray-300"></div>
        <span className="px-3 text-sm lg:text-lg text-gray-500 font-medium ">
          OR
        </span>
        <div className="grow border-t border-gray-300"></div>
      </div>

      {/* login */}
      <p className="text-center w-full lg:text-lg">
        Already have an account?{" "}
        <Link className="font-bold text-green-600" href={"/login"}>
          SignIn
        </Link>
      </p>
    </div>
  );
};

export default Register;
