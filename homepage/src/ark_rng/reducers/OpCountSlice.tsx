import { createSlice } from '@reduxjs/toolkit'
import Const from "../Const"

export interface OpCountState {
    value: number
}

export const opCountSlice = createSlice({
    name: 'op_count',
    initialState: {
        value: Const.OP_SLOT_COUNT_DEFAULT
    },
    reducers: {
        increment: (state: OpCountState) => {
            state.value = Math.min(state.value + 1, Const.OP_SLOT_COUNT_MAX);

        },
        decrement: (state: OpCountState) => {
            state.value = Math.max(state.value - 1, Const.OP_SLOT_COUNT_MIN);
        }
    }
});

export const { increment, decrement } = opCountSlice.actions;
export default opCountSlice.reducer