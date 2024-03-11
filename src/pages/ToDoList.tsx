import * as React from 'react';
import { useNavigate } from "react-router-dom";
import ToDoListForm from '../components/ToDoListForm';
import ToDoListSection from '../components/ToDoListSection';
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

const buttonStyles = css`
    background-color: #0A315B;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.2em;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0B3D91;
    }
`;

// const addElement = (element: string) => ({
//   type: ADD_ELEMENT,
//   payload: element,
// });

// const removeElement = (element: string) => ({
//   type: REMOVE_ELEMENT,
//   payload: element,
// });

// const clear = () => ({
//     type: CLEAR_CACHE,
//     payload: null
// });

// const initialize = (listCache: string[]) => ({
//     type: INITIALIZE,
//     payload: listCache
// });

// const mapStateToProps = (state: {el: string[]}) => ({
//     elementsState: state.el
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     add: (element: string) => dispatch(addElement(element)),
//     remove: (element: string) => dispatch(removeElement(element)),
//     clearCache: () => dispatch(clear()),
//     init: (listCache: string[]) => dispatch(initialize(listCache))
// });

function ToDoList() {
    // Theme with emotion
    // Lerna
    // Vitest
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const cacheJson: string | null = localStorage.getItem('elements');
    const cache: string[] | null = cacheJson ? JSON.parse(cacheJson) : null;
    const [cached, setCached] = React.useState(cache)

    const state = useAppSelector(state => state.toDoSlice.el)
    
    const elementsStateInit: string[] | null = cached ? cached : state
    
    React.useEffect(() => {
        if (cache) {
            dispatch({ type: 'toDoSlice/initialize', payload: cache });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log('cached', cached, 'elStateInit', elementsStateInit, 'elState', elementsState)

    function handleSubmit(inputValue: string) {
        dispatch({ type: 'toDoSlice/addElement', payload: inputValue });
        if (cached) {
            setCached([...cached, inputValue])
        }
        else {setCached([inputValue])}
    }
    function handleRemove(inputValue: string) {
        dispatch({ type: 'toDoSlice/removeElement', payload: inputValue });
        if (cached) {
            setCached(cached.filter((element) => element !== inputValue))
        }
    }
    function removeCache() {
        dispatch({ type: 'toDoSlice/clearCache' });
        window.location.reload();
    }
    function handleBack() {
        navigate('/home');
    }

    return(
        <div css={pageStyles}>
        <div className="to-do-list">
            <ToDoListForm onSubmit={handleSubmit} clear={removeCache} />
            <p/>
            {elementsStateInit && elementsStateInit.length ? 
                <ToDoListSection tasks={elementsStateInit} remove={handleRemove}/> 
            : null}
        </div>
        <button css={buttonStyles} onClick={handleBack}>Go back</button>
        </div>
    );
}

//export const ConnectedToDoList = connect(mapStateToProps, mapDispatchToProps)(ToDoList);
export default ToDoList 