const initialPositions = {
  p1: { row:0, col:0 },
  p2: { row:7, col:7 }
}
export function reducer(state,action){

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
                turn:id==="p1"?'p2':"p1",
                status:`player ${id} is playing`
            }
    }
   case "SHOOT": {
  const { row, col, dir, id } = action.payload;

  const targetId = id === "p1" ? "p2" : "p1";
  const enemy = state.players[targetId];
  const shooter=state.players[id];
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
  const newHealth = hit ? enemy.health - 1 : enemy.health

  const tileW = 500 / state.board.cols;
  const tileH = 500 / state.board.rows;

  const startX = col * tileW + tileW/2;
  const startY = row * tileH + tileH/2;

  const endX = startX + dir.col * 500;
  const endY = startY + dir.row * 500;

  if(newHealth<=0){
        return {
        ...state,
        players:{
            ...state.players,
            [targetId]:{
                ...enemy,
                row: initialPositions[targetId].row,
                col: initialPositions[targetId].col,
                health:0
            }
        },
        status:`Game Over. ${id} wins`,
        turn:null,
        lastShot:{ startX,startY,endX,endY }
    }
  }
  return {
    ...state,
    players:{
      ...state.players,

      [targetId]:{
         ...enemy,
         row:hit?initialPositions[targetId].row:enemy.row,
         col:hit?initialPositions[targetId].col:enemy.col,
         health:newHealth
      },
      [id]:{
        ...shooter,
        row: hit?initialPositions[id].row:shooter.row,
        col: hit?initialPositions[id].col:shooter.col,

      }
    },
    lastShot:{ startX,startY,endX,endY },
    turn: id === "p1" ? "p2" : "p1",
    status: hit ? `player ${id} hit ${targetId}` : `player ${id} missed`
  }
}
case "CLEAR_SHOT":{
  return {
    ...state,

    lastShot:null
    }
  }
    default: return state;  
    }
}