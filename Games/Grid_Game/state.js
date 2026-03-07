export let state = {
  board: {
    rows: 8,
    cols: 8
  },

  players: {
    p1: {id: "p1",row: 0,col: 0,health: 3},
    p2: {id: "p2",row: 7,col: 7,health: 3}
  },

  turn: "p1",
  lastShot:null,
  status: `player or p1 starts it`
}

export function getState(){
  return state;
}

export function setState(newState){
  state = newState;
}
