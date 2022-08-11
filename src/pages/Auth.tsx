import React from 'react'
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//Services
import api from "../services/api";

import '../styles/auth.css';

export default function Auth() {

  const [email, setemail] = React.useState<string>('');
  const [password, setpassword] = React.useState<string>('');
  const [loginError, setLoginError] = React.useState<any>(false);
  const [username, setusername] = React.useState<string>('');

  const { type } = useParams();

  const goToRegister = () => {
    window.location.href = '/auth/register';
  }

  const goToLogin = () => {
    window.location.href = '/auth/login';
  }

  const handleRegister = (event: any) => {
    console.log("a");
  }

  const handleLogin = (event: any) => {
    setLoginError(false);
    event.preventDefault();
    api.post('/auth', { email, password })
      .then(function (response: any) {
        if (response.data.email) {
          localStorage.setItem("CURRENT_USER", email);
          window.location.href = '/';
        }

      })
      .catch(function (error: any) {
        console.log(error);
        setLoginError(true);
        setemail('');
        setpassword('');
      })


  }


  return (
    <div>

      {
        type === 'login' ? (
          <div className="login-container">
            <p className="loginTitleTxt">Login to your account:</p>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                '& .MuiTextField-root': { width: '100%', },
              }}
              noValidate
              autoComplete="off"
            >
              {
                loginError ? <p className="failLoginTxt">Email or password incorrect</p> : null
              }
              <TextField
                helperText="Please enter your email"
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                error={loginError}
                sx={{
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />
              <TextField
                helperText="Please enter your password"
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="current-password"
                error={loginError}
                sx={{
                  marginTop: 1,
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />


              <button className="loginButton" type="submit">
                <p className="loginTxt">
                  Login
                </p>
              </button>

            </Box>

            <p>Don't have account? <button onClick={goToRegister} className="register-button" >Register now!</button></p>
          </div>
        ) : (
          <div className="login-container">
            <p className="loginTitleTxt">Create your account:</p>
            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{
                '& .MuiTextField-root': { width: '100%', },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                helperText="Please enter your username"
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                error={loginError}
                sx={{
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />

                <TextField
                  helperText="Please enter your email again"
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  error={loginError}
                  sx={{
                    '& label.Mui-focused': {
                      color: 'black',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'black',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              <TextField
                helperText="Please enter your password"
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="current-password"
                error={loginError}
                sx={{
                  marginTop: 1,
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              />


              <button className="loginButton" type="submit">
                <p className="loginTxt">
                  Login
                </p>
              </button>

            </Box>

            <p>Already have a account? <button onClick={goToLogin} className="register-button" >Login now!</button></p>
          </div>
        )
      }



    </div>
  )
}
