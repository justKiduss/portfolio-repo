const initialPositions = {
  p1: { row:0, col:0 },
  p2: { row:7, col:7 }
}
export function reducer(state,action){
    if (state.status.includes("Game Over")) {
        return state;
    }
    switch(action.type){    
    case "MOVEMENT":{
        const {row,col,id}=action.payload;
            return{
                ...state,
                players: {
                    ...state.players,
                    [id]: {
                        ...state.players[id],
                        row: row,
                        col: col,
                    },

                },
                status:`player ${id} is playing`
            }
    }
   case "SHOOT": {
  const { row, col, dir, id } = action.payload;

  const targetId = id === "p1" ? "p2" : "p1";
  const enemy = state.players[targetId];

  let hit = false;

  if (dir.row !== 0 && col === enemy.col) {
    if ((dir.row === -1 && enemy.row < row) || (dir.row === 1 && enemy.row > row)) {
      hit = true;
    }
  }

  if (dir.col !== 0 && row === enemy.row) {
    if ((dir.col === -1 && enemy.col < col) || (dir.col === 1 && enemy.col > col)) {
      hit = true;
    }
  }

  let newEnemy = enemy;

  if (hit) {
    newEnemy = {
      ...enemy,
      health: enemy.health - 1
    };
  }

  const tileW = 500 / state.board.cols;
  const tileH = 500 / state.board.rows;

  const startX = col * tileW + tileW/2;
  const startY = row * tileH + tileH/2;

  const endX = startX + dir.col * 500;
  const endY = startY + dir.row * 500;

  return {
    ...state,
    players:{
      ...state.players,

      [targetId]: newEnemy,

      [id]:{
        ...state.players[id],
        row: initialPositions[id].row,
        col: initialPositions[id].col
      }
    },
    lastShot:{ startX,startY,endX,endY },
    turn: id === "p1" ? "p2" : "p1",
    status: hit ? `player ${id} hit ${targetId}` : `player ${id} missed`
  }
}
    default: return state;  
    }
}