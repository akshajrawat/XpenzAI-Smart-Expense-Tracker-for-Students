"use client";
import Lottie from "lottie-react";
import expenseAnimation from "@/public/animation/Money Investment.json";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Home = () => {
  const expenseFeatures = [
    "Tracking",
    "Planning",
    "Analysis",
    "Compliance",
    "Insights",
  ];

  return (
    // Removed bg-slate-50 to let your RootLayout gradient show through
    <div className="w-full  flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Content Area */}
          <div className="flex flex-col gap-6 lg:w-1/2 items-center lg:items-start animate-in fade-in slide-in-from-left duration-700">
            {/* Overline Label matching the Navbar Green */}
            <Badge
              variant="outline"
              className="border-green-600/30 text-green-700 bg-green-50/50 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold"
            >
              Personalized Finance
            </Badge>

            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold tracking-tight text-slate-900 text-center lg:text-left leading-[1.05]">
              Guiding You Through <br />
              <span className="text-green-600 italic">Expense</span> Complexity
            </h1>

            <p className="text-slate-600 text-base sm:text-lg xl:text-xl max-w-xl text-center lg:text-left leading-relaxed font-medium opacity-90">
              We simplify expense tracking with smart tools helping students and
              individuals manage budgets, control spending, and build better
              financial habits.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start mt-2">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 rounded-full font-bold shadow-xl shadow-green-600/20 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                <Link href="/auth/login">Start Tracking Free</Link>
              </Button>
            </div>

            {/* Features Display with shadcn Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-6">
              {expenseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm border border-green-100 text-slate-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:border-green-300 transition-colors cursor-default"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Image Area */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative animate-in zoom-in duration-1000">
            {/* Visual glow that compliments the navbar green */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-400/20 blur-[100px] rounded-full -z-10" />

            <div className="w-full max-w-[450px] lg:max-w-full aspect-square drop-shadow-2xl">
              <Lottie
                className="w-full h-full"
                animationData={expenseAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
