import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from 'redux-logger';
import persistantMiddleware from './middleware';
import { rootReducer } from './reducer';

const store = configureStore({
    reducer: rootReducer, 
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistantMiddleware)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, persistantMiddleware),
});

export type TRootReducerState = ReturnType<typeof rootReducer>;
export type TDispatch = typeof store.dispatch;

export const useAppDispatch: () => TDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootReducerState> = useSelector;

export default store;