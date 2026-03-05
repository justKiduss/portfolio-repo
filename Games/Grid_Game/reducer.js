import { state } from "./state.js";
export function reducer(state,action){
switch(action.type){
    case "MOVE_UP":{
        const {row,col}=action.payload;
        return state


//         board: {
//     rows: 8,
//     cols: 8
//   },

//   players: {
//     p1: {
//       id: "p1",
//       row: 0,
//       col: 0,
//       health: 3
//     },

//     p2: {
//       id: "p2",
//       row: 7,
//       col: 7,
//       health: 3
//     }
//   },

//   turn: "p1",

//   status: "playing"
    }
    case "MOVE_DOWN":{

    }
    case "MOVE_LEFT":{

    }
    case "MOVE_RIGHT":{

    }
    case "SHOOT":{

    }
    default:{
        return state;
    }
}
}