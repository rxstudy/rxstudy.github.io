import React from 'react'
import './CheckBox.css'

interface ICheckBoxProp {
  onClick: () => void
  className?: string
  children: React.ReactNode | string
  checked: boolean
}

function CheckBox (props: ICheckBoxProp): JSX.Element {
  const customClassName = props.className != null ? props.className : ''
  return (
        <div onClick={props.onClick}
            className={`checkbox ${customClassName} ${props.checked ? 'checked' : ''}`}>{props.children}</div>
  )
}

export default CheckBox
