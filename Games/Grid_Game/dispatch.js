import { state } from "./state.js"
import { reducer } from "./reducer.js"

export function dispatch(action, render){

  const newState = reducer(state, action)

  Object.assign(state, newState)

  render()

}