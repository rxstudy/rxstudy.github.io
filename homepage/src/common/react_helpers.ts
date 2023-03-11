import { useEffect } from 'react'

export const OnComponentDidMount = (fun: React.EffectCallback): void => { useEffect(fun, []) }

export const setClearAndSetBodyClass = (className: string): void => {
  document.body.className = className
}
