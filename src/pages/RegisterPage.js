import React, { useState } from "react";
import api from "../utils/api";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if(password !== secPassword){
        throw new Error("Password does not match. Please check your password.");
      }
      const response = await api.post('/user', {name, email, password});
      if(response.status === 200){
        navigate("/login");
      }else{
        throw new Error(response.data.error)
      }
    }catch(error){
      setError(error.message)
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <ErrorMessage message={error} onClose={() => setError("")} />

        <div className="form-container">
          <h1 className="form-title">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                placeholder="re-enter the password"
                className="form-input"
                value={secPassword}
                onChange={(event) => setSecPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="form-button">
              Register
            </button>

            <div className="form-footer">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;