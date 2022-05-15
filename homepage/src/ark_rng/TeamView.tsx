import React from "react";
import { useSelector } from 'react-redux'
import { AppState } from './reducers/State';

type Props = {

}
type State = {

}


function OpCells() {
    const count = useSelector((state: AppState) => state.op_count.value);
    const charMap = useSelector((state: AppState) => state.char_db.map);
    const teamCell: React.ReactNode[] = [];
    // Remove # of ids from the list for each sample.
    const charIds = Object.keys(charMap);
    for (let i = 1; i <= count; i++) {
        let pos = Math.floor(Math.random() * charIds.length);
        let charId = charIds.splice(pos, 1)[0];
        teamCell.push(<div key={`char-{idx}`}>{charMap[charId].name}</div>);
    }

    return <div>{teamCell}</div>
}

class TeamView extends React.Component<Props, State> {
    renderOpCells() {
        return <OpCells />
    }
    render() {
        return <div>{this.renderOpCells()}</div>
    }
}

export default TeamView