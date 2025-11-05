import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ContactUS = () => {
    const navigate = useNavigate();
    const { backendUrl, isLoggedIn } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    // Function to handle changes in all form fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the protection check right at the beginning
        if (!isLoggedIn) {
            alert("Please sign up or log in to submit the form.");
            navigate("/signup"); // Redirect them to the signup page
            return; // Stop the function immediately
        }
        setStatus('Sending...');

        try {
            const response = await fetch(backendUrl + '/api/contact-us', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'something went wrong');
            }
            setStatus('Message sent successfully!');
            alert('Message sent successfully!');

            // Reset form after successful submission
            setFormData({ name: "", email: "", purpose: "", message: "" });

        } catch (error) {
            console.error('Submission Error:', error);
            setStatus(`Error: ${error.message}`);
            alert(`Error: ${error.message}`);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0b0f14] via-[#0b0f14] to-[#0a0e14] p-6">
            <div className="max-w-6xl w-full space-y-12">

                {/* Top Heading Section */}
                <div className="relative w-full flex flex-col justify-center items-center my-10">
                    <h1 className="absolute text-7xl md:text-[200px] font-extrabold text-gray-500 opacity-20 tracking-wider select-none">
                        CONTACT
                    </h1>
                    <div className="relative flex items-center justify-center gap-6 mt-6">
                        <div className="w-24 md:w-52 h-[2px] bg-blue-500 rounded-full"></div>
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-500 whitespace-nowrap">
                            GET IN TOUCH
                        </h2>
                        <div className="w-24 md:w-52 h-[2px] bg-blue-500 rounded-full"></div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-10 mt-30">

                    <div className="text-white">
            <h3 className="text-3xl font-extrabold text-gradient bg-clip-text tracking-wide uppercase text-white">
              Don’t Be <span className="text-blue-500">Shy 👋</span>
            </h3>
            <p className="text-gray-300 text-base leading-relaxed mt-6">
              I’m always happy to connect! Whether it’s a new project,
              collaboration, or just to say hello, feel free to reach out. Let’s
              create something amazing together.
            </p>
            <div className="space-y-6 mt-10">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition">
                  <span className="text-blue-400 text-2xl">📧</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Mail Me</h4>
                  <p className="text-gray-300 group-hover:text-blue-400 transition">
                    interviewedges@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition">
                  <span className="text-green-400 text-2xl">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Call Me</h4>
                  <p className="text-gray-300 group-hover:text-green-400 transition">
                    +91 9301163448
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-[#151a23]/90 p-6 rounded-xl shadow-lg shadow-blue-700 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your Name"
                                className="p-3 w-full rounded-md bg-transparent text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter a valid Email Address"
                                className="p-3 w-full rounded-md bg-transparent text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Dropdown Field */}
                            <select
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className="p-3 w-full rounded-md bg-transparent text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled className="bg-[#151a23] text-gray-400">
                                    Select Purpose
                                </option>
                                <option value="Project Inquiry" className="bg-[#151a23] text-white">
                                    Project Inquiry
                                </option>
                                <option value="Collaboration / Partnership" className="bg-[#151a23] text-white">
                                    Collaboration / Partnership
                                </option>
                                <option value="Business Proposal" className="bg-[#151a23] text-white">
                                    Business Proposal
                                </option>
                                <option value="Hiring / Freelance Opportunity" className="bg-[#151a23] text-white">
                                    Hiring / Freelance Opportunity
                                </option>
                                <option value="Feedback / Suggestions" className="bg-[#151a23] text-white">
                                    Feedback / Suggestions
                                </option>
                                <option value="Other" className="bg-[#151a23] text-white">
                                    Other
                                </option>
                            </select>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your Message"
                                rows="4"
                                className="p-3 w-full rounded-md bg-transparent text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>

                            <button
                                type="submit"
                                className="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all flex justify-center"
                            >
                                SUBMIT
                            </button>
                            {status && <p className="text-green-400 font-semibold mt-3 text-center transition-opacity duration-500">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUS;