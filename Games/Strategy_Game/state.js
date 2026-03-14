export let state = {

  grid: {
    rows: 10,
    cols: 10
  },
  tiles: {
    // Row 1 Forests
    '1-2': { row: 1, col: 2, terrain: "forest" },
    '1-3': { row: 1, col: 3, terrain: "forest" },
    '1-4': { row: 1, col: 4, terrain: "forest" },
    
    // Row 2 Forests and Mountains
    '2-2': { row: 2, col: 2, terrain: "forest" },
    '2-3': { row: 2, col: 3, terrain: "forest" },
    '2-4': { row: 2, col: 4, terrain: "forest" },
    '2-6': { row: 2, col: 6, terrain: "mountain" },
    '2-7': { row: 2, col: 7, terrain: "mountain" },
    '2-8': { row: 2, col: 8, terrain: "mountain" },

    // Row 3 Mountains
    '3-6': { row: 3, col: 6, terrain: "mountain" },
    '3-7': { row: 3, col: 7, terrain: "mountain" },
    '3-8': { row: 3, col: 8, terrain: "mountain" },

    // Row 4 Rivers
    '4-1': { row: 4, col: 1, terrain: "river" },
    '4-2': { row: 4, col: 2, terrain: "river" },
    '4-3': { row: 4, col: 3, terrain: "river" },

    // Row 5 Rivers
    '5-1': { row: 5, col: 1, terrain: "river" },
    '5-2': { row: 5, col: 2, terrain: "river" },
    '5-3': { row: 5, col: 3, terrain: "river" },

    // Row 6 Mountains
    '6-6': { row: 6, col: 6, terrain: "mountain" },
    '6-7': { row: 6, col: 7, terrain: "mountain" },
    '6-8': { row: 6, col: 8, terrain: "mountain" },

    // Row 7 Forests and Mountains
    '7-2': { row: 7, col: 2, terrain: "forest" },
    '7-3': { row: 7, col: 3, terrain: "forest" },
    '7-4': { row: 7, col: 4, terrain: "forest" },
    '7-6': { row: 7, col: 6, terrain: "mountain" },
    '7-7': { row: 7, col: 7, terrain: "mountain" },
    '7-8': { row: 7, col: 8, terrain: "mountain" },

    // Row 8 Forests
    '8-2': { row: 8, col: 2, terrain: "forest" },
    '8-3': { row: 8, col: 3, terrain: "forest" },
    '8-4': { row: 8, col: 4, terrain: "forest" },
  },
  units: {
    unit1: {
        id: "unit1",
        owner: "player1",
        row: 2,
        col: 4,
        health: 10,
        attack: 4,
        movement: 3,
        remainingMovement:3,
        defense:0,
        range:3
    },

    unit2: {
        id: "unit2",
        owner: "player2",
        row: 6,
        col: 5,
        health: 10,
        attack: 4,
        movement: 3,
        remainingMovement:3,
        defense:0,
        range:3
    }
    },
  turn: {
    currentPlayer: "player1",
    number: 1
  },

  selection: {
    unitId: null
  },

  unitLocations: {
        '2-4': 'unit1',
        '6-5': 'unit2'
  },

  ui: {
    highlightedTiles: [],
    explosion:null,
    flash:null
  }

}

export function getState(){
  return state;
}

export function setState(newState){
  state=newState;
}