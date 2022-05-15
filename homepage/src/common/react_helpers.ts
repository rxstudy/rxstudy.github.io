import { useEffect } from "react";

export const OnComponentDidMount = (fun: React.EffectCallback) => useEffect(fun, []);