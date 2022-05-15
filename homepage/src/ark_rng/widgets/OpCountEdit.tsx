import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from "../reducers/OpCountSlice";
import { AppState } from '../reducers/State';

function OpCountEdit() {
    const count = useSelector((state: AppState) => state.op_count.value);
    const dispatch = useDispatch()

    return <div>OpCountEdit
        <button aria-label="Increase Op Count" onClick={() => dispatch(increment())}>+</button>
        <button aria-label="Decrease Op Count" onClick={() => dispatch(decrement())}>-</button>
    </div>
}

export default OpCountEdit;