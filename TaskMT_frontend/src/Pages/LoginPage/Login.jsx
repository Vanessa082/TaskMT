import { API_BASE_URL } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../providers/app-context";
import { fetchCurrentUser } from "../../providers/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate()
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { token } = data;
      localStorage.setItem("token", token);
      console.log("Login successful");

      const currentUser = await fetchCurrentUser();
      setCurrentUser(currentUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondary mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Login
          </button>
        </form>
        <h4 className="text-primary mt-6">Do Not Have An Account?</h4>
        <Link to="/login">
          <button className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary-dark transition-colors mt-2">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
