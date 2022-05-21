import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IAppState } from './reducers/State';
import { OpCell, PlaceHolderCell } from "./widgets/OpCell";
import "./TeamView.css"
import _ from "lodash";
import { clearOpsFromTeam, excludeOpsFromTeam } from "./reducers/OpDeck";
import { clearDraggedCard, setDraggedCard } from "./reducers/UiPanelSlice";
import { ProfessionEnum } from './reducers/GlobalTypes';

const OP_CELL_SORT_ORD = {
    [ProfessionEnum.Pioneer]: 0,
    [ProfessionEnum.Warrior]: 1,
    [ProfessionEnum.Tank]: 2,
    [ProfessionEnum.Sniper]: 3,
    [ProfessionEnum.Caster]: 4,
    [ProfessionEnum.Medic]: 5,
    [ProfessionEnum.Support]: 6,
    [ProfessionEnum.Special]: 7,
}

function OpCells() {
    const allowedOpCount = useSelector((state: IAppState) => state.op_deck.allowed_op_count);
    const charMap = useSelector((state: IAppState) => state.char_db.map);
    const charInUse = useSelector((state: IAppState) => state.op_deck.in_use_op_ids);
    const dispatch = useDispatch();
    const teamCell: React.ReactNode[] = [];
    _.sortBy(charInUse, (cid) => {
        return OP_CELL_SORT_ORD[charMap[cid].profession]
    }).forEach(charId => {
        teamCell.push(<OpCell key={charId} opId={charId} opDetail={charMap[charId]}
            removeCallback={() => dispatch(clearOpsFromTeam([charId]))}
            onDragCallback={() => dispatch(setDraggedCard(charId))}
            onReleaseCallback={() => dispatch(clearDraggedCard())}
            banCallback={() => dispatch(excludeOpsFromTeam([charId]))}
        />);
    })
    console.log(`Log[INFO]: In use op count: ${charInUse.length}, Allowed op count: ${allowedOpCount}`)
    for (let i = charInUse.length; i < allowedOpCount; i++) {
        teamCell.push(<PlaceHolderCell key={`unused-${i}`} />);
    }

    return <div className="TeamView-cells">{teamCell}</div>
}

function TeamView() {
    return <div className="TeamView-top">
        <div className="TeamView-title">随机队伍</div>
        <div><OpCells /></div>
    </div >
}

export default TeamView