import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IAppState } from './reducers/State';
import { OpCell, PlaceHolderCell } from "./widgets/OpCell";
import "./TeamView.css"
import _ from "lodash";
import { clearOpsFromTeam } from "./reducers/OpDeck";

type Props = {

}
type State = {

}


function OpCells() {
    const allowedOpCount = useSelector((state: IAppState) => state.op_deck.allowed_op_count);
    const charMap = useSelector((state: IAppState) => state.char_db.map);
    const charInUse = useSelector((state: IAppState) => state.op_deck.in_use_op_ids);
    const dispatch = useDispatch();
    const teamCell: React.ReactNode[] = [];
    _.sortBy(charInUse, (cid) => {
        return charMap[cid].profession
    }).forEach(charId => {
        teamCell.push(<OpCell key={charId} opId={charId} opDetail={charMap[charId]} removeCallback={() => dispatch(clearOpsFromTeam([charId]))} />);
    })
    console.log(`Log[INFO]: In use op count: ${charInUse.length}, Allowed op count: ${allowedOpCount}`)
    for (let i = charInUse.length; i < allowedOpCount; i++) {
        teamCell.push(<PlaceHolderCell key={`unused-${i}`} />);
    }

    return <div className="TeamView-cells">{teamCell}</div>
}

class TeamView extends React.Component<Props, State> {
    renderOpCells() {
        return <OpCells />
    }
    render() {
        return <div className="TeamView-top">{this.renderOpCells()}</div>
    }
}

export default TeamView