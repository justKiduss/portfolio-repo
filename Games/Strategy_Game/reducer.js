export function reducer(state=getState(),action){
    switch(action.type){
        case "POSSIBLETILES":{
            return{
                ...state,
                ui:{
                ...state.ui,
                highlightedTiles:action.payload
                }
            }
        }
        case "SELECTION":{
            return {
                ...state,
                selection:{
                    ...state.selection,
                    unitId:action.payload
                }
            }
        }
        case "MOVEMENT":{
            const {row,col}=action.payload;
            const selectedId=state.selection.unitId;

            if (!selectedId) return state;
            return{
                ...state,
                units:{
                    ...state.units,
                    [selectedId]:{
                        ...state.units[selectedId],
                        row:row,
                        col:col
                    }
                },
                selection:{unitId:null},
                ui:{...state.ui,highlightedTiles:[]},
                turn:{
                    ...state.turn,
                    currentPlayer:state.turn.currentPlayer=== "player1"?"player2":"player1"
                }
            }
        }
        default:
            return state;
    }
}