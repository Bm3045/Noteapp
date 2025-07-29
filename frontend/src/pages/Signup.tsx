import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const [form, setForm] = useState({ name: "", dob: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    const { name, dob, email } = form;
    if (!name || !dob || !email) return setError("All fields are required");

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      localStorage.setItem("signupForm", JSON.stringify(form));
      navigate("/verify-otp");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Left Column */}
      <div className="signup-left">
        <div className="logo-container">
          <h1 className="logo">
            <img src="/public/image.png" alt="HD Logo" className="w-5 h-5" />
              <span>HD</span>
            </h1>

        </div>
      </div>

      {/* Right Column */}
      <div className="signup-right">
        <div className="signup-container">
          <div className="header">
            <h2 className="title">Sign up</h2>
            <p className="subtitle">Sign up to enjoy the feature of HD</p>
          </div>

          <div className="form-group">
            <label className="input-label">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="James Khamwedd"
              className="form-input"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="input-label">Date of Birth</label>
            <input
              type="text"
              name="dob"
              placeholder="📌 11 December 1997"
              className="form-input"
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jams_kamwad@gmail.com"
              className="form-input"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Get OTP"}
          </button>

          <p className="login-redirect">
            Already have an account?? <a href="/signin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;