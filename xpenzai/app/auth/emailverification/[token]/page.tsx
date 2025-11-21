"use client";
import ErrorMessage from "@/component/ErrorMessage";
import Loading from "@/component/Loading";
import ProfileIcon from "@/component/ProfileIcon";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface stateProps {
  message: string;
  status: boolean;
}
const EmailVerification = () => {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  // states
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<stateProps>({
    message: "",
    status: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // set token to the state
  useEffect(() => {
    if (params?.token) {
      setToken(params.token);
    }
  }, [params]);

  // send req to server
  const handleEmailVerification = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/users/verifyemail", { token });
      setLoading(false);
      toast.success(res?.data.message);
      router.push("/auth/login");
    } catch (error: any) {
      setLoading(false);
      setError({
        message: error.response?.data.message || error.message,
        status: true,
      });
      console.error(
        " Backend error in emailverification:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh] bg-green-50">
      <div className="flex flex-col justify-center items-center shadow-md py-6 xl:px-10 px-6 rounded-2xl bg-white border border-green-100">
        {/* Profile Icon */}
        <ProfileIcon />

        <h1 className="text-xl lg:text-3xl font-semibold text-green-700 mt-3">
          Email Verification ✅
        </h1>

        <p className="text-sm lg:text-lg font-medium text-gray-600 mt-1 text-center">
          Click the button below to verify your email:
        </p>

        {/* Button */}
        <button
          onClick={handleEmailVerification}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full mt-4 shadow-sm transition-all duration-200"
        >
          Verify Email
        </button>
        {/* error message */}
        {error.status && <ErrorMessage message={error.message} />}

        {/* loading state */}
        {loading && <Loading message="" />}
      </div>
    </div>
  );
};

export default EmailVerification;
