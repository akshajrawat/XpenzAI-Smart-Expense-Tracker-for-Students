"use client"
import Lottie from "lottie-react";
import expenseAnimation from "@/public/animation/Money Investment.json";

const Home = () => {
  const expenseFeatures = [
    " Tracking",
    " Planning",
    " Analysis",
    " Compliance",
    " Insights",
  ];

  return (
    <div className=" w-full px-1 sm:px-4 md:px-8 pt-6 pb-2 lg:py-16 xl:px-26 flex flex-col gap-4 justify-center">
      <p className="text-sm sm:text-lg text-[#000000ab] font-semibold pl-2">
        {" "}
        EXPENSE TRACKER{" "}
      </p>
      <div className="px-4 lg:flex xl:gap-4">
        {/* content area */}
        <div className="px-1 flex flex-col gap-3 xl:gap-6 items-center lg:w-[55%]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center font-bold">
            Guiding You Through <span className="text-green-700">Expense</span>{" "}
            Complexity{" "}
          </h1>
          <p className="text-center text-sm md:text-lg xl:text-xl sm:px-4 font-semibold text-[#00000069]">
            {" "}
            We simplify expense tracking with smart, personalized tools helping
            students and individuals manage budgets, control spending, and build
            better financial habits.
          </p>
          <button className="bg-green-600 text-white py-2 xl:py-3 w-35 rounded-full font-semibold shadow-sm">
            {" "}
            Start Tracking{" "}
          </button>

          {/* features display */}
          <div className="flex justify-center mt-1 gap-3  flex-wrap">
            {expenseFeatures.map((feature, index) => {
              return (
                <div
                  className="border border-[#00000080] text-[#0000006b] rounded-full px-2 sm:py-1 text-sm font-semibold"
                  key={index}
                >
                  {feature}
                </div>
              );
            })}
          </div>
        </div>

        {/* image area */}
        <div className=" flex flex-1 h-45 sm:h-55 lg:h-65 xl:h-85 justify-center items-center mt-4 md:mt-1">
          <Lottie
          className="w-full h-full object-fill"
            animationData={expenseAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
