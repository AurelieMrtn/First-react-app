/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const listStyles = css`
    list-style: none;
    padding: 0;
    margin: 20px 0;
`;

const listItemStyles = css`
    background-color: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const buttonStyles = css`
    padding: 5px 10px;
    font-size: 0.8em;
    border: none;
    border-radius: 3px;
    background-color: #414141;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #ff5252;
    }
`;

const tasksHeaderStyle = css`
    font-size: 1.2em;
    margin-bottom: 10px;
`;

interface ToDoListSectionProps {
    tasks: string[];
    remove: (item: string) => void;
}

function ToDoListSection({tasks, remove}: ToDoListSectionProps) {
    return(
        <>
            <div css={tasksHeaderStyle}>Tasks:</div>
            <ul css={listStyles}>
                {tasks.map(item => (
                    <li key={item} css={listItemStyles}>
                        {item}
                        <button css={buttonStyles} onClick={() => remove(item)}>Remove</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ToDoListSection;
