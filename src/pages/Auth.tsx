import React from 'react'
import { useParams } from "react-router-dom";

import '../styles/auth.css';

export default function Auth() {

  const {type} = useParams();

  return (
    <div>

      {
        // a div with flex to center the content
        type === 'login' ? (
          <div className="flex-center">
            <div className="login-container">
              <h1 className="login-title">Login</h1>
              <p className="form-text">Login to your account</p>
              <form className="login-form">
                <label className="form-text">Email</label>
                <input type="email" className="form-field" />
                <label className="form-text">Password</label>
                <input type="password" className="form-field" />
                <button className="login-button">Login</button>
                <p>Don't have a account? <a href='/auth/register'>Register</a></p>

              </form>
            </div>
          </div>
        ) : (
          <div className="flex-center">
            <div className="login-container">
              <h1>Signup</h1>
              <p>Signup to your account</p>
              <form className="login-form">
                <label className="form-text">Email</label>
                <input type="email" className="form-field" />
                <label className="form-text">Password</label>
                <input type="password" className="form-field" />
                <label className="form-text">Confirm password</label>
                <input type="password" className="form-field" />
                <button className="login-button">Signup</button>
                <p>Already have a account? <a href='/auth/login'>Login</a></p>
              </form>
            </div>
          </div>
        )
      }


    
    </div>
  )
}
