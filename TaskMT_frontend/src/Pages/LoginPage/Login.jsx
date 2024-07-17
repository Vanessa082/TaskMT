import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Login.css'
// import { useHistory } from 'react-router-dom';

const Login = () => {
    //   const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://localhost:5000/login', { username, password })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='bg-white flex items-center justify-center rounded-lg shadow-md loginField '>
            <div className="bg-purple flex items-center justify-center rounded-lg shadow-md  mainContainer">
                <div className="text">
                    <h1>Task Manager</h1>

                    <h3>Introducing our new task manager tool! <br />Stay organized, track your tasks, <br />and boost productivity with our <br />user-friendly platform. <br />Try it out now and experience seamless <br />task management like never before.</h3>
                </div>
                <div className=" flex items-center justify-center rounded-lg shadow-md flex-col inputContainer">
                    <h1 className='text-3xl font-bold '>Login</h1>
                    <label htmlFor="username" className='label' >Username</label>
                    <div className="icons"
                    >
                        <input
                            type="text" className=" w-35 h-3 p-4 rounded-md border border-gray-300 outline-none input"


                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faUser} className="icon" />
                    </div>




                    <label htmlFor="password" className='label'>Password</label>
                    <div className="icons">
                        <input
                            type="password" className=" w-35 h-3 p-4 rounded-md border border-gray-300 outline-none input"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faLock} className="icon" />
                    </div>

                    <button type="submit" className="btn" onClick={handleLogin}>
                        Login
                    </button>
                    <h3>Dont have account</h3>
                    <button to='/register' className='link'>Create account</button>
                </div>
            </div>
        </div>);
};

export default Login;