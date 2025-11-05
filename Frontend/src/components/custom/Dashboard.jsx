import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import SidebarButton from './Button';
import {
  LogOut,
  Settings,
  ClipboardList,
  BarChart,
  Home,
  Calendar,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "Interview Details", icon: Calendar },
  // { label: "Results", icon: ClipboardList },
  // { label: "ATS Score Checker", icon: BarChart },
  { label: "Settings", icon: Settings },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const {user , setUser , logout , backendUrl} = useContext(AppContext);
  const [active, setActive] = useState("Dashboard");
  const [profilePicPreview , setProfilePicPreview] = useState(null);
  const [imageFile , setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isFetchingFeedback , setIsFetchingFeedback] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing , setIsEditing] = useState(false);
  const [formData , setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: ""
  });

  useEffect(() =>{
    if(user){
      setFormData({
        fName: user.fName || "",
        lName: user.lName || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    }
  } , [user]);

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Interviews List (from backend later)
  const [interviews, setInterviews] = useState([]);

  // ✅ 2. Add this useEffect to fetch interview data
useEffect(() => {
    // Only fetch if the user is loaded
    if (user) {
        const fetchInterviews = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/interview/my-interviews`, {
                    credentials: 'include', // Important for sending cookies
                });
                const data = await response.json();
                if (data.success) {
                    setInterviews(data.interviews);
                } else {
                    setError(data.message || "Failed to load interviews.");
                }
            } catch (err) {
                setError("An error occurred while fetching interviews.");
            }
        };
        fetchInterviews();
    }
}, [user, backendUrl]);

 // ✅ Add this new async function to handle the button click
  const handleViewFeedback = async (interviewId) => {
    setIsFetchingFeedback(true);
    setError("");
    try {
      const response = await fetch(`${backendUrl}/api/feedback/${interviewId}`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        // On success, navigate to the results page with the feedback data
        navigate('/result', { state: { feedback: data.feedback } });
      } else {
        setError(data.message || "Could not fetch feedback.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection.");
    } finally {
      setIsFetchingFeedback(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };


  const handleSave = async () => {
    setError("");
    setMessage("");

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("❌ Phone number must be exactly 10 digits.");
      return;
    }
    if (!formData.email.endsWith("@gmail.com")) {
      setError("❌ Only Gmail addresses are allowed (must end with @gmail.com).");
      return;
    }

    // create a single object to hold all updates
    let dataToUpdate = {...formData};

    if(imageFile){
      const picFormData = new FormData();
      picFormData.append('profilePic' , imageFile);
    try {
            const picResponse = await fetch(`${backendUrl}/api/user/upload-pic`, {
                method: 'POST',
                credentials: 'include',
                body: picFormData,
            });
            const picData = await picResponse.json();
            if (!picData.success) {
                setError(picData.message || 'Image upload failed.');
                return;
            }
            // Add the new image uRL to our main update object.
            dataToUpdate.profilePic = picData.user.profilePic;
        } catch (err) {
            setError('Image upload failed. Please check your connection.');
            return;
        }
      }


    try {
        const response = await fetch(`${backendUrl}/api/user/updateUser`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dataToUpdate),
        });
        const finalData = await response.json();
        if(finalData.success){
          setUser(finalData.user);
          setIsEditing(false);
          setProfilePicPreview(null);
          setMessage("Details updated successfully");
          setTimeout(() => setMessage(""), 1000);
        }
        else{
          setError(`❌ ${finalData.message}`);
        }
      } catch (err){
        setError("❌ An error occurred. Please try again.");
      };
  };

  // Decides which image to show: preview, saved URL, or fallback
  const displayImageUrl = profilePicPreview || user?.profilePic || `https://ui-avatars.com/api/?name=${user?.fName}+${user?.lName}&background=0369A1&color=fff`;
   if (!user) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white text-xl">
            Loading Dashboard...
        </div>
      );
  }
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative">
      {/* --------- Mobile Menu Button (Top-Right) --------- */}
      {!sidebarOpen && (
        <button
          className="md:hidden absolute top-4 right-4 z-30 p-2 bg-gray-800 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* --------- Sidebar --------- */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 text-white bg-gray-800 shadow-lg flex flex-col justify-between transform transition-transform duration-300 z-40 shadow-blue-400
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white"><span className="text-blue-500">Interview Edge</span>-AI</h2>
          <button
            className="md:hidden text-white hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-2 space-y-1 flex-1 text-white">
          {navItems.map((item) => (
            <SidebarButton
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={active === item.label}
              onClick={() => {
                setActive(item.label);
                setSidebarOpen(false);
                setError(""); 
              }}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <SidebarButton
            label="Logout"
            icon={LogOut}
            danger
            onClick={logout}
          />
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* --------- Main Content --------- */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">{active}</h1>

        {/* ---------------- Dashboard ---------------- */}
        {active === "Dashboard" && (
          <div className="space-y-6 shadow-lg shadow-blue-700 backdrop-blur-md">
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center space-x-6 border-b border-gray-700 pb-4 mb-4">
                <img
                  src={displayImageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h2 className="text-2xl font-semibold">
                  {user.fName} {user.lName}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">📧 Email</p>
                  <p className="font-medium">{user.email || "Loading..."}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">📱 Phone</p>
                  <p className="font-medium">{user.phone || "Loading..."}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- Interview Details ---------------- */}
{active === "Interview Details" && (
  <div className="bg-gray-800 shadow-lg rounded-lg p-6 shadow-blue-700 backdrop-blur-md">
    <h2 className="text-xl font-semibold mb-4">Your Past Interviews</h2>
    <div className="space-y-4">
      {interviews.length > 0 ? (
        interviews.map((interview) => (
          <div key={interview._id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-white">{interview.jobRole}</p>
              <p className="text-sm text-gray-300">Company: {interview.company}</p>
              <p className="text-sm text-gray-400">
                Date: {new Date(interview.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
                <p className={`text-sm font-semibold mb-2 ${
                    interview.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                   Status: {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </p>
                <button
    onClick={() => handleViewFeedback(interview._id)} // ✅ Call the new function
    disabled={interview.status !== 'completed' || isFetchingFeedback}
    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
>
    {isFetchingFeedback ? 'Loading...' : 'View Feedback'}
</button>

            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">You have not completed any interviews yet.</p>
      )}
    </div>
  </div>
)}

        {/* ---------------- Results ---------------- */}
        

        {/* ---------------- ATS Score Checker ---------------- */}
        
        {/* ---------------- Settings ---------------- */}
        {active === "Settings" && (
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 space-y-6 shadow-blue-700 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="flex items-center space-x-4">
              <img
                src={displayImageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer text-blue-400 hover:underline"
                >
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Name Fields */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm text-gray-400">First Name</label>
                <input
                  type="text" name="fName" value={formData.fName} onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full mt-1 p-2 rounded bg-gray-700 text-gray-200 ${!isEditing && 'opacity-70'}`}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm text-gray-400">Last Name</label>
                <input
                  type="text" name="lName" value={formData.lName} onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full mt-1 p-2 rounded bg-gray-700 text-gray-200 ${!isEditing && 'opacity-70'}`}
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded bg-gray-700 text-gray-200 ${!isEditing && 'opacity-70'}`}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Phone</label>
              <input
                type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded bg-gray-700 text-gray-200 ${!isEditing && 'opacity-70'}`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {isEditing ? (
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                Save Changes
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
                Edit Details
              </button>
            )}
            {isEditing && (
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                Cancel
              </button>
            )}
          </div>
          
          {message && <p className="text-green-400 font-medium mt-2">{message}</p>}
          {error && <p className="text-red-400 font-medium mt-2">{error}</p>}
        </div>
        )}
      </div>
    </div>
  );
}