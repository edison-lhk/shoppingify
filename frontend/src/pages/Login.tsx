import React, { useState } from 'react';
import Logo from '../icons/logo.svg';
import Wine from '../icons/wine.svg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Loading from '../components/Loading';

const Login = () => {
    const [formData, setFormData] = useState<{ email: string, password: string }>({ email: '', password: '' });

    const { email, password } = formData;

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        if (email === '' || password === '') {
            setIsLoading(false);
            toast.error('Please fill in all fields', { autoClose: 3000 });
            return;
        }

        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setIsLoading(false);
            toast.error('Please provide a valid email address', { autoClose: 3000 });
            return;
        }

        try {
            const response: AxiosResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, { email, password }, { withCredentials: true });
            toast.success(response.data.message, { autoClose: 1500 });
            setFormData({ email: '', password: '' });
            setTimeout(() => navigate('/dashboard/items'), 2500);
        } catch (error: AxiosError | any) {
            setIsLoading(false);
            toast.error(error.response.data.error, { autoClose: 3000 });
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-form-container">
                <header>
                    <img className='app-logo' src={Logo} alt="Shoppingify Logo" />
                    <h1 className='app-name'>Shoppingify</h1>
                    <img className='wine' src={Wine} alt="Wine" />
                </header>
                <form className='login-form' onSubmit={onSubmit}>
                    <div className="input-container">
                        <input type="email" name="email" id="email" placeholder='Email' autoComplete='off' value={email} onChange={onChange} />
                        <input type="password" name="password" id="password" placeholder='Password' autoComplete='off' value={password} onChange={onChange} />
                    </div>
                    <button type="submit">{!isLoading ? <>Login</> : <Loading border='2px' size='20px' color='#ffffff' /> }</button>
                </form>
                <p className='go-to-register-container'>
                    Don’t have an account yet? <Link to='/register' style={{ textDecoration: 'none', color: '#80485B' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;