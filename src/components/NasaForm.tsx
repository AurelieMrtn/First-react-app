import * as React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const formWrapperStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.5em;
`;

const formStyle = css`
    width: 60%;
    padding: 20px;
`;

const inputContainerStyle = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    align-items: center;
`;

const inputStyle = css`
    width: 100%;
    padding: 10px;
    margin: 10px 0 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: inherit;
`;

const Button = styled.button`
    width: 50%;
    margin: 20px auto;
    padding: 10px;
    background-color: #0B3D91;
    color: black;
    font-size: inherit;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0A315B;
    }
`;

const inputLabelStyle = css`
    margin-bottom: 5px;
`;

const inputCheckboxContainerStyle = css`
    display: flex;
    justify-content: space-between;
    gap: 10vw;
`;

const inputCheckboxStyle = css`
    margin-right: 5px;
`;

function NasaForm({onSubmit, resultObjects, setResultObjects}) {
    const [value, setValue] = React.useState("")
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(value);
        setValue("");
        setIsSubmitted(true)
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }
    function handleCheck(event: ChangeEvent<HTMLInputElement>) {
        const {name, checked} = event.target;
        setResultObjects(previous => ({
            ...previous,
            [name]: checked
        }))
    }
    return(
        <div css={formWrapperStyle}>
            <form css={formStyle} onSubmit={handleSubmit} className='nasa-form'>
                <div css={inputContainerStyle}>
                    <label htmlFor="nasa-search">Type an object's name: </label>
                    <input css={inputStyle} id="nasa-search" placeholder="Example: Orion" value={value} onChange={handleChange} />
                    {isSubmitted ? 
                    <div css={inputCheckboxContainerStyle}>
                        <div>
                            <input id="images" type="checkbox" onChange={handleCheck} checked={resultObjects.images} css={inputCheckboxStyle} />
                            <label htmlFor="images" css={inputLabelStyle}>Images</label>
                        </div>
                        <div>
                            <input id="videos" type="checkbox" onChange={handleCheck} checked={resultObjects.videos} css={inputCheckboxStyle} />
                            <label htmlFor="videos" css={inputLabelStyle}>Videos</label>
                        </div>
                        <div>
                            <input id="audios" type="checkbox" onChange={handleCheck} checked={resultObjects.audios} css={inputCheckboxStyle} />
                            <label htmlFor="audios" css={inputLabelStyle}>Audios</label>
                        </div>
                    </div>
                    : null}
                    <Button type="submit">Search</Button>
                </div>
            </form>
        </div>
    )
}

export default NasaForm