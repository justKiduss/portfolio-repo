export const state = {

  grid: {
    rows: 10,
    cols: 10
  },

  tiles: {
    tiles: {
        "0-0": { row:0, col:0, terrain:"plain" },
        "0-1": { row:0, col:1, terrain:"forest" },
        "2-4":{  row:2, col:4, terrain:"river"},
        "6-5":{  row:6, col:5, terrain:"mountain"}
    }
  },
  units: {
    unit1: {
        id: "unit1",
        owner: "player1",
        row: 2,
        col: 4,
        health: 10,
        attack: 3,
        movement: 3
    },

    unit2: {
        id: "unit2",
        owner: "player2",
        row: 6,
        col: 5,
        health: 10,
        attack: 4,
        movement: 2
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