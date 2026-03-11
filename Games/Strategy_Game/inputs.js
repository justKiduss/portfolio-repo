import { dispatch } from "../Grid_Game/dispatch.js";
import { getState } from "./state.js";

    const state=getState();
    const unit=state.units;
export function inputs(canvas,x,y,boardWidth,boardHeight,tileHeight,tileWidth){
    // MOVEMENT

    canvas.addEventListener("click",(e)=>{

        const rect=canvas.getBoundingClientRect();
        const mouseX=e.clientX - rect.left;
        const mouseY=e.clientY - rect.top;
        if (
                mouseX >= x && mouseX <= x + boardWidth &&
                mouseY >= y && mouseY <= y + boardHeight
            ){
                const col=Math.min(state.grid.cols-1,Math.floor((mouseX-x)/tileWidth));
                const row=Math.min(state.grid.rows-1,Math.floor((mouseY-y)/tileHeight));
                const rowDiff=Math.abs(unit.unit1.row-row);
                const colDiff=Math.abs(unit.unit1.col-col);
                if(rowDiff || colDiff === 0){
                    drawHighlightedTiles(row,col);
                }
                move(row,col);
            }
    })

}

function move(row,col){
    if(rowDiff+colDiff !== 1) return;

    const currentPlayer=state.turn.currentPlayer;
    // state.turn.currentPlayer pass to reducer

}
function drawHighlightedTiles(row,col){
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
        if (targetRow >= 0 && targetRow < state.grid.rows &&
            targetCol >= 0 && targetCol < state.grid.cols) {
                possibleTile.push(`${targetRow}-${targetCol}`)
            }
            dispatch({
                type:"POSSIBLETILES",
                payload:possibleTile
            })
            console.log(possibleTile);
    })
}