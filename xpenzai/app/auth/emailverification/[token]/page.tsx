"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, MailCheck } from "lucide-react";
import ProfileIcon from "@/component/ProfileIcon";
import ErrorMessage from "@/component/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useVerifyToken } from "@/hook/authHook";

export interface stateProps {
  message: string;
  status: boolean;
}

const EmailVerification = () => {
  const params = useParams<{ token: string }>();
  const [token, setToken] = useState<string>("");
  const { mutate, isPending, isError, error } = useVerifyToken();
  useEffect(() => {
    if (params?.token) {
      setToken(params.token);
    }
  }, [params]);

  const handleEmailVerification = async () => {
    mutate(token);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 font-(family-name:--font-baloo-bhai)">
      <div className="w-full max-w-[450px]">
        <Card className="border-none shadow-2xl shadow-green-900/10 bg-white/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
          <CardContent className="pt-12 pb-10 px-8 flex flex-col items-center">
            {/* Header Content INSIDE the Card */}
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="transform transition-transform hover:scale-110 duration-300">
                <ProfileIcon />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Verify Email
                </h1>
                <p className="text-slate-500 font-semibold px-2">
                  You&apos;re almost there! Click below to activate your account
                  and set up your wallet.
                </p>
              </div>
            </div>

            {/* Visual Confirmation Icon */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-100 shadow-inner">
              <MailCheck className="w-10 h-10 text-green-600" />
            </div>

            {/* Action Button */}
            <Button
              onClick={handleEmailVerification}
              disabled={isPending || !token}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-green-600/20 transition-all duration-300 active:scale-[0.98]"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify & Get Started"
              )}
            </Button>

            {/* Error Message Section */}
            {isError && (
              <div className="mt-6 w-full animate-in fade-in slide-in-from-top-2">
                <ErrorMessage
                  message={
                    error?.response?.data.message || "Verification failed!"
                  }
                />
              </div>
            )}

            {!token && !isPending && (
              <p className="mt-4 text-xs text-red-500 font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                Invalid or Missing Token
              </p>
            )}

            {/* Link inside the card */}
            <div className="mt-8">
              <Link
                href="/auth/login"
                className="text-slate-400 text-xs font-bold hover:text-green-600 transition-colors uppercase tracking-widest"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
