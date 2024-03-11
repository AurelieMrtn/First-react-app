import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import * as React from 'react';
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

const buttonStyles = css`
    background-color: #0A315B;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0B3D91;
    }
`;

function HomePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({type: 'loginSlice/logout'})
        navigate('/')
    }

    return (
        <div css={pageStyles}>
            <h2>Welcome to this to-do list app!</h2>
            <button css={buttonStyles} onClick={() => navigate('/todo')}>To-do List</button>
            <button css={buttonStyles} onClick={() => navigate('/nasa-image')}>NASA Image and Video Library</button>
            <button css={buttonStyles} onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default HomePage;