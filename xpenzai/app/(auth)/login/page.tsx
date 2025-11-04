"use client";
import { UserRoundPen } from "lucide-react";
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
    <div className=" h-full px-6 pt-8">
      {/* Profile Icon */}
      <div className="bg-[#d8d8d865] w-18 h-18 rounded-full flex justify-center items-center shadow-inner">
        <div className="bg-white w-14 h-14 shadow-md flex justify-center items-center rounded-full">
          <UserRoundPen className="text-[#000000a0]" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-xl font-medium ml-1 mt-3"> Welcome Back</h1>
      <p className="text-sm font-semibold text-[#00000077] ml-1">
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
            className="ml-1 text-[#000000a7] font-semibold"
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
          {errors.email && <span>This field is required</span>}
        </div>

        {/* password */}
        <div className="flex flex-col w-full">
          <label
            className="ml-1 text-[#000000a7] font-semibold"
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
          <p className="text-right text-sm font-semibold mt-1 mr-2">
            Forgot your password?{" "}
            <Link className="font-bold" href={"/"}>
              Reset
            </Link>
          </p>
          {errors.password && <span>This field is required</span>}
        </div>
        <input
          className="bg-[#2ec4b6] text-white font-bold px-6 py-2 rounded-2xl mt-3 shadow-sm"
          type="submit"
        />
      </form>

      {/* seperator */}
      <div className="flex items-center w-full my-4">
        <div className="grow border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500 font-medium">OR</span>
        <div className="grow border-t border-gray-300"></div>
      </div>

      {/* register */}
      <p className="text-center w-full">
        Don't have an account?{" "}
        <Link className="font-bold" href={"/register"}>
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default Login;
