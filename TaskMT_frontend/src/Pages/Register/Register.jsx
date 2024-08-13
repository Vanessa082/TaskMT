import { API_BASE_URL } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChanged = (e) => {
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Registration", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-[#f3f4f6] p-4 lg:flex-row">
      <div className="w-full md:w-auto flex ga-40 flex-col md:flex-row items-center">
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1  py-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600 text-nowrap">
              Prioritize your tasks; schedule them accordingly.
            </span>

            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-primary-color">
              <span>Personal</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
        <form
          className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          onSubmit={handleSubmit}
        >
          <div className="">
            <p className="text-blue-600 text-3xl font-bold text-center">
              Welcome!
            </p>
            <p className="text-center text-base text-gray-700 ">
              Register and Get Started.
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-secondary mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={handleInputChanged}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

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
                onChange={handleInputChanged}
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
                onChange={handleInputChanged}
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
            className="w-full h-10 bg-blue-700 text-white rounded-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    // <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    //   <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    //     <h1 className="text-2xl font-bold text-primary mb-6">Register</h1>
    //
    //     <h4 className="text-primary mt-6">Have An Account?</h4>
    //     <Link to="/login">
    //       <button className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary-dark transition-colors mt-2">
    //         Login
    //       </button>
    //     </Link>
    //   </div>
    // </div>
  );
}
