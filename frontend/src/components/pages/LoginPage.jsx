import React, { useState } from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { useNavigate } from 'react-router-dom';

import { fetchData } from '../../utils';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const response = await fetchData(`/user/checkLogin?email=${email}&password=${password}`);
          console.log(response);
          if (response) {
            console.log('Login successful');
            setEmail('');
            setPassword('');
            localStorage.setItem('user', JSON.stringify(response));
            navigate('/');
          } else {
            console.error('Login failed');
          }
        } catch (error) {
          console.error('Error during API call', error);
        }
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    return (
      <div>
        <Navbar />
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col w-full lg:flex-row-reverse justify-center items-center">
            <div className="text-center bg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                New here? <a href="" onClick={() => navigate('/registerUser')} className="link link-primary">Sign up</a> for an account to get started.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="email" className="input input-bordered" required value={email} onChange={handleEmailChange}/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered" required value={password} onChange={handlePasswordChange}/>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default LoginPage;
