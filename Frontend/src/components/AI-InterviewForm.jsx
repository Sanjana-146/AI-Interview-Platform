import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import React, { useState, useContext } from "react";
import { CloudUpload } from "lucide-react";
import TravellingLine from '../components/custom/TravellingLine';

export default function AIInterviewForm() {
  const navigate = useNavigate();
  const {backendUrl, isLoggedIn} = useContext(AppContext);


  const [formData, setFormData] = useState({
    company: "",
    role: "",
    experience: "",
    difficulty: "",
    duration: "",
    techstack: "",
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setResume(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.company)
      newErrors.company = "Company description is required.";
    if (!formData.role) newErrors.role = "Job role is required.";
    if (!formData.experience || Number(formData.experience) < 0)
      newErrors.experience = "Enter a valid experience.";
    if (!formData.difficulty)
      newErrors.difficulty = "Difficulty level is required.";
    if (!formData.duration)
      newErrors.duration = "Interview duration is required.";
    if (!formData.techstack) newErrors.techstack = "Tech stack is required.";
    if (!resume) newErrors.resume = "Please upload your resume."; // Re-enabled validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the protection check right at the beginning
        if (!isLoggedIn) {
            alert("Please sign up or log in to submit the form.");
            navigate("/signup"); // Redirect them to the signup page
            return; // Stop the function immediately
        }
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("company", formData.company);
    data.append("jobRole", formData.role);
    data.append("jobExperience", formData.experience);
    data.append("difficulty", formData.difficulty);
    data.append("duration", formData.duration);
    data.append("techStack", formData.techstack);
    data.append("resume", resume); // Re-enabled file append

    try {
      const response = await fetch(`${backendUrl}/api/interview/submitForm`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server responded with an error:", errorData);
        throw new Error(`Form submission failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      navigate("/rules", { state: { questions: result.questions, duration: formData.duration , sessionId: result.sessionId  } });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      <TravellingLine />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">     
          {/* isme lien change ha thoda  <span className="text-blue-500">Screening</span> */}
          AI Interview  <span className="text-blue-500">Screening</span> Form   
        </h2>
        {/* All the form fields for company, role, etc. go here. They are correct as they were. */}
        <div>
          <label htmlFor="company" className="block font-medium mb-1">
            Company Description
          </label>
          <textarea
            id="company"
            rows={5}
            value={formData.company}
            onChange={handleChange}
            placeholder="Describe the company..."
            className="mt-1 bg-gray-700 border-none text-white focus:ring-2 focus:ring-blue-500 w-full rounded-lg p-2 resize-none overflow-y-auto"
          />
          {errors.company && (
            <p className="text-red-400 text-sm mt-1">{errors.company}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="role" className="block font-medium mb-1">
              Job Role
            </label>
            <input
              id="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Frontend Developer, Backend Engineer, etc."
              className="mt-1 bg-gray-700 border-none text-white focus:ring-2 focus:ring-purple-500 w-full rounded-lg p-2"
            />
            {errors.role && (
              <p className="text-red-400 text-sm mt-1">{errors.role}</p>
            )}
          </div>
          <div>
            <label htmlFor="experience" className="block font-medium mb-1">
              Experience (in years)
            </label>
            <input
              id="experience"
              type="number"
              min="0"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 2"
              className="mt-1 bg-gray-700 border-none text-white focus:ring-2 focus:ring-blue-500 w-full rounded-lg p-2"
            />
            {errors.experience && (
              <p className="text-red-400 text-sm mt-1">{errors.experience}</p>
            )}
          </div>
          <div>
            <label htmlFor="difficulty" className="block font-medium mb-1">
              Difficulty Level
            </label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 bg-gray-700 border-none text-white focus:ring-2 focus:ring-blue-500 w-full rounded-lg p-2"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="text-red-400 text-sm mt-1">{errors.difficulty}</p>
            )}
          </div>
          <div>
            <label htmlFor="duration" className="block font-medium mb-1">
              Interview Duration
            </label>
            <select
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 bg-gray-700 border-none text-white focus:ring-2 focus:ring-purple-500 w-full rounded-lg p-2"
            >
              <option value="">Select Duration(in minutes)</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
            {errors.duration && (
              <p className="text-red-400 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="techstack" className="block font-medium mb-1">
            Tech Stack
          </label>
          <textarea
            id="techstack"
            rows={4}
            value={formData.techstack}
            onChange={handleChange}
            placeholder="React, Node.js, Java, etc."
            className="mt-1 bg-gray-700 border-none text-white focus:ring-2 focus:ring-purple-500 w-full rounded-lg p-2 resize-none overflow-y-auto"
          />
          {errors.techstack && (
            <p className="text-red-400 text-sm mt-1">{errors.techstack}</p>
          )}
        </div>
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`mt-6 p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${
            resume
              ? "border-green-400 bg-green-900/20"
              : "border-gray-600 hover:border-blue-500"
          }`}
        >
          <CloudUpload className="h-12 w-12 text-blue-400" />
          <p className="mt-2 text-sm">
            Drag & drop your resume/CV here or click to upload
          </p>
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer mt-2 text-blue-300 underline"
          >
            {resume ? resume.name : "Browse Files"}
          </label>
          {errors.resume && (
            <p className="text-red-400 text-sm mt-2">{errors.resume}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-[260px] flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
