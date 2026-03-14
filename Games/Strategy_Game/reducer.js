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

            const unit=state.units[selectedId];

            const tileKey=`${row}-${col}`;
            const tile=state.tiles[tileKey];

            const terrainCost={
                plain:1,
                forest:2,
                mountain:3,
                river:Infinity,
                wall:Infinity
            };

            const terrain=tile?.terrain || "plain";
            const cost=terrainCost[terrain];

            // impassable terrain
            if(cost===Infinity) return state;

            // not enough movement
            if(unit.remainingMovement < cost) return state;

            const updatedMovement=unit.remainingMovement - cost;
            // const nextPlayer=state.turn.currentPlayer=== "player1"?"player2":"player1";
            const newPosition=`${row}-${col}`;
            const oldPosition = `${unit.row}-${unit.col}`;

            const nextLocations = { ...state.unitLocations };
            delete nextLocations[oldPosition]; // This removes the "ghost"
            nextLocations[newPosition] = selectedId; // Add the new spot
            return{
                ...state,
                units:{
                    ...state.units,
                    [selectedId]:{
                        ...state.units[selectedId],
                        row:row,
                        col:col,
                        remainingMovement:updatedMovement
                    }
                },
                selection:{unitId:null},
                unitLocations:nextLocations,
                ui:{...state.ui,highlightedTiles:[]}
            }
        }
        case "END_TURN":{

            const nextPlayer =
                state.turn.currentPlayer === "player1"
                ? "player2"
                : "player1";

            const resetUnits = Object.fromEntries(
                Object.entries(state.units).map(([id,unit]) => {

                    if(unit.owner === nextPlayer){
                        return [id,{
                            ...unit,
                            remainingMovement: unit.movement
                        }];
                    }

                    return [id,unit];
                })
            );

            return{
                ...state,
                units: resetUnits,
                turn:{
                    ...state.turn,
                    currentPlayer: nextPlayer,
                    number: nextPlayer==="player1"
                        ? state.turn.number + 1
                        : state.turn.number
                }
            }
        }
    default:
            return state;
}}