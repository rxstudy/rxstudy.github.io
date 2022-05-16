import { PROFESSION_TO_ICON_NAME } from "../Const"
import { ICharacter } from "../reducers/CharDBSlice"
import "./OpCell.css"
import { ProfessionEnum } from '../reducers/GlobalTypes';

type OpCellProps = {
    opId: string,
    opDetail: ICharacter
}

type ProfessionIconProps = {
    profession: ProfessionEnum,
}

export function ProfessionIcon(props: ProfessionIconProps) {
    return <div className={`OpCell-profession  Opcell-profession-${PROFESSION_TO_ICON_NAME[props.profession]}`} />
}

type StarsIconProps = {
    rarity: number
}

export function StarsIcon(props: StarsIconProps) {
    const stars: React.ReactNode[] = [];
    // Rarity stars from 0 instead of 1.
    for (var i = 0; i < props.rarity + 1; i++) {
        stars.push(<span className="OpCell-star" key={`star-${i}`}></span>)
    }
    return <div className="OpCell-stars-top">
        {stars}
    </div>
}

export function OpCell(props: OpCellProps) {
    return <div className="OpCell-top">
        <div className={`OpCell-grad OpCell-grad-${props.opDetail.rarity + 1}`}></div>
        <div className="OpCell-avatar" style={{
            "backgroundImage": `url(https://aceship.github.io/AN-EN-Tags/img/avatars/${props.opId}.png)`
        }}></div>
        <div className="OpCell-detail-top">
            <ProfessionIcon profession={props.opDetail.profession} />
            <div style={{ marginRight: 2 }}>
                <StarsIcon rarity={props.opDetail.rarity} />
                <div className="OpCell-name">{props.opDetail.name}</div>
            </div>
        </div>
    </div>
}

export function PlaceHolderCell() {
    return <div className="OpCell-top">
        <div className={`OpCell-grad OpCell-grad-1`}></div>
        <div className="OpCell-avatar"></div>
    </div>
}
