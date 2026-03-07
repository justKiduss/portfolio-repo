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

        

    case "SHOOT": {
            const { row, col, dir, id } = action.payload;
            const targetId = id === "p1" ? "p2" : "p1";
            const enemy = state.players[targetId];

            let hit = false;
            // Loop through the grid in the chosen direction
            for (let i = 1; i < 8; i++) {
                const checkRow = row + (dir.row * i);
                const checkCol = col + (dir.col * i);

                // Stop if we go off the board
                if (checkRow < 0 || checkRow >= 8 || checkCol < 0 || checkCol >= 8) break;

                if (checkRow === enemy.row && checkCol === enemy.col) {
                    hit = true;
                    break;
                }
            }

            return {
                ...state,
                players: {
                    ...state.players,
                    [targetId]: {
                        ...enemy,
                        health: hit ? enemy.health - 1 : enemy.health
                    }
                },
                status: hit ? `${targetId} was HIT!` : `${id} missed!`,
                turn: id === "p1" ? "p2" : "p1" // Optional: Switch turn after shooting
            };
    }

    default:{
        return state;
    }
}
}