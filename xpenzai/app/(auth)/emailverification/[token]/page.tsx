"use client";
import ProfileIcon from "@/component/ProfileIcon";

const EmailVerification = () => {
  const handleEmailVeification = () => {};

  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh] ">
      <div className="flex flex-col justify-center items-center shadow-sm py-6 xl:px-10 px-6 rounded-xl bg-[#cacaca42]">
        {/* profile Icon */}
        <ProfileIcon />
        <h1 className="text-xl lg:text-3xl font-medium ml-1 mt-3">
          {" "}
          Email Verification !!
        </h1>
        <p className="text-sm lg:text-lg font-semibold text-[#00000077] ml-1">
          {" "}
          Click the button to verify your email :-
        </p>

        {/* button */}
        <button
          onClick={handleEmailVeification}
          className="bg-[#2ec4b6] text-white font-bold px-6 py-2 rounded-2xl mt-3 shadow-sm"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
