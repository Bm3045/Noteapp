import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // Reusing the same CSS

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Retrieve saved form data from localStorage
  const savedForm = JSON.parse(localStorage.getItem("signupForm") || "{}");
  const { name, dob, email } = savedForm;

  const handleVerify = async () => {
    setError("");

    if (!otp) {
      return setError("OTP is required");
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
        name,
        dob,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/welcome");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Left Column - Same as Signup page */}
      <div className="signup-left">
        <div className="logo-container">
          <div className="logo">
            <div className="logo-circle">HD</div>
          </div>
          <p className="tagline">Keep your thoughts safe & organized.</p>
        </div>
      </div>

      {/* Right Column - Modified for OTP verification */}
      <div className="signup-right">
        <div className="signup-container">
          <div className="header">
            <h2 className="title">Sign up</h2>
            <p className="subtitle">Sign up to enjoy the feature of HD</p>
          </div>

          {/* Display user info from signup */}
          <div className="form-group">
            <label className="input-label">Your Name</label>
            <div className="form-input-display">{name}</div>
          </div>

          <div className="form-group">
            <label className="input-label">Date of Birth</label>
            <div className="form-input-display">{dob}</div>
          </div>

          <div className="form-group">
            <label className="input-label">Email</label>
            <div className="form-input-display">{email}</div>
          </div>

          {/* OTP Input Field */}
          <div className="form-group">
            <label className="input-label">OTP</label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="form-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="submit-btn"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Sign up"}
          </button>

          <p className="login-redirect">
            Already have an account?? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;