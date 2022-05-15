
import { configureStore } from '@reduxjs/toolkit'
import charDBReducer, { ICharDBState } from './CharDBSlice';
import opDeckReducer, { IOpDeckState } from './OpDeck';

export interface IAppState {
    char_db: ICharDBState,
    op_deck: IOpDeckState
}


export const store = configureStore({
    reducer: { char_db: charDBReducer, op_deck: opDeckReducer }
})