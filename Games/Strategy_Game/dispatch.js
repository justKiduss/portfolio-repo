import { getState,setState } from "./state.js";
import { reducer } from "./reducer.js";
import { Stat } from "./Units.js";

export function dispatch(action,render){
    const newState=reducer(getState(),action)
    console.log(newState);
    setState(newState);
    render();
    Stat(getState);
}