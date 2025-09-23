import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';

export default function Disqualified() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/'); // Navigate to the root route of your application
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
          <ShieldX className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-6">
          Interview Terminated
        </h1>
        <p className="text-gray-600 mt-4 text-base">
          This interview session was terminated because the maximum number of warnings for policy violations was exceeded.
        </p>
        <p className="text-gray-500 mt-2 text-sm">
          Please ensure you follow all guidelines in future sessions.
        </p>
        <div className="mt-8">
          <button
            onClick={handleReturnHome}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export { Disqualified };
