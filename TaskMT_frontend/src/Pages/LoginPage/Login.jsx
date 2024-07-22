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
        <div className="bg-#f1eeea flex items-center justify-center mainContainer">
            <div className="bg-white flex items-center justify-center gap-3.5 rounded-lg shadow-md flex-col w-96 h-3/4 inputContainer">
                <h1 className='text-3xl font-bold w-80 '>Login</h1>
                <label htmlFor="username" className='w-80 label' >Username</label>
                <div className="icons"
                >
                    <input
                        type="text" className=" w-80 h-8 p-4 rounded-md border border-gray-300 outline-none input"


                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faUser} className="icon" />
                </div>




                <label htmlFor="password" className='w-80 label'>Password</label>
                <div className="icons">
                    <input
                        type="password" className=" w-80  h-3 p-4 rounded-md border border-gray-300 outline-none input"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faLock} className="icon" />
                </div>

                <button type="submit" className="bg-black w-80 h-8 rounded-md text-white btn" onClick={handleLogin}>
                    Login
                </button>
                <h3 className='w-80'>Dont have account</h3>
                <button to='/register' className='bg-black text-white rounded-md w-80 h-8 link'>Create account</button>
            </div>
        </div>
    );
};

export default Login;