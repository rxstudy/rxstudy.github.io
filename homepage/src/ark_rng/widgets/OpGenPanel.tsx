import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux';
import { incrementOpCount, addOpsToTeam, clearOpsFromTeam } from '../reducers/OpDeck';
import { IAppState } from '../reducers/State';
import { toggleFemaleFilter, toggleMaleFilter, Filter, toggleProfessionFilter } from '../reducers/UiPanelSlice';
import { ICharacterMap, ICharacter } from '../reducers/CharDBSlice';
import { createImportSpecifier, FileWatcherEventKind } from 'typescript';
import _ from 'lodash';
import "./OpGenPanel.css";
import CheckBox from '../ui/CheckBox';
import { ProfessionEnum } from '../reducers/GlobalTypes';
import { ALL_PROFESSIONS, PROFESSION_TO_ICON_NAME } from '../Const';

export interface IOpGenPanelProps {
}


function filterOps(availableOpIds: string[], filter: Filter, charMap: ICharacterMap): string[] {
    // Remove # of ids from the list for each sample.
    const rejectGender: Set<string> = new Set([])
    if (!filter.female) rejectGender.add("女")
    if (!filter.male) rejectGender.add("男")

    let filteredIds = _.filter(availableOpIds, (cid: string) => {
        return !rejectGender.has(charMap[cid].sex);
    })

    const rejectProfession: Set<ProfessionEnum> =
        new Set(_.filter(ALL_PROFESSIONS, prof => !filter.profession[prof]))

    filteredIds = _.filter(filteredIds, (cid: string) => {
        console.log(charMap[cid].profession)
        return !rejectProfession.has(charMap[cid].profession);
    })

    return filteredIds;
}


function generateOps(charIds: string[], opsSampleCount: number): string[] {
    console.log("Log[INFO]: Generate samples " + opsSampleCount);
    const samples: Set<string> = new Set([])
    for (let i = 0; i < Math.min(charIds.length, opsSampleCount); i++) {
        let pos = Math.floor(Math.random() * charIds.length);
        samples.add(charIds.splice(pos, 1)[0]);
    }
    return Array.from(samples)
}

type ProfessionFilterCheckBoxProps = {
    checked: { [k in ProfessionEnum]: boolean }
}

function ProfessionFilterCheckBox(props: ProfessionFilterCheckBoxProps) {
    const dispatch = useDispatch();
    const nodes = ALL_PROFESSIONS.map(prof => {
        const iconName = PROFESSION_TO_ICON_NAME[prof]
        const checked = props.checked[prof]
        return <div
            key={`checkbox-prof-${prof}`}
            onClick={() => { dispatch(toggleProfessionFilter(prof)) }}
            className={`OpGenPanel-profession-icon OpGenPanel-profession-${iconName} ${checked ? "checked" : ""}`}></div>
    });

    return <div className="OpGenPanel-profession-top">
        {nodes}
    </div>
}

export default function OpGenPanel(props: IOpGenPanelProps) {
    const inUseOpIds = useSelector((state: IAppState) => state.op_deck.in_use_op_ids);
    const availableOpIds = useSelector((state: IAppState) => state.op_deck.available_op_ids);
    const allowedOpCount = useSelector((state: IAppState) => state.op_deck.allowed_op_count);
    const charMap = useSelector((state: IAppState) => state.char_db.map);
    const filter = useSelector((state: IAppState) => state.ui_panel.filter);
    const dispatch = useDispatch()
    const opsSampleCount = allowedOpCount - inUseOpIds.length;
    return (
        <div className="op-gen-panel-top">
            <div>
                <CheckBox onClick={() => dispatch(toggleFemaleFilter())} checked={filter.female}>女干员</CheckBox>
                <CheckBox onClick={() => dispatch(toggleMaleFilter())} checked={filter.male}>男干员</CheckBox>
            </div>
            <ProfessionFilterCheckBox checked={filter.profession} />
            <button onClick={() => {
                const filteredId = filterOps(availableOpIds, filter, charMap);
                dispatch(addOpsToTeam(generateOps(filteredId, opsSampleCount)))
            }}>Fill</button>
            <button onClick={() => dispatch(clearOpsFromTeam(inUseOpIds))} >Clear</button>
        </div>
    );
}
