import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const pageStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    --base-font-size: 2vh;
    font-size: var(--base-font-size);
`;

const errorMessageStyle = css`
    color: red;
    margin: 10px 0;
`;

const inputStyle = css`
    width: 100%;
    padding: 10px;
    margin: 10px 0 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: inherit;
`;

const buttonStyles = css`
    background-color: #0A315B;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0B3D91;
    }
`;

interface LoginFormData {
  username: string;
  password: string;
}

function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.loginSlice)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ username: '', password: '' });
    
    try {
      dispatch({ type: 'loginSlice/login', payload: formData })
      alert(`Login successful! Welcome ${formData.username}`);
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        throw error
      } else {setError('Unexpected Error')}
    }
  }; 

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      dispatch({ type: 'loginSlice/cachedLogin', payload: isAuthenticated })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuthenticated])

  return (
    <div css={pageStyles}>
      <h1> Login Page </h1>
      <p/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" >Username:</label>
          <input
            css={inputStyle} type="text" id="username" name="username" placeholder="Type: usertest" 
            value={formData.username} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            css={inputStyle} type="password" id="password" name="password" placeholder="Type: mypassword" 
            value={formData.password} onChange={handleInputChange} />
        </div>
        { error ? <div css={errorMessageStyle}>
            <p/>
              {error}
            <p/>
          </div> 
        : null}
        <button css={buttonStyles} type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
