import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux';
import { incrementOpCount, addOpsToTeam, clearOpsFromTeam } from '../reducers/OpDeck';
import { IAppState } from '../reducers/State';

export interface IOpGenPanelProps {
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
    const dispatch = useDispatch()
    // Remove # of ids from the list for each sample.
    const charIds = Array.from(availableOpIds);
    const opsSampleCount = allowedOpCount - inUseOpIds.length;
    return (
        <div>
            <button onClick={() => dispatch(addOpsToTeam(generateOps(charIds, opsSampleCount)))}>Fill</button>
            <button onClick={() => dispatch(clearOpsFromTeam(inUseOpIds))} >Clear</button>
        </div>
    );
}
