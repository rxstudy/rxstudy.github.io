import { useEffect } from "react";

export const OnComponentDidMount = (fun: React.EffectCallback) => useEffect(fun, []);

export const setClearAndSetBodyClass = (className: string) => {
    document.body.className = className;
}