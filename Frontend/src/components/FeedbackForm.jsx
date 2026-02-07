import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedbackForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  };

  const handleSkip = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] p-4">
      
      {/* Card */}
      <div className="w-full max-w-lg bg-[#111827] text-white rounded-3xl 
      shadow-[0_10px_40px_#2B5C93] p-6 sm:p-8 transition-all">

        <h2 className="text-3xl font-bold text-center mb-2">
          Interview Feedback
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Your feedback helps us improve the interview experience 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Rating */}
          <div>
            <label className="text-sm text-gray-300">
              Rate your experience
            </label>

            <select
              required
              className="w-full mt-2 bg-[#0B0F14] border border-gray-700 
              rounded-xl p-3 focus:outline-none focus:ring-2 
              focus:ring-[#2B5C93] transition"
            >
              <option value="">Select rating</option>
              <option>⭐ Excellent</option>
              <option>👍 Good</option>
              <option>😐 Average</option>
              <option>👎 Poor</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm text-gray-300">
              Interview Difficulty
            </label>

            <select
              required
              className="w-full mt-2 bg-[#0B0F14] border border-gray-700 
              rounded-xl p-3 focus:outline-none focus:ring-2 
              focus:ring-[#2B5C93] transition"
            >
              <option value="">Select difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Suggestions */}
          <div>
            <label className="text-sm text-gray-300">
              Suggestions
            </label>

            <textarea
              rows="4"
              placeholder="Tell us how we can improve..."
              className="w-full mt-2 bg-[#0B0F14] border border-gray-700 
              rounded-xl p-3 focus:outline-none focus:ring-2 
              focus:ring-[#2B5C93] transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <button
              type="button"
              onClick={handleSkip}
              className="w-full border border-gray-600 rounded-xl py-3
              hover:bg-gray-800 transition"
            >
              Skip
            </button>

            <button
              type="submit"
              disabled={showSuccess}
              className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-blue-600 to-[#2B5C93]
              hover:scale-[1.02] active:scale-[0.98]
              transition disabled:opacity-50"
            >
              Submit Feedback
            </button>

          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          
          <div className="bg-[#111827] text-white px-10 py-8 rounded-3xl 
          shadow-[0_10px_40px_#2B5C93] text-center animate-pulse">

            <div className="text-5xl mb-3">✅</div>

            <h3 className="text-2xl font-bold">
              Feedback Submitted!
            </h3>

            <p className="text-gray-400 mt-2">
              Redirecting to home...
            </p>

          </div>
        </div>
      )}
    </div>
  );
}