import { createSlice } from '@reduxjs/toolkit'
import { OP_SLOT_COUNT_MAX, OP_SLOT_COUNT_MIN, OP_SLOT_COUNT_DEFAULT } from "../Const"
import _ from "lodash"

export interface IOpDeckState {
    available_op_ids: string[],
    excluded_op_ids: string[],
    in_use_op_ids: string[],
    allowed_op_count: number
}

export interface IExcludeOpAction {
    payload: string[],
}

export interface IUseOpAction {
    payload: string[],
}

export interface IClearOpAction {
    payload: string[],
}

export interface IDeckStateAction {
    payload: IOpDeckState
}

export const opDeckSlice = createSlice({
    name: 'op_deck',
    initialState: {
        available_op_ids: [],
        excluded_op_ids: [],
        in_use_op_ids: [],
        allowed_op_count: OP_SLOT_COUNT_DEFAULT
    },
    reducers: {
        initDeckState: (state: IOpDeckState, action: IDeckStateAction) => {
            state.available_op_ids = _.uniq(action.payload.available_op_ids);
            state.excluded_op_ids = _.uniq(action.payload.excluded_op_ids);
            state.in_use_op_ids = _.uniq(action.payload.in_use_op_ids);
            state.allowed_op_count = action.payload.allowed_op_count;
        },
        excludeOpsFromTeam: (state: IOpDeckState, action: IExcludeOpAction) => {
            state.in_use_op_ids = _.difference(state.in_use_op_ids, action.payload)
            state.available_op_ids = _.difference(state.available_op_ids, action.payload)
            state.excluded_op_ids = _.union(state.excluded_op_ids, action.payload)
        },
        addOpsToTeam: (state: IOpDeckState, action: IUseOpAction) => {
            state.available_op_ids = _.difference(state.available_op_ids, action.payload)
            state.in_use_op_ids = _.union(state.in_use_op_ids, action.payload)
        },
        clearOpsFromTeam: (state: IOpDeckState, action: IClearOpAction) => {
            state.in_use_op_ids = _.difference(state.in_use_op_ids, action.payload)
            state.available_op_ids = _.union(state.available_op_ids, action.payload)
        },
        incrementOpCount: (state: IOpDeckState) => {
            state.allowed_op_count = Math.min(state.allowed_op_count + 1, OP_SLOT_COUNT_MAX);
        },
        decrementOpCount: (state: IOpDeckState) => {
            state.allowed_op_count = Math.max(state.allowed_op_count - 1, OP_SLOT_COUNT_MIN);
            if (state.allowed_op_count < state.in_use_op_ids.length) {
                state.in_use_op_ids = _.take(state.in_use_op_ids, state.allowed_op_count)
            }
        }
    }
});

export const { initDeckState, excludeOpsFromTeam, addOpsToTeam, clearOpsFromTeam, incrementOpCount, decrementOpCount } = opDeckSlice.actions;
export default opDeckSlice.reducer