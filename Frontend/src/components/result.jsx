import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state || { feedback: null };

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Analysis Failed</h1>
        <p className="text-gray-600 mb-8">We couldn't retrieve your interview feedback. Please try again.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Interview Performance Review</h1>
        <p className="text-gray-500 mb-6">Here is a detailed breakdown of your performance.</p>

        {/* Overall Score */}
        <div className="text-center bg-blue-50 rounded-xl p-6 mb-8">
          <p className="text-lg font-semibold text-blue-800">Overall Score</p>
          <p className={`text-7xl font-bold ${getScoreColor(feedback.overallScore)}`}>
            {feedback.overallScore}<span className="text-3xl text-gray-400">/100</span>
          </p>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">{feedback.overallFeedback}</p>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-3">✅ Strengths</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {feedback.strengths.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">💡 Areas for Improvement</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {feedback.areasForImprovement.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>

        {/* Question Breakdown */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Question-by-Question Analysis</h2>
          <div className="space-y-6">
            {feedback.questionBreakdown.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-700 w-5/6">{index + 1}. {item.question}</p>
                  <p className={`text-xl font-bold ${getScoreColor(item.score)}`}>{item.score}</p>
                </div>
                <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded mb-3">
                  <span className="font-semibold">Your Answer:</span> "{item.answer}"
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Feedback:</span> {item.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
            <button
                onClick={() => navigate('/')} // Navigate to home or another interview setup page
                className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Try Another Interview
            </button>
        </div>
      </div>
    </div>
  );
}