import { ICharacter } from "../reducers/CharDBSlice"
import "./OpCell.css"

type OpCellProps = {
    opId: string,
    opDetail: ICharacter
}

export function OpCell(props: OpCellProps) {
    return <div className="OpCell-top">
        <div className="OpCell-avatar" style={{
            "backgroundImage": `url(https://aceship.github.io/AN-EN-Tags/img/avatars/${props.opId}.png)`,
            "width": `${window.innerWidth * 0.15}px`,
            "height": `${window.innerWidth * 0.15}px`
        }}></div>
        <div className="OpCell-name">{props.opDetail.name}</div>
    </div>
}

export function PlaceHolderCell() {
    return <div>+</div>
}
