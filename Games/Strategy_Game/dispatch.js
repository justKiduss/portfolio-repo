import { getState,setState } from "./state";
import { reducer } from "./reducer";

export function dispatch(action){
    const newState=reducer(getState(),action)
    setState(newState);
}