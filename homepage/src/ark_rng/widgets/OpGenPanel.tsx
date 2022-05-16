import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux';
import { incrementOpCount, addOpsToTeam, clearOpsFromTeam } from '../reducers/OpDeck';
import { IAppState } from '../reducers/State';
import { toggleFemaleFilter, toggleMaleFilter, Filter } from '../reducers/UiPanelSlice';
import { ICharacterMap, ICharacter } from '../reducers/CharDBSlice';
import { FileWatcherEventKind } from 'typescript';
import _ from 'lodash';

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

    return filteredIds;
}


function generateOps(charIds: string[], opsSampleCount: number): string[] {
    console.log("Log[INFO]: Generate samples " + opsSampleCount);
    const samples: Set<string> = new Set([])
    for (let i = 0; i < opsSampleCount; i++) {
        let pos = Math.floor(Math.random() * charIds.length);
        samples.add(charIds.splice(pos, 1)[0]);
    }
    return Array.from(samples)
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
        <div>
            <div>
                <label htmlFor="filter-female" onClick={() => dispatch(toggleFemaleFilter())}>
                    <input readOnly type="checkbox" id="filter-female" name="filter-female" checked={filter.female}></input>女
                </label>
                <label htmlFor="filter-male" onClick={() => dispatch(toggleMaleFilter())}>
                    <input readOnly type="checkbox" id="filter-male" name="fitler-male" checked={filter.male}></input>男
                </label>
            </div>
            <button onClick={() => {
                const filteredId = filterOps(availableOpIds, filter, charMap);
                dispatch(addOpsToTeam(generateOps(filteredId, opsSampleCount)))
            }}>Fill</button>
            <button onClick={() => dispatch(clearOpsFromTeam(inUseOpIds))} >Clear</button>
        </div>
    );
}
