import { createContext , useState } from "react";

export let CounterContext = createContext()

export default function CounterContextProvider(propse){

    const [count, setCount] = useState(0);

    return <CounterContext.Provider value={{count}}>
        {propse.children}

    </CounterContext.Provider>
}