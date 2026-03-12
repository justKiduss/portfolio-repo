import { getState,setState } from "./state.js";
import { reducer } from "./reducer.js";

export function dispatch(action,render){
    const newState=reducer(getState(),action)
    console.log(newState);
    setState(newState);
    render();
}