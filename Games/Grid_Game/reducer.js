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
                status:`player ${id} is playing`
            }
    }

        

    // case "SHOOT": {
    //         const { row, col, dir, id } = action.payload;
    //         const targetId = id === "p1" ? "p2" : "p1";
    //         const enemy = state.players[targetId];

    //         let hit = false;
    //         // Loop through the grid in the chosen direction
    //         for (let i = 1; i < 8; i++) {
    //             const checkRow = row + (dir.row * i);
    //             const checkCol = col + (dir.col * i);

    //             // Stop if we go off the board
    //             if (checkRow < 0 || checkRow >= 8 || checkCol < 0 || checkCol >= 8) break;

    //             if (checkRow === enemy.row && checkCol === enemy.col) {
    //                 hit = true;
    //                 break;
    //             }
    //         }

    //         return {
    //             ...state,
    //             players: {
    //                 ...state.players,
    //                 [targetId]: {
    //                     ...enemy,
    //                     health: hit ? enemy.health - 1 : enemy.health
    //                 }
    //             },
    //             status: hit ? `${targetId} was HIT!` : `${id} missed!`,
    //             turn: id === "p1" ? "p2" : "p1" // Optional: Switch turn after shooting
    //         };
    // }

    case "SHOOT": {
        const { row, col, dir, id } = action.payload;
        const targetId = id === "p1" ? "p2" : "p1";
        const enemy = state.players[targetId];
        
        // Calculate Laser Line (from center of player tile)
        const tileW = 500 / state.board.cols;
        const tileH = 500 / state.board.rows;
        
        // Start point (center of the shooter)
        const startX = (col * tileW) + (tileW / 2);
        const startY = (row * tileH) + (tileH / 2);
        
        // End point (edge of board or where it hits)
        // For now, let's just draw a long line in that direction
        const endX = startX + (dir.col * 500);
        const endY = startY + (dir.row * 500);

        return {
            ...state,
            lastShot: { startX, startY, endX, endY },
            status: `Player ${id} fired!`,
            // ... include your hit detection logic here as well
        };
    }
    default:{
        return state;
    }
}
}