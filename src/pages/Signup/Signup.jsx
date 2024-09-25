import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Password from "../../components/Inputs/Password";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    // SignUp API CALL
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle success
      if (response.data && response.data.error) {
        setError(response.data.error)
        return
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.details) {
          
            const errorDetails = error.response.data.details;
            let errorMessage = null;
            // Find the first relevant error message in priority order
            if (errorDetails.some((err) => err.path === "fullName")) {
              errorMessage = errorDetails.find(
                (err) => err.path === "fullName"
              ).msg;
            } else if (errorDetails.some((err) => err.path === "email")) {
              errorMessage = errorDetails.find(
                (err) => err.path === "email"
              ).msg;
            } else if (errorDetails.some((err) => err.path === "password")) {
              errorMessage = errorDetails.find(
                (err) => err.path === "password"
              ).msg;
            }
            setError(errorMessage)
          
        } else {
          setError(error.response.data.message);
        }
      } else {
        setError("An unexpected error occured, please try again");
      }
    }
  };

  return (
    <div>
      <Navbar showProfile={false} />

      <div className="flex justify-center items-center w-full h-full mt-28">
        <div className="bg-white drop-shadow px-7 py-10 rounded w-96">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">Signup</h4>
            <input
              type="text"
              placeholder="Name"
              autoComplete="name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              autoComplete="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Password onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

            <button type="submit" className="btn-primary">
              Signup
            </button>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium underline text-blue-500 hover:text-blue-700"
              >
                Login now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
