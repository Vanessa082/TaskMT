import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

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
    <div>
      <div className="main"></div>
      <div className="allDB flex">
        <div className="containers flex">
          <div className="text">

            <h1>Task Manager</h1>

            <h3>
              Enjoy Organizing Your Work, <br />
              And Become More Efficient At Work <br />
              With Whis Amazing Tool
            </h3>
          </div>
          <div className="register">
            <h1>Register</h1>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <div className="inputIcon">
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FontAwesomeIcon icon={faUser} className="input-icon" />
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="email">Email</label>
              <div className="inputIcon">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <div className="inputIcon">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon icon={faLock} className="input-icon" />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={handleRegister}>
              Register
            </button>
            <h4>Have An Account</h4>
            <button className="btns">Login</button>

            {/* <Link to = '/login'>Login</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
