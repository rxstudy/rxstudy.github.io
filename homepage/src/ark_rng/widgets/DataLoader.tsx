import React from 'react'
import { OnComponentDidMount } from '../../common/react_helpers';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../reducers/State';
import { initDeckState } from '../reducers/OpDeck';
import Const from '../Const';

function DataLoader() {
    const charMap = useSelector((state: IAppState) => state.char_db.map);
    const dispatch = useDispatch()

    OnComponentDidMount(() => {
        dispatch(initDeckState({
            allowed_op_count: Const.OP_SLOT_COUNT_DEFAULT,
            available_op_ids: Object.keys(charMap),
            excluded_op_ids: [],
            in_use_op_ids: []
        }));
        console.log("Log[INFO]: Data initialized.")
    })
    return null;
}

export default DataLoader