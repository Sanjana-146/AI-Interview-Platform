import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

// The AppContext import has been removed to resolve the compilation error.

const ResetPassword = () => {
    // --- FIX: The value from AppContext is now defined locally ---
    // API calls are relative, so an empty string for the URL prefix is fine.
    const backendUrl = "";
    
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Get the email from the navigation state sent from the Signin page
    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            // If someone lands on this page directly without an email, they can't proceed.
            alert("No email provided. Please start the 'Forgot Password' process again from the sign-in page.");
            navigate('/signin');
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.otp.trim() || formData.otp.length !== 6) newErrors.otp = "A valid 6-digit OTP is required";
        if (!formData.newPassword) newErrors.newPassword = "New password is required";
        else if (formData.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            const response = await fetch(backendUrl + '/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    otp: formData.otp,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Password has been reset successfully! Please sign in with your new password.");
                navigate('/signin'); // Redirect to signin page on success
            } else {
                alert(data.message || "Failed to reset password. Please check your OTP and try again.");
            }

        } catch (error) {
            console.error("Reset password error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-purple-900 opacity-30"></div>
            <div className="relative z-10 bg-[#1E1E1E] w-[90%] max-w-md rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-2 text-center">Reset Your Password</h2>
                <p className="text-center text-gray-400 mb-6">An OTP has been sent to <strong>{email}</strong>.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter 6-digit OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400"
                        />
                        {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full bg-[#2a2a2a] p-3 pr-16 rounded-md outline-none placeholder:text-gray-400"
                        />
                         <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute top-1/2 right-3 -translate-y-1/2 p-1">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>}
                    </div>
                     <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400"
                        />
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition disabled:opacity-50">
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/signin" className="text-sm text-gray-400 hover:underline">Back to Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

