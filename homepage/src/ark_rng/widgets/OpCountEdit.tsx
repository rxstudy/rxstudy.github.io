import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OP_SLOT_COUNT_MAX, OP_SLOT_COUNT_MIN } from '../Const'
import { decrementOpCount, incrementOpCount } from '../reducers/OpDeck'
import { type IAppState } from '../reducers/State'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'
import { MdPeopleAlt } from 'react-icons/md'
import './OpCountEdit.css'

function OpCountEdit (): JSX.Element {
  const allowedOpCount = useSelector((state: IAppState) => state.op_deck.allowed_op_count)
  const dispatch = useDispatch()

  return <div className="OpCountEdit-top">
        <div className="OpCountEdit-icon"><MdPeopleAlt /></div>
        <div className="OpCountEdit-num">{allowedOpCount}</div>
        <button className="OpCountEdit-up" aria-label="Increase Op Count" onClick={() => dispatch(incrementOpCount())} disabled={allowedOpCount >= OP_SLOT_COUNT_MAX}><GoTriangleUp /></button>
        <button className="OpCountEdit-down" aria-label="Decrease Op Count" onClick={() => dispatch(decrementOpCount())} disabled={allowedOpCount <= OP_SLOT_COUNT_MIN}><GoTriangleDown /></button>
    </div>
}

export default OpCountEdit
