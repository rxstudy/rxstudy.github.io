import React, { Component } from "react"
import { PROFESSION_TO_ICON_NAME } from "../Const"
import { ICharacter } from "../reducers/CharDBSlice"
import "./OpCell.css"
import { ProfessionEnum, Vector2 } from '../reducers/GlobalTypes';
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { getAvatarUrl } from "../Utils";
import _ from "lodash";


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
    removeCallback: Function,
    onDragCallback: Function,
    onReleaseCallback: Function,
    banCallback: Function,
}

type OpCellState = {
    mouseDown: boolean,
    displacement: Vector2,
    mouseDownOffset: Vector2,
    cellTopRef: React.RefObject<HTMLDivElement>,
    opacity: number,
    zIndex: number,
    mousePosPrev: Vector2,
}

export class OpCell extends Component<OpCellProps, OpCellState> {
    state: OpCellState = {
        mouseDown: false,
        mouseDownOffset: { x: 0, y: 0 },
        displacement: { x: 0, y: 0 },
        cellTopRef: React.createRef(),
        opacity: 1,
        zIndex: 0,
        mousePosPrev: { x: 0, y: 0 },
    };
    animationHandle_: number;
    tweenHandle_: Tween<Vector2> | null;
    constructor(props: OpCellProps) {
        super(props);
        this.animationHandle_ = 0;
        this.tweenHandle_ = null;
    }
    onMouseDown(e: React.MouseEvent) { this.onDown({ x: e.clientX, y: e.clientY }) }
    onTouchStart(e: React.TouchEvent) { this.onDown({ x: e.touches[0].clientX, y: e.touches[0].clientY }) }
    onMouseMove(e: React.MouseEvent) { this.onMove({ x: e.clientX, y: e.clientY }); };
    onTouchMove(e: React.TouchEvent) { this.onMove({ x: e.touches[0].clientX, y: e.touches[0].clientY }) }
    onTouchEnd() { this.onUp(); }
    onMouseUp() { this.onUp(); }
    onDown(mousePos: Vector2) {
        const el = this.state.cellTopRef.current;
        if (el == null || el.offsetLeft === undefined || el.offsetTop === undefined) return;
        this.stopAnimation();
        this.setState({
            mouseDown: true,
            mousePosPrev: {
                x: mousePos.x,
                y: mousePos.y
            },
            zIndex: 15,
            mouseDownOffset: {
                x: mousePos.x - this.state.displacement.x - el.offsetLeft,
                y: mousePos.y - this.state.displacement.y - el.offsetTop
            },

        });
        this.props.onDragCallback();
    }
    onMove(mousePos: Vector2) {
        const el = this.state.cellTopRef.current;
        if (el == null || el.offsetLeft === undefined || el.offsetTop === undefined) return;
        if (!this.state.mouseDown) return;
        this.stopAnimation();

        this.setState({
            displacement: {
                x: mousePos.x - el.offsetLeft - this.state.mouseDownOffset.x,
                y: mousePos.y - el.offsetTop - this.state.mouseDownOffset.y
            },
            mousePosPrev: {
                x: mousePos.x,
                y: mousePos.y
            },
            zIndex: 15,
            opacity: this.computeOpacity(this.state.displacement)
        })

        if (this.state.opacity === 0) {
            if (this.state.displacement.y < 0) {
                this.props.banCallback();
            } else {
                this.props.removeCallback();
            }
        }
    }
    onUp() {
        if (!this.state.mouseDown) return
        this.setState({ mouseDown: false })
        this.props.onReleaseCallback();
        this.animationHandle_ = requestAnimationFrame(this.animate.bind(this));
        const tweenDs = { ...this.state.displacement };
        this.tweenHandle_ = new TWEEN.Tween(tweenDs)
            .to({ x: 0, y: 0 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                this.setState({
                    displacement: tweenDs,
                    opacity: this.computeOpacity(this.state.displacement)
                })
            })
            .onStop(() => {
                this.clearAnimation()
            })
            .onComplete(() => {
                this.clearAnimation()
                this.setState({ zIndex: 0 })
            })
            .start();
    }
    computeOpacity(displacement: Vector2) {
        return _.clamp(1 - Math.abs(displacement.y) / 170, 0, 1);
    }
    stopAnimation() {
        this.tweenHandle_?.stop();
    }
    clearAnimation() {
        cancelAnimationFrame(this.animationHandle_)
        if (this.tweenHandle_) {
            TWEEN.remove(this.tweenHandle_);
            this.tweenHandle_ = null;
        }
    }
    animate(time: number) {
        this.animationHandle_ = requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time)
    }
    render() {
        const props: OpCellProps = this.props;
        const ds = this.state.displacement;
        return <div className="OpCell-top"
            onTouchStart={e => this.onTouchStart(e)}
            onTouchMove={e => this.onTouchMove(e)}
            onTouchEnd={() => this.onTouchEnd()}
            onMouseDown={e => this.onMouseDown(e)}
            onMouseUp={() => this.onMouseUp()}
            onMouseMove={e => this.onMouseMove(e)}
            onMouseLeave={() => this.onMouseUp()}
            ref={this.state.cellTopRef}
            style={{
                "transform": `translate(${ds.x}px, ${ds.y}px)`,
                "opacity": this.state.opacity,
                "zIndex": this.state.zIndex
            }}>
            <div className={`OpCell-grad OpCell-grad-${props.opDetail.rarity + 1}`}></div>
            <div className="OpCell-avatar" style={{
                "backgroundImage": `url(${getAvatarUrl(props.opId)})`
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
