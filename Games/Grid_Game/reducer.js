export function reducer(state,action){
    switch(action.type){
    case "MOVE_UP":{
        const {row,col,id}=action.payload;
            return{
                ...state,
                players: {
                    ...state.players,
                    [id]: {
                        ...state.players.p1,
                        row: row,
                        col: col,
                    },

                },
                status:`player ${id} is playing`
            }
    }
    case "MOVE_DOWN":{
        const {row,col}=action.payload;
            return{
                ...state,
                players: {
                    ...state.players,
                    p1: {
                        ...state.players.p1,
                        row: row,
                        col: col,
                    },
                }
            }
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