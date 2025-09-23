import React, { useState } from 'react';
import { Upload, FileText, Briefcase, Brain, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import FileUpload from './FileUpload';
import JobDescriptionInput from './JobDescriptionInput';
import ScoreDisplay from './ScoreDisplay';
import LoadingSpinner from './LoadingSpinner';
import DemoMode from './DemoMode';
import { analyzeResumeWithGemini } from '../services/geminiService.js';

const ResumeScoreChecker = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');   
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleFileUpload = (file, text) => {
    setResumeFile(file);
    setResumeText(text);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please upload a resume first.');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description.');
      return;
    }

    // Check if API key is available
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setShowDemo(true);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await analyzeResumeWithGemini(resumeText, jobDescription);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze resume. Please check your API key and try again.');
      console.error('Analysis error:', err);
      setShowDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResumeFile(null);
    setResumeText('');
    setJobDescription('');
    setAnalysis(null);
    setError('');
    setShowDemo(false);
  };

  // Show demo mode if triggered
  if (showDemo) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <DemoMode onAnalyze={handleAnalyze} />
      </div>
    );
  }

  return (
    <>
     <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-purple-500/10 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-pink-500/10 rounded-full opacity-20 animate-pulse delay-500"></div>
        
        {/* Additional dark theme decorative elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-600/5 to-cyan-600/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 w-full max-w-none px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6 overflow-y-auto">
          <header className="text-center mb-4 sm:mb-6 lg:mb-8">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-transform duration-300">
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 sm:mb-3">
              ATS Resume Score Checker
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
              Optimize your resume for Applicant Tracking Systems using AI-powered analysis
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 lg:gap-3 mt-3 sm:mt-4 lg:mt-6">
              <span className="px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-sm text-blue-300 rounded-full text-xs sm:text-sm font-medium shadow-sm border border-blue-500/20">
                🤖 AI-Powered
              </span>
              <span className="px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-sm text-purple-300 rounded-full text-xs sm:text-sm font-medium shadow-sm border border-purple-500/20">
                📊 Detailed Analysis
              </span>
              <span className="px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-sm text-indigo-300 rounded-full text-xs sm:text-sm font-medium shadow-sm border border-indigo-500/20">
                ⚡ Instant Results
              </span>
            </div>
          </header>
           <div className="w-full space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4">
        <div className={`flex items-center space-x-2 ${resumeFile ? 'text-green-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${resumeFile ? 'bg-green-500/20 scale-110 shadow-green-500/25' : 'bg-gray-700/50'}`}>
            {resumeFile ? <CheckCircle size={window.innerWidth < 640 ? 20 : 24} /> : <FileText size={window.innerWidth < 640 ? 20 : 24} />}
          </div>
          <span className="font-medium text-xs sm:text-sm lg:text-base">Upload Resume</span>
        </div>
        
        <div className={`w-1 h-6 sm:w-6 sm:h-1 lg:w-8 lg:h-1 rounded-full transition-colors duration-300 ${resumeFile ? 'bg-green-500/30' : 'bg-gray-600/30'}`}></div>
        
        <div className={`flex items-center space-x-2 ${jobDescription ? 'text-green-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${jobDescription ? 'bg-green-500/20 scale-110 shadow-green-500/25' : 'bg-gray-700/50'}`}>
            {jobDescription ? <CheckCircle size={window.innerWidth < 640 ? 20 : 24} /> : <Briefcase size={window.innerWidth < 640 ? 20 : 24} />}
          </div>
          <span className="font-medium text-xs sm:text-sm lg:text-base">Job Description</span>
        </div>
        
        <div className={`w-1 h-6 sm:w-6 sm:h-1 lg:w-8 lg:h-1 rounded-full transition-colors duration-300 ${analysis ? 'bg-green-500/30' : 'bg-gray-600/30'}`}></div>
        
        <div className={`flex items-center space-x-2 ${analysis ? 'text-green-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${analysis ? 'bg-green-500/20 scale-110 shadow-green-500/25' : 'bg-gray-700/50'}`}>
            {analysis ? <CheckCircle size={window.innerWidth < 640 ? 20 : 24} /> : <Brain size={window.innerWidth < 640 ? 20 : 24} />}
          </div>
          <span className="font-medium text-xs sm:text-sm lg:text-base">AI Analysis</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3 sm:p-4 lg:p-6 flex items-center space-x-3 mx-2 sm:mx-4 lg:mx-0 shadow-lg backdrop-blur-sm">
          <XCircle className="text-red-400 flex-shrink-0" size={20} />
          <span className="text-red-300 text-xs sm:text-sm lg:text-base">{error}</span>
        </div>
      )}

      {!analysis ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-4 lg:px-0">
          {/* File Upload Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-gray-700/50 hover:shadow-2xl hover:bg-gray-800/60 transition-all duration-300">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 flex items-center text-gray-100">
              <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-xl mr-2 sm:mr-3">
                <Upload size={20} className="text-blue-400" />
              </div>
              Upload Resume
            </h2>
            <FileUpload onFileUpload={handleFileUpload} />
            
            {resumeFile && (
              <div className="mt-3 sm:mt-4 lg:mt-6 p-3 sm:p-4 bg-green-900/30 border border-green-500/30 rounded-xl shadow-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <div>
                    <span className="text-green-300 font-medium text-xs sm:text-sm lg:text-base">{resumeFile.name}</span>
                    <p className="text-green-400 text-xs lg:text-sm mt-1">
                      Resume uploaded successfully ({Math.round(resumeFile.size / 1024)} KB)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Description Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-gray-700/50 hover:shadow-2xl hover:bg-gray-800/60 transition-all duration-300">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 flex items-center text-gray-100">
              <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-xl mr-2 sm:mr-3">
                <Briefcase size={20} className="text-purple-400" />
              </div>
              Job Description
            </h2>
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />
          </div>
        </div>
      ) : null}

      {/* Analyze Button */}
      {!analysis && (
        <div className="text-center px-2 sm:px-4 lg:px-0">
          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeText || !jobDescription}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 text-white font-semibold py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-12 rounded-2xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 mx-auto shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                <span className="text-xs sm:text-sm lg:text-base">Analyzing...</span>
              </>
            ) : (
              <>
                <Brain size={18} />
                <span className="text-xs sm:text-sm lg:text-base">Analyze Resume with AI</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 xl:p-12 text-center mx-2 sm:mx-4 lg:mx-0 border border-gray-700/50">
          <LoadingSpinner size="large" text="Analyzing Your Resume" />
          <h3 className="text-base sm:text-lg lg:text-xl font-medium mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-100">AI Analysis in Progress</h3>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-md mx-auto">Our AI is comparing your resume with the job requirements to provide detailed insights...</p>
        </div>
      )}

      {/* Results */}
      {analysis && !loading && (
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <ScoreDisplay analysis={analysis} />
          
          <div className="text-center px-2 sm:px-4 lg:px-0">
            <button
              onClick={resetAnalysis}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-xl transition-all duration-300 shadow-lg shadow-gray-700/25 hover:shadow-xl hover:shadow-gray-700/30 transform hover:scale-105 text-xs sm:text-sm lg:text-base"
            >
              Analyze Another Resume
            </button>
          </div>
        </div>
      )}
    </div>
     </div>
      </div>
    </div>
   
    </>
  );
};

export default ResumeScoreChecker;
