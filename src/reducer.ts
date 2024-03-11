import { combineSlices } from "@reduxjs/toolkit/react";
import loginSlice from './slices/loginReducer';
import toDoSlice from './slices/myReducer';
import NasaReducer from './slices/nasaReducer';

export const rootReducer = combineSlices(toDoSlice, loginSlice, NasaReducer)