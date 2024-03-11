import * as React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const formStyle = css`
    font-size: 1.2em;
    margin-bottom: 10px;
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
    font-size: 1em;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0B3D91;
    }
`;

interface ToDoListFormProps {
    onSubmit: (inputValue: string) => void,
    clear: (event: React.MouseEvent) => void;
}

function ToDoListForm({onSubmit, clear}: ToDoListFormProps) {
    const [value, setValue] = React.useState("")

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(value);
        setValue("");
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return(
        <form css={formStyle} onSubmit={handleSubmit} className="to-do-form">
            <label htmlFor="to-do-input">Type a new task: </label>
            <input css={inputStyle} id="to-do-input" placeholder="My new task" value={value} onChange={handleChange}/>
            <p/>
            <button css={buttonStyles} type='button' onClick={clear}>Clear cache</button>
            <button css={buttonStyles} type="submit">Add Task</button>
        </form>
    );
}

export default ToDoListForm;