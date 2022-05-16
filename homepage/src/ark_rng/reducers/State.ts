
import { configureStore } from '@reduxjs/toolkit'
import charDBReducer, { ICharDBState } from './CharDBSlice';
import opDeckReducer, { IOpDeckState } from './OpDeck';
import uiPanelReducer, { IUiPanelState } from './UiPanelSlice';

export interface IAppState {
    char_db: ICharDBState,
    op_deck: IOpDeckState
    ui_panel: IUiPanelState
}

export const store = configureStore({
    reducer: { char_db: charDBReducer, op_deck: opDeckReducer, ui_panel: uiPanelReducer }
})