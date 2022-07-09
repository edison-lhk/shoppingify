import React, { useState } from 'react';
import Logo from '../icons/logo.svg';
import Wine from '../icons/wine.svg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';

const Register = () => {
    const [formData, setFormData] = useState<{ username: string, email: string, password: string, confirm_password: string }>({ username: '', email: '', password: '', confirm_password: '' });

    const { username, email, password, confirm_password } = formData;

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === '' || email === '' || password === '' || confirm_password === '') {
            toast.error('Please fill in all fields', { autoClose: 3000 });
            return;
        }

        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            toast.error('Please provide a valid email address', { autoClose: 3000 });
            return;
        }

        if (password !== confirm_password) {
            toast.error('Passwords do not match', { autoClose: 3000 });
            return;
        }

        if (password.length < 6) {
            toast.error('Password should contain at least 6 characters', { autoClose: 3000 });
            return;
        }

        try {
            const response: AxiosResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, { username, email, password }, { withCredentials: true });
            toast.success(response.data.message, { autoClose: 2000 });
            setFormData({ username: '', email: '', password: '', confirm_password: '' });
            setTimeout(() => navigate('/'), 3000);
        } catch (error: AxiosError | any) {
            toast.error(error.response.data.error, { autoClose: 3000 });
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-form-container">
                <header>
                    <img className='app-logo' src={Logo} alt="Shoppingify Logo" />
                    <h1 className='app-name'>Shoppingify</h1>
                    <img className='wine' src={Wine} alt="Wine" />
                </header>
                <form className='register-form' onSubmit={onSubmit} >
                    <div className="input-container">
                        <input type="text" name="username" id="username" placeholder='Username' autoComplete='off' value={username} onChange={onChange} />
                        <input type="email" name="email" id="email" placeholder='Email' autoComplete='off' value={email} onChange={onChange} />
                        <input type="password" name="password" id="password" placeholder='Password' autoComplete='off' value={password} onChange={onChange} />
                        <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirm Password' autoComplete='off' value={confirm_password} onChange={onChange} />
                    </div>
                    <button type="submit">Start shopping now</button>
                </form>
                <p className='go-to-login-container'>
                    Already a member? <Link to='/' style={{ textDecoration: 'none', color: '#80485B' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;