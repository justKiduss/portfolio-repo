export let state = {

  grid: {
    rows: 10,
    cols: 10
  },
  tiles: {
      '0-0': { row:0, col:0, terrain:"plain" },
      '0-1': { row:0, col:1, terrain:"forest" },
      '4-2':{  row:4, col:2, terrain:"river"},
      '5-6':{  row:5, col:6, terrain:"mountain"},
      '8-7':{ row:8,  col:7, terrain:"wall"}
  },
  units: {
    unit1: {
        id: "unit1",
        owner: "player1",
        row: 2,
        col: 4,
        health: 10,
        attack: 3,
        movement: 3,
        remainingMovement:3,
        defense:0
    },

    unit2: {
        id: "unit2",
        owner: "player2",
        row: 6,
        col: 5,
        health: 10,
        attack: 4,
        movement: 2,
        remainingMovement:2,
        defense:0
    }
    },
  turn: {
    currentPlayer: "player1",
    number: 1
  },

  selection: {
    unitId: null
  },

  ui: {
    highlightedTiles: []
  }

}

export function getState(){
  return state;
}

export function setState(newState){
  state=newState;
}