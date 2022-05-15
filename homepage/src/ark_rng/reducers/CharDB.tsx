import { createSlice } from '@reduxjs/toolkit'

export interface Character {
    name: string,
    nationId: string | null,
    groupId: string | null,
    teamId: string | null,
    tagList: string[],
    rarity: number,
    appellation: string,
    position: string,
    profession: string,
    subProfessionId: string
}

export interface CharacterMap {
    [key: string]: Character
}

export interface CharDBState {
    map: CharacterMap
}

export interface LoadDataAction {
    payload: CharacterMap
}

export const charDBSlice = createSlice({
    name: 'char_db',
    initialState: {
        map: require("../data/char_table.json")
    },
    reducers: {
        loadData: (state: CharDBState, action: LoadDataAction) => {
            state.map = action.payload;
        },
    }
});

export const { loadData } = charDBSlice.actions;
export default charDBSlice.reducer