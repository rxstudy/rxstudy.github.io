import { createSlice } from '@reduxjs/toolkit'

export interface ICharacter {
    name: string,
    nationId: string | null,
    groupId: string | null,
    teamId: string | null,
    tagList: string[],
    rarity: number,
    appellation: string,
    position: string,
    profession: string,
    subProfessionId: string,
    sex: string,
    name_jp: string,
    name_kr: string,
}

export interface ICharacterMap {
    [key: string]: ICharacter
}

export interface ICharDBState {
    map: ICharacterMap
}

export interface ILoadDataAction {
    payload: ICharacterMap
}

export const charDBSlice = createSlice({
    name: 'char_db',
    initialState: {
        map: require("../data/char_table.json")
    },
    reducers: {
        loadData: (state: ICharDBState, action: ILoadDataAction) => {
            state.map = action.payload;
        },
    }
});

export const { loadData } = charDBSlice.actions;
export default charDBSlice.reducer