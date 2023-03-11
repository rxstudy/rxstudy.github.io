import React from 'react'
import './BannedDeck.css'
import { useSelector, useDispatch } from 'react-redux'
import { type IAppState } from './reducers/State'
import { OpCell } from './widgets/OpCell'
import { includeOpsFromTeam } from './reducers/OpDeck'

function BannedDeck (): JSX.Element {
  const charMap = useSelector((state: IAppState) => state.char_db.map)
  const excludedCharIds = useSelector((state: IAppState) => state.op_deck.excluded_op_ids)
  const dispatch = useDispatch()
  const teamCell: React.ReactNode[] = []
  excludedCharIds.forEach(charId => {
    teamCell.push(<OpCell key={charId} opId={charId} opDetail={charMap[charId]}
            removeCallback={() => dispatch(includeOpsFromTeam([charId]))}
            banCallback={() => { }}
            onDragCallback={() => { }}
            onReleaseCallback={() => { }}
        />)
  })
  return (
        <div className="BannedDeck-top">
            <div className="BannedDeck-title">黑名单</div>
            <div className="BannedDeck-container">{teamCell}</div>
        </div>
  )
}

export default BannedDeck
