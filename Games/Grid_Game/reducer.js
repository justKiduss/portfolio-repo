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
    case "SHOOT":{

    }
    default:{
        return state;
    }
}
}