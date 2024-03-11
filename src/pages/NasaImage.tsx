import * as React from 'react';
import { useNavigate } from "react-router-dom";
import NasaSection from '../components/NasaSection';
import NasaForm from '../components/NasaForm';
import { useAppDispatch, useAppSelector } from '../store';
import {fetchNasaByQuery} from '../slices/nasaReducer.ts'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const containerStyle = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    // background-color: #4A4A4A;
    --base-font-size: 2vh;
    font-size: var(--base-font-size);
`;

const navigationStyle = css`
    padding: 20px;
    height: 100vh;
    width: 9em;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 2px solid ;
    background-color: #0A315B;
    font-size: 1em;
`;

const resultsStyle = css`
    flex: 1;
    padding: 20px;
    justify-content: center;
    grid-template-columns: repeat(1, 2fr);
    margin-left: 11em;
    display: block;
`;

const Button = styled.button`
    background-color: #0A315B ;
    color: black;
    border: none;
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    text-align: center;
    font-size: 1.3em;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0B3D91;
    }
`;

const logoStyle = css`
    width: 150px; 
    margin: 3vh 0 18vh 0;
`;

function NasaImage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const state = useAppSelector(state => state.nasaSlice);
    const [resultsList, setResultsList] = React.useState({});
    const [resultObjects, setResultObjects] = React.useState({ images: true, videos: true, audios: true });

    React.useEffect(() => {
        const { collection: data } = state.data;
        const { items } = data;
        setResultsList(items)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.data.collection.items])

    function handleSubmit(inputValue: string) {
        try {
        dispatch(fetchNasaByQuery(inputValue)).unwrap()
        }
        catch (err) {throw new err}
    }
    return(
        <div css={containerStyle}>
            <div css={navigationStyle}>
            <img css={logoStyle} src="/src/media/nasa.PNG" />
                <h1 htmlFor="menu-list">Navigation</h1>
                <Button onClick={() => navigate('/home')}>Home</Button>
                <Button onClick={() => navigate('/todo')}>To do List</Button>
            </div>
            <div css={resultsStyle} className="search-image-video">
                <NasaForm onSubmit={handleSubmit} resultObjects={resultObjects} setResultObjects={setResultObjects}/>
                <p/>
                {resultsList && resultsList.length ? 
                    <NasaSection results={resultsList} resultObjects={resultObjects}/> 
                : null}
            </div>
        </div>
    );
}

export default NasaImage 
