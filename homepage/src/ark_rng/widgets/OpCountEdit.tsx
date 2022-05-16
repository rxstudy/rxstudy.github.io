import _ from 'lodash';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { OP_SLOT_COUNT_MAX, OP_SLOT_COUNT_MIN } from '../Const';
import { decrementOpCount, incrementOpCount } from '../reducers/OpDeck';
import { IAppState } from '../reducers/State';


function OpCountEdit() {
    const allowedOpCount = useSelector((state: IAppState) => state.op_deck.allowed_op_count);
    const dispatch = useDispatch()

    return <div>
        <div>干员队伍人数</div>
        <button aria-label="Increase Op Count" onClick={() => dispatch(incrementOpCount())} disabled={allowedOpCount >= OP_SLOT_COUNT_MAX}>+</button>
        <button aria-label="Decrease Op Count" onClick={() => dispatch(decrementOpCount())} disabled={allowedOpCount <= OP_SLOT_COUNT_MIN}>-</button>
    </div>
}

export default OpCountEdit;