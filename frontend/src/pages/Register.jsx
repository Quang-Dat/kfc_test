// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authServices";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    try {
      await register({ email, password });
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
