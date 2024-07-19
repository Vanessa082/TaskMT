import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
      });

      console.log("Registration successful:", response.data);

      history.push("/dashboard");
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold text-primary mb-6">Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-secondary mb-2">Username</label>
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
            />
            <FontAwesomeIcon icon={faUser} className="absolute right-3 top-3 text-primary" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-secondary mb-2">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute right-3 top-3 text-primary" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-secondary mb-2">Password</label>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
            />
            <FontAwesomeIcon icon={faLock} className="absolute right-3 top-3 text-primary" />
          </div>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
          Register
        </button>
      </form>
      <h4 className="text-primary mt-6">Have An Account?</h4>
      <button className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary-dark transition-colors mt-2">
        Login
      </button>
    </div>
  </div>
  );
};

export default Register;
