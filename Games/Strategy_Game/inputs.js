import { dispatch } from "./dispatch.js";
import { getState } from "./state.js";

export function inputs(canvas,x,y,boardWidth,boardHeight,tileHeight,tileWidth,render){
    //end turn

    document.addEventListener("keydown",(e)=>{
        if(e.key === "e"){
            dispatch({type:"END_TURN"},render);
        }
    });
    // MOVEMENT
    canvas.addEventListener("click",(e)=>{
        const rect=canvas.getBoundingClientRect();
        const mouseX=e.clientX - rect.left;
        const mouseY=e.clientY - rect.top;
        if (
                mouseX >= x && mouseX <= x + boardWidth &&
                mouseY >= y && mouseY <= y + boardHeight
            ){
                const col=Math.min(getState().grid.cols-1,Math.floor((mouseX-x)/tileWidth));
                const row=Math.min(getState().grid.rows-1,Math.floor((mouseY-y)/tileHeight));

                    const state = getState();
                    const units = state.units;
                    let clickedUnitId = null;

                    // 1. Find if a unit exists at the clicked coordinate
                    for (let id in units) {
                        if (units[id].row === row && units[id].col === col) {
                            clickedUnitId = id;
                            break;
                        }
                    }

                    // 2. DECISION LOGIC: Are we Selecting or Moving?
                    if (clickedUnitId) {
                        // ACTION: SELECTING A UNIT
                        const clickedUnit = units[clickedUnitId];
                        
                        if (clickedUnit.owner === state.turn.currentPlayer) {
                            dispatch({ type: "SELECTION", payload: clickedUnitId }, render);
                            drawHighlightedTiles(row, col, render,getState);
                        } else {
                            console.log("Not your unit!");
                        }
                        } else if (state.selection.unitId) {
                            // ACTION: MOVING THE ALREADY SELECTED UNIT
                            const selectedUnit = units[state.selection.unitId];
                            const rowDiff = Math.abs(selectedUnit.row - row);
                            const colDiff = Math.abs(selectedUnit.col - col);

                            // Only move if it's 1 tile away (or use movement range logic)
                            if (rowDiff + colDiff === 1) {
                                move(row, col,rowDiff,colDiff,render,state);
                            }
                        }  
            }
    })

function move(row,col,rowDiff,colDiff,render,state){
    if(rowDiff+colDiff !== 1) return;
    const targetTileKey=`${row}-${col}`;
    const targetTile=state.tiles[targetTileKey];

    if(targetTile && targetTile.terrain === "wall"){
        console.log("Movement Bloacked !!!it's a wall");
        return
    }

    for(let id in state.units){
        const unit=state.units[id];
        if(unit.row===row && unit.col===col){
            console.log("Movement Blocked!!! Occupied by another player");
            return;
        }
    }
    dispatch({
        type:"MOVEMENT",
        payload:{row,col}
    },render)

}

    addEventListener("keydown",(e)=>{
    const state=getState(); 
    const shooterId = state.selection.unitId; 
    if(!shooterId) return;
    const shooter=state.units[shooterId];
    let enemy = null;
    
    for (const unit of Object.values(state.units)) {
        if (unit.id !== shooterId) {
            enemy = unit; 
            break;
        }
    }
    if(!enemy) return;

    let direction={row:0,col:0};
    
    switch(e.key){
        case "ArrowUp": direction = { row: -1, col: 0 }; break;
        case "ArrowDown": direction = { row: 1, col: 0 }; break;
        case "ArrowLeft": direction = { row: 0, col: -1 }; break;
        case "ArrowRight": direction = { row: 0, col: 1 }; break;
        default: return;
    }
    const dist=Math.abs(enemy.row - shooter.row)+Math.abs(enemy.col-shooter.col);
    if(dist <= shooter.range){
    dispatch({
        type:"ATTACK",
        payload:{
            row:shooter.row,
            col:shooter.col,
            enemy:enemy.id,
            dir:direction,
            shooter:shooterId,
        }
    },render)
        }else{
            console.log("out of range");
        }
})

function drawHighlightedTiles(row,col,render,getState){
    const direction =[
        {r:-1,c:0},
        {r:1,c:0},
        {r:0,c:-1},
        {r:0,c:1}
    ]
    const possibleTile=[];

    direction.forEach(dir=>{
    const targetRow=row+dir.r;
    const targetCol=col+dir.c;
        if (targetRow >= 0 && targetRow < getState().grid.rows &&
            targetCol >= 0 && targetCol < getState().grid.cols) {
                possibleTile.push(`${targetRow}-${targetCol}`)
            }
    })
            dispatch({
                type:"POSSIBLETILES",
                payload:possibleTile
            },render)
}
}


