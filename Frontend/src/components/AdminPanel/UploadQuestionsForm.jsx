import { useState } from "react";

export default function UploadQuestionsForm() {
  const [questions, setQuestions] = useState([""]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("✅ Questions saved successfully");
  };

  const handleUpload = async () => {
  try {
    const payload = {
      company: document.querySelector("select[name='company']").value,
      role: document.querySelector("select[name='role']").value,
      round: document.querySelector("select[name='round']").value,
      timeRange: document.querySelector("select[name='time']").value,
      questions
    };

    await fetch("http://localhost:4000/api/questions/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    showToast("🚀 Questions uploaded successfully");
    setQuestions([""]);
  } catch (err) {
    showToast("❌ Upload failed");
  }
};


  return (
    <>
      {/* 🔔 Right Side Toast */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
            {toast.message}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-2xl rounded-xl shadow-2xl shadow-blue-700 p-6 space-y-5 max-h-[85vh] overflow-hidden"
        >
          <h2 className="text-2xl font-semibold text-center text-blue-600">
            Upload Interview Questions
          </h2>

          {/* Company */}
          <select name="company" required className="w-full border p-2 rounded-lg">
            <option value="">Select Company</option>
            <option>HotWax Systems</option>
            <option>Hoonartek</option>
            <option>Systango</option>
            <option>Zimetrics Technologies</option>
            <option>GammaEdge Technologies</option>
            <option>Jaro Education</option>
          </select>

          {/* Role & Round */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="role" required className="border p-2 rounded-lg">
              <option value="">Role Type</option>
              <option>Tech</option>
              <option>Non-Tech</option>
            </select>

            <select name="round" required className="border p-2 rounded-lg">
              <option value="">Round</option>
              <option>Coding</option>
              <option>Interview</option>
            </select>
          </div>

          {/* Time */}
          <select name="time" required className="w-full border p-2 rounded-lg">
            <option value="">Time Range</option>
            <option>15 Days</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>

          {/* Questions */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="text-blue-600 font-semibold"
              >
                + Add Question
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto pr-2">
              {questions.map((q, index) => (
                <textarea
                  key={index}
                  value={q}
                  onChange={(e) =>
                    handleQuestionChange(index, e.target.value)
                  }
                  placeholder={`Question ${index + 1}`}
                  className="w-full border p-2 rounded-lg mb-2"
                  rows="2"
                  required
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleUpload}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Upload Questions
            </button>
          </div>
        </form>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          .animate-slide-in {
            animation: slideIn 0.4s ease-out;
          }
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}