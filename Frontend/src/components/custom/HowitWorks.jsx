import React from "react";
import { Briefcase, MessageSquareText, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: (
      <Briefcase className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,225,0,0.4)]" />
    ),
    title: "Choose Your Role",
    description:
      "Select the job role you are preparing for — Software Engineer, Data Analyst, Product Manager, and more.",
  },
  {
    icon: (
      <MessageSquareText className="w-12 h-12 text-pink-400 drop-shadow-[0_0_8px_rgba(225,0,255,0.4)]" />
    ),
    title: "Practice Interview Questions",
    description:
      "Our AI simulates real interview questions tailored to your chosen role with contextual follow-ups.",
  },
  {
    icon: (
      <Zap className="w-12 h-12 text-green-400 drop-shadow-[0_0_8px_rgba(0,255,100,0.4)]" />
    ),
    title: "Get Real-Time Feedback",
    description:
      "Receive instant feedback on communication, clarity, and confidence while answering questions.",
  },
];

const HowItWork = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0b0f14] via-[#0b0f14] to-[#0a0e14] text-white">
      <div className="max-w-6xl mx-auto px-4 pt-16 text-center">

        {/* 🔹 Heading with horizontal lines dsadas */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-20 md:w-42 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            How <span className="text-blue-500">It Works</span>
          </h2>

          <span className="w-20 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
        </div>

        {/* Subtext */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-16 font-medium">
          Get ready for your next interview with our AI-powered platform. Follow
          these simple steps to practice, learn, and improve.
        </p>

        {/* 🔹 Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative bg-[#151a23]/90 border border-blue-900 rounded-2xl px-6 pt-16 pb-10 
              shadow-xl shadow-blue-700/20 flex flex-col items-center text-center 
              w-full max-w-[300px] hover:scale-105 transition-all duration-300
              ${index === 2 ? "col-span-2 md:col-span-1" : ""}`}
            >
              {/* Icon */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="w-14 h-14 flex items-center justify-center bg-[#141822] rounded-full shadow-lg">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-3 mt-4">
                {step.title}
              </h3>

              <p className="text-gray-300 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-20">
          <button
            onClick={() => navigate("/ai-interview-form")}
            className="px-8 py-3 bg-blue-600 text-white 
            hover:bg-white hover:text-blue-600 
            border border-blue-600 rounded-3xl transition font-medium"
          >
            Start Interview
          </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWork;