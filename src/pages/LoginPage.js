import React, { useState } from "react";
import api from "../utils/api";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = ({user, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const response = await api.post("/user/login", {email, password});
            if(response.status === 200){
                setUser(response.data.user);
                sessionStorage.setItem("token", response.data.token);
                api.defaults.headers["authorization"] = `Bearer ${response.data.token}`;
                setError("");
                navigate("/todo");
            }else{
                throw new Error(response.message);
            }
        }catch(error){
            console.log("Login error:", error);
            // API returns {status: 'fail', message: 'error message'}
            setError(error.message || "Login failed. Please try again.");
        }
    }
    if(user){
        return <Navigate to="/" />
    }

    return (
        <div className="page-container">
            <div className="form-wrapper">
                <ErrorMessage message={error} onClose={() => setError("")} />
                <div className="form-container">
                    <h1 className="form-title">Login</h1>
                    <form onSubmit={handleLogin}>
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

                        <button type="submit" className="form-button">
                            Login
                        </button>

                        <div className="form-footer">
                            No account? <Link to="/register">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
