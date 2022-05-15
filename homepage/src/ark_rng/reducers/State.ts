
import { configureStore } from '@reduxjs/toolkit'
import { OpCountState } from './OpCountSlice';
import opCountReducer from "./OpCountSlice";
import charDBReducer, { CharDBState } from './CharDB';

export interface AppState {
    op_count: OpCountState,
    char_db: CharDBState
}


export const store = configureStore({
    reducer: { op_count: opCountReducer, char_db: charDBReducer }
})