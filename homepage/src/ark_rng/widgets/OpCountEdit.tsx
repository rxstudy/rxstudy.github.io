import _ from 'lodash';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Const from '../Const';
import { decrementOpCount, incrementOpCount } from '../reducers/OpDeck';
import { IAppState } from '../reducers/State';


function OpCountEdit() {
    const allowedOpCount = useSelector((state: IAppState) => state.op_deck.allowed_op_count);
    const dispatch = useDispatch()

    return <div>OpCountEdit
        <button aria-label="Increase Op Count" onClick={() => dispatch(incrementOpCount())} disabled={allowedOpCount >= Const.OP_SLOT_COUNT_MAX}>+</button>
        <button aria-label="Decrease Op Count" onClick={() => dispatch(decrementOpCount())} disabled={allowedOpCount <= Const.OP_SLOT_COUNT_MIN}>-</button>
    </div>
}

export default OpCountEdit;