import { createSlice } from '@reduxjs/toolkit'
import { ProfessionEnum } from './GlobalTypes';

export interface Filter {
    male: boolean,
    female: boolean,
    profession: { [k in ProfessionEnum]: boolean }
}

export interface IUiPanelState {
    filter: Filter
}

export interface IToggleProfessionAction {
    payload: ProfessionEnum
}

export const uiPanelSlice = createSlice({
    name: 'ui_panel',
    initialState: {
        filter: {
            male: true,
            female: true,
            profession: {
                [ProfessionEnum.Warrior]: true,
                [ProfessionEnum.Pioneer]: true,
                [ProfessionEnum.Sniper]: true,
                [ProfessionEnum.Tank]: true,
                [ProfessionEnum.Medic]: true,
                [ProfessionEnum.Caster]: true,
                [ProfessionEnum.Support]: true,
                [ProfessionEnum.Special]: true,
            }
        }
    },
    reducers: {
        toggleMaleFilter: (state: IUiPanelState) => {
            state.filter.male = !state.filter.male;
        },
        toggleFemaleFilter: (state: IUiPanelState) => {
            state.filter.female = !state.filter.female;
        },
        toggleProfessionFilter: (state: IUiPanelState, action: IToggleProfessionAction) => {
            state.filter.profession[action.payload] = !state.filter.profession[action.payload];
        }
    }
});

export const { toggleMaleFilter, toggleFemaleFilter, toggleProfessionFilter } = uiPanelSlice.actions;
export default uiPanelSlice.reducer