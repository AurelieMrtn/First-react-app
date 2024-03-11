import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToDoState {
    el: string[] | null;
}

const initialState: ToDoState = {
    el: null
};

const toDoSlice = createSlice({
    name: 'toDoSlice',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<string[]>) => {
            state.el = action.payload;
        },
        addElement: (state, action: PayloadAction<string>) => {
            state.el = state.el ? [...state.el, action.payload] : [action.payload];
        },
        removeElement: (state, action: PayloadAction<string>) => {
            if (state.el) {
                state.el = state.el.filter((element) => element !== action.payload);
            }
        },
        clearCache: (state) => {
            state.el = null;
        },
    },
});

export const { initialize, addElement, removeElement, clearCache } = toDoSlice.actions;

export default toDoSlice;