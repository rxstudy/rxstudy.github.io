import React, { Component } from "react"
import { PROFESSION_TO_ICON_NAME } from "../Const"
import { ICharacter } from "../reducers/CharDBSlice"
import "./OpCell.css"
import { ProfessionEnum, Vector2 } from '../reducers/GlobalTypes';
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { timeStamp } from "console";


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

type OpCellProps = {
    opId: string,
    opDetail: ICharacter,
    removeCallback: Function
}

type OpCellState = {
    mouseDown: boolean,
    displacement: Vector2,
    mouseDownOffset: Vector2,
    cellTopRef: React.RefObject<HTMLDivElement>,
    animationRef: number,
    tweenRef: Tween<Vector2> | null,
    opacity: number,
    mousePosPrev: Vector2,
    mouseVelocity: Vector2,
    mouseVelocityPrev: Vector2,
    acceleration: Vector2,
    timestampPrev: number,
}

const MAX_SPEED = 3000;
const MAX_DIST = 400;
export class OpCell extends Component<OpCellProps, OpCellState> {
    state: OpCellState = {
        mouseDown: false,
        mouseDownOffset: { x: 0, y: 0 },
        displacement: { x: 0, y: 0 },
        cellTopRef: React.createRef(),
        animationRef: 0,
        tweenRef: null,
        opacity: 1,
        mousePosPrev: { x: 0, y: 0 },
        mouseVelocity: { x: 0, y: 0 },
        mouseVelocityPrev: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 },
        timestampPrev: 0,
    };
    onMouseDown(e: React.MouseEvent) { this.onDown({ x: e.clientX, y: e.clientY }) }
    onTouchStart(e: React.TouchEvent) { this.onDown({ x: e.touches[0].clientX, y: e.touches[0].clientY }) }
    onMouseMove(e: React.MouseEvent) { this.onMove({ x: e.clientX, y: e.clientY }); };
    onTouchMove(e: React.TouchEvent) { this.onMove({ x: e.touches[0].clientX, y: e.touches[0].clientY }) }
    onTouchEnd() { this.onUp(); }
    onMouseUp() { this.onUp(); }
    onDown(mousePos: Vector2) {
        const el = this.state.cellTopRef.current;
        if (el == null || el.offsetLeft == undefined || el.offsetTop == undefined) return;
        this.state.mouseDown = true;
        this.updateMousePrevPosition(mousePos);
        // When cell is away and in animation, we need to calculate vectors in different way 
        // offsetLeft/Top are the value before the cell moves, we need to calculate new offset which 
        // is the expression below.
        if (this.state.tweenRef) {
            this.stopAnimation();
            this.state.mouseDownOffset.x = mousePos.x - this.state.displacement.x + - el.offsetLeft;
            this.state.mouseDownOffset.y = mousePos.y - this.state.displacement.y - el.offsetTop;
            return
        }
        // Get pinched pos in the cell.
        this.state.mouseDownOffset.x = mousePos.x - el.offsetLeft;
        this.state.mouseDownOffset.y = mousePos.y - el.offsetTop;
        el.style.setProperty("z-index", "15");
    }
    onMove(mousePos: Vector2) {
        const el = this.state.cellTopRef.current;
        if (el == null || el.offsetLeft == undefined || el.offsetTop == undefined) return;
        if (!this.state.mouseDown) return;
        this.stopAnimation();
        this.state.displacement.x = mousePos.x - el.offsetLeft - this.state.mouseDownOffset.x;
        this.state.displacement.y = mousePos.y - el.offsetTop - this.state.mouseDownOffset.y;
        this.recordVelocity(mousePos);
        this.maybeRemoveItem(this.state.mouseVelocity);
        this.displaceCell(this.state.displacement);
        this.updateOpacity(this.state.displacement);
    }
    onUp() {
        if (!this.state.mouseDown) return
        this.state.mouseDown = false;
        this.state.animationRef = requestAnimationFrame(this.animate.bind(this));
        this.state.tweenRef = new TWEEN.Tween(this.state.displacement)
            .to({ x: 0, y: 0 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                this.displaceCell(this.state.displacement)
                this.updateOpacity(this.state.displacement)
            })
            .onStop(() => {
                cancelAnimationFrame(this.state.animationRef)
                if (this.state.tweenRef) {
                    TWEEN.remove(this.state.tweenRef);
                    this.state.tweenRef = null;
                }
            })
            .onComplete(() => {
                cancelAnimationFrame(this.state.animationRef)
                if (this.state.tweenRef) {
                    TWEEN.remove(this.state.tweenRef);
                    this.state.tweenRef = null;
                }
                const el = this.state.cellTopRef.current;
                el?.style.setProperty("z-index", "0");
            })
            .start();
    }
    updateMousePrevPosition(mousePos: Vector2) {
        this.state.mousePosPrev.x = mousePos.x;
        this.state.mousePosPrev.y = mousePos.y;
    }
    recordVelocity(mousePos: Vector2) {
        // Record velocity
        let dt = Math.max(0.001, (Date.now() - this.state.timestampPrev) / 1000);
        this.state.mouseVelocityPrev.x = this.state.mouseVelocity.x;
        this.state.mouseVelocityPrev.y = this.state.mouseVelocity.y;
        this.state.mouseVelocity.x = (mousePos.x - this.state.mousePosPrev.x) / dt;
        this.state.mouseVelocity.y = (mousePos.y - this.state.mousePosPrev.y) / dt;
        this.state.acceleration.x = this.state.mouseVelocity.x - this.state.mouseVelocityPrev.x
        this.state.acceleration.y = this.state.mouseVelocity.y - this.state.mouseVelocityPrev.y
        this.state.timestampPrev = Date.now();
        this.updateMousePrevPosition(mousePos);
    }
    maybeRemoveItem(velocity: Vector2) {
        let v = Math.sqrt(velocity.y * velocity.y +
            velocity.x * velocity.x)
        if (v > MAX_SPEED) this.props.removeCallback();
    }
    updateOpacity(displacement: Vector2) {
        let dist = Math.sqrt(displacement.x * displacement.x + displacement.y * displacement.y);
        let opacity = Math.max(0, 1 - dist / MAX_DIST);
        const el = this.state.cellTopRef.current;
        el?.style.setProperty("opacity", opacity.toString());
    }
    displaceCell(ds: Vector2) {
        const el = this.state.cellTopRef.current;
        if (el == null) return;

        el.style["transform"] = `translate(${ds.x}px, ${ds.y}px)`;
    }
    stopAnimation() {
        if (this.state.tweenRef) {
            this.state.tweenRef.stop();
            this.state.tweenRef = null;
        }
    }
    animate(time: number) {
        this.state.animationRef = requestAnimationFrame(this.animate.bind(this))
        TWEEN.update(time)
    }
    render() {
        const props: OpCellProps = this.props;
        return <div className="OpCell-top"
            onTouchStart={e => this.onTouchStart(e)}
            onTouchMove={e => this.onTouchMove(e)}
            onTouchEnd={() => this.onTouchEnd()}
            onMouseDown={e => this.onMouseDown(e)}
            onMouseUp={() => this.onMouseUp()}
            onMouseMove={e => this.onMouseMove(e)}
            onMouseLeave={() => this.onMouseUp()}
            ref={this.state.cellTopRef} >
            <div className={`OpCell-grad OpCell-grad-${props.opDetail.rarity + 1}`}></div>
            <div className="OpCell-avatar" style={{
                "backgroundImage": `url(https://aceship.github.io/AN-EN-Tags/img/avatars/${props.opId}.png)`
            }}></div>
            <div className="OpCell-detail-top">
                <ProfessionIcon profession={props.opDetail.profession} />
                <div className="OpCell-detail-name-wrap">
                    <StarsIcon rarity={props.opDetail.rarity} />
                    <div className="OpCell-name">{props.opDetail.name}</div>
                </div>
            </div>
        </div>
    }
}


export function PlaceHolderCell() {
    return <div className="OpCell-top">
        <div className={`OpCell-grad OpCell-grad-1`}></div>
        <div className="OpCell-avatar"></div>
        <div className="OpCell-detail-top">
            <div className="OpCell-blank">-</div>
        </div>
    </div>
}
