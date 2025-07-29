import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // Reuse same CSS

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!email) {
      return setError("Email is required");
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });

      // ✅ Store only email on sign in
      localStorage.setItem("signupForm", JSON.stringify({ email }));

      navigate("/verify-otp");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="signup-page">
      {/* Left Column */}
      <div className="signup-left">
        <div className="logo-container">
          <h1 className="logo">
            <img src="/image.png" alt="HD Logo" className="w-6 h-6 mr-2" />
            <span>HD</span>
          </h1>
        </div>
      </div>

      {/* Right Column */}
      <div className="signup-right">
        <div className="signup-container">
          <div className="header">
            <h2 className="title">Sign in</h2>
            <p className="subtitle">Please login to continue to your account.</p>
          </div>

          <div className="form-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="jones_kathwaid@gmail.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group remember-container">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember" className="remember-label">
              Keep me logged in
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending OTP..." : "Sign in"}
          </button>

          <button
            className="submit-btn"
            style={{ backgroundColor: "#EA4335" }}
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>

          <p className="login-redirect">
            Need an account? <a href="/">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
