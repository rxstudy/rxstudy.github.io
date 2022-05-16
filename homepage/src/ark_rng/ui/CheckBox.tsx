import React from 'react'
import PropTypes from 'prop-types'
import "./CheckBox.css"

type ICheckBoxProp = {
    onClick: () => void,
    className?: string,
    children: React.ReactNode | string,
    checked: boolean
}

function CheckBox(props: ICheckBoxProp) {
    return (
        <div onClick={props.onClick}
            className={`checkbox ${props.className || ""} ${props.checked ? "checked" : ""}`}>{props.children}</div>
    )
}


export default CheckBox
