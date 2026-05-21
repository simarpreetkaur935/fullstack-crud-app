import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import './Style.css';


const Signup = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');

    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://localhost:8000/user/signup', {
            userName: userName,
            password: password,
            email: email,
            phone: phone
        })
            .then(res => {
                setLoading(false);
                localStorage.setItem('signupUserName', userName);
                localStorage.setItem('signupPassword', password);
                console.log(res);
                setHasError(true);
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setHasError(true);
                setError(err.message);
            })
    }
    return (
        <>
            {isLoading && <div className="loader-container">
                <img className="loader-img"src={loader} />
            </div>}
            {!isLoading && !hasError && <div className="signup-container">
                <h1>Create account</h1>
                <form onSubmit={submitHandler}>
                    <input className="signup-input" type="text" placeholder='username' onChange={(e) => setUserName(e.target.value)} />
                    <br />
                    <input className="signup-input" type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input className="signup-input" type="text" autoComplete="off" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <input className="signup-input" type="number" placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
                    <br />
                    <button className="signup-btn" type='submit'>Signup</button>

                </form>
            </div>}
            {hasError && <div>
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>}
        </>
    )
}

export default Signup