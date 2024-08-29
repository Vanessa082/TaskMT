import { API_BASE_URL } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Import Sonner's toast

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChanged = (e) => {
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if the form is invalid
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Registration successful! Redirecting to login...");
        navigate("/login");
      } else if (response.status === 409) {
        setErrors({ email: "Email already exists. Please log in." });
        toast.error("Email already exists. Please log in.");
      } else {
        const data = await response.json();
        console.error("Registration failed:", data.message);
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 lg:p-8">
      {/* Main Content Wrapper */}
      <span className="py-2 border text-sm text-center text-gray-600">
        Prioritize your tasks; schedule them accordingly.
      </span>
      <div className="flex flex-col justify-center items-center flex-1 max-w-5xl mx-auto">
        <div className="flex-1 w-full max-w-md flex items-center justify-center">
          <form
            className="bg-white p-8 rounded-lg shadow-lg w-full flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="text-primary-color text-3xl font-bold text-center">
                Welcome!
              </p>
              <p className="text-center text-base text-gray-700">
                Register and Get Started.
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-primary-color mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleInputChanged}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-full focus:border-primary-color focus:ring-primary-color ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute right-3 top-3 text-primary-color"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-primary-color mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleInputChanged}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-full focus:border-primary-color focus:ring-primary-color ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute right-3 top-3 text-primary-color"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-primary-color mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleInputChanged}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-full focus:border-primary-color focus:ring-primary-color ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute right-3 top-3 text-primary-color"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary-color text-white rounded-full hover:bg-secondary-color transition-colors duration-300"
            >
              Register
            </button>

            <div className="text-center">
              <h4 className="text-primary-color inline">Have An Account?</h4>
              <Link
                to="/login"
                className="font-semibold text-primary-color ml-1"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
