"use client";

import ProfileIcon from "@/component/ProfileIcon";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: number;
};

const Login = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  console.log(watch("email"));
  console.log(watch("password"));
  const onSubmit: SubmitHandler<Inputs> = () => {};
  return (
    <div className=" h-[94vh] lg:h-[90vh]  px-[10%] sm:px-[25%] xl:px-[32%] pt-8 w-full flex flex-col justify-center">
      {/* Profile Icon */}
      <ProfileIcon />

      {/* Text */}
      <h1 className="text-xl lg:text-3xl font-medium ml-1 mt-3">
        {" "}
        Welcome Back
      </h1>
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
          <input
            id="email"
            className="border-2 border-[#0000001d] py-1 px-4 rounded-xl shadow-sm"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700 font-bold text-sm">
              This field is required*
            </span>
          )}
        </div>

        {/* password */}
        <div className="flex flex-col w-full ">
          <label
            className="ml-1 text-[#000000a7] font-semibold lg:text-lg"
            htmlFor="password"
          >
            Password :
          </label>
          <input
            id="password"
            className="border-2 border-[#0000001d] py-1 px-4 rounded-xl shadow-sm"
            type="text"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-700 font-bold text-sm">
              This field is required*
            </span>
          )}

          {/* forgot password */}
          <p className="text-right text-sm lg:text-lg font-semibold mt-1 mr-2">
            Forgot your password?{" "}
            <Link className="font-bold text-[#2ec4b6]" href={"/"}>
              Reset
            </Link>
          </p>
        </div>
        <input
          className="bg-[#2ec4b6] text-white font-bold px-6 py-2 rounded-2xl mt-3 shadow-sm"
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
        <Link className="font-bold text-[#2ec4b6]" href={"/register"}>
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default Login;
