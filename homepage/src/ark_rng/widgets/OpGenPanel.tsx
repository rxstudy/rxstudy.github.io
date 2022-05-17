import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux';
import { incrementOpCount, addOpsToTeam, clearOpsFromTeam } from '../reducers/OpDeck';
import { IAppState } from '../reducers/State';
import { toggleFemaleFilter, toggleMaleFilter, Filter, toggleProfessionFilter, toggleRarityFilter } from '../reducers/UiPanelSlice';
import { ICharacterMap, ICharacter } from '../reducers/CharDBSlice';
import { createImportSpecifier, FileWatcherEventKind } from 'typescript';
import _ from 'lodash';
import "./OpGenPanel.css";
import CheckBox from '../ui/CheckBox';
import { ProfessionEnum } from '../reducers/GlobalTypes';
import { MdOutlineStarPurple500 } from "react-icons/md";
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
        return !rejectProfession.has(charMap[cid].profession);
    })


    const rejectRarity: Set<number> = new Set();
    filter.rarity.forEach((acceptRarity, idx) => { if (!acceptRarity) rejectRarity.add(idx) })

    filteredIds = _.filter(filteredIds, (cid: string) => {
        return !rejectRarity.has(charMap[cid].rarity);
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

type RarityFilterCheckBoxProps = {

}

function RarityFilterCheckBox(props: RarityFilterCheckBoxProps) {
    const checkBoxes: React.ReactNode[] = []
    const dispatch = useDispatch();
    const raritySelection = useSelector((state: IAppState) => state.ui_panel.filter.rarity);
    for (let i = 0; i < raritySelection.length; i++) {
        checkBoxes.push(<div className={`OpGenPanel-star-checkbox ${raritySelection[i] ? "checked" : ""}`} key={`star-checkbox-${i}`}
            onClick={() => dispatch(toggleRarityFilter(i))}>
            <span className="OpGenPanel-star-text">{i + 1}</span>
            <span className="OpGenPanel-star-ico"><MdOutlineStarPurple500 /></span>
        </div>)
    }
    return <div className="OpGenPanel-checkbox-top">
        {checkBoxes}
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
        <div className="OpGenPanel-top horizontal-wrap">
            <div className="vertical-wrap">
                <div className="OpGenPanel-gender-filter">
                    <CheckBox onClick={() => dispatch(toggleFemaleFilter())} checked={filter.female}>女干员</CheckBox>
                    <CheckBox onClick={() => dispatch(toggleMaleFilter())} checked={filter.male}>男干员</CheckBox>
                </div>
                <RarityFilterCheckBox />
                <ProfessionFilterCheckBox checked={filter.profession} />
            </div>
            <div className="vertical-wrap">
                <button className="OpGenPanel-action-gen" onClick={() => {
                    const filteredId = filterOps(availableOpIds, filter, charMap);
                    dispatch(addOpsToTeam(generateOps(filteredId, opsSampleCount)))
                }}>随机生成</button>
                <button className="OpGenPanel-action-clear" onClick={() => dispatch(clearOpsFromTeam(inUseOpIds))} >清除</button>
            </div>
        </div>
    );
}
