import { createSlice } from '@reduxjs/toolkit'

export interface Filter {
    male: boolean,
    female: boolean
}

export interface IUiPanelState {
    filter: Filter
}

export const uiPanelSlice = createSlice({
    name: 'ui_panel',
    initialState: {
        filter: {
            male: true,
            female: true,
        }
    },
    reducers: {
        toggleMaleFilter: (state: IUiPanelState) => {
            state.filter.male = !state.filter.male;
        },
        toggleFemaleFilter: (state: IUiPanelState) => {
            state.filter.female = !state.filter.female;
        }
    }
});

export const { toggleMaleFilter, toggleFemaleFilter } = uiPanelSlice.actions;
export default uiPanelSlice.reducer