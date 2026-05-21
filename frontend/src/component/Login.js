import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import './Style.css';



const Login = () => {
     const [userName, setUserName] = useState(
   localStorage.getItem('signupUserName') || ''
);
     const [password, setPassword] = useState(
   localStorage.getItem('signupPassword') || ''
);
     const [isLoading, setLoading] = useState(false);
     const [hasError, setHasError] = useState(false);
     const [error, setError] = useState('');
 
     let navigate = useNavigate();
 
     const submitHandler = (event) => {
         event.preventDefault();
         setLoading(true);
         axios.post('http://localhost:8000/user/login', {
             userName: userName,
             password: password
         })
             .then(res => {
                 setLoading(false);
                 console.log(res.data);
                 localStorage.setItem('token',res.data.token);
                 localStorage.setItem('userName',res.data.userName);
                 setHasError(false);
                 navigate('/dashboard');
             })
             .catch(err => {
                 console.dir(err);
                 setLoading(false);
                 setHasError(true);
                 setError(err.response.data.msg);
             })
     }
     return (
         <>
             {isLoading && <div className="loader-container">
                 <img className="loader-img" src={loader} />
             </div>}
             {!isLoading && !hasError && <div className="login-container">
                 <div className="login-card">
                     <h1 className="login-title">Login</h1>
                     <p className="login-subtitle"> Welcome back! Please login to continue</p>
                     <form onSubmit={submitHandler} autoComplete="on">
                         <input  className="login-input" type="text" value={userName} placeholder='username' autoComplete="username" onChange={(e) => setUserName(e.target.value)} />
                         <br />
                         <input  className="login-input"  type="password"  value={password} placeholder='password'  autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                     <br />
                     <button className="login-btn" type='submit'>Login</button>
 
                 </form>
                 </div>
             </div>}
             {hasError && <div>
                 <p style={{ color: 'red' }}>Error: {error}</p>
             </div>}
         </>
     )
}

export default Login