import { Grid } from "./Grid.js"
import { inputs } from "./inputs.js";
import { getState } from "./state.js";
import { Units} from "./Units.js";
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
canvas.width=600;
canvas.height=600;


const unitOne=new Image();
unitOne.src="./asset/unit.png";
const unitTwo=new Image();
unitTwo.src="./asset/unit.png";

let loaded=0;
export function startGame(){
    loaded++;
    if(loaded>=6 ){
        inputs(canvas,x,y,boardWidth,boardHeight,tileHeight,tileWidth,render);
        render();
    }
}
unitOne.onload=startGame;
unitTwo.onload=startGame;
class Game{
    constructor(boardHeight,boardWidth,x,y,tileWidth,tileHeight){
        this.boardHeight=boardHeight;
        this.boardWidth=boardWidth;
        this.x=x;
        this.y=y;
        this.tileWidth=tileWidth;
        this.tileHeight=tileHeight;
    }

    drawBoard(ctx){
        ctx.fillStyle="black";
        ctx.fillRect(this.x,this.y,this.boardWidth,this.boardHeight);
    }
    drawGrid(ctx,state){
        Grid(ctx,state,this.x,this.y,this.tileWidth,this.tileHeight);
    }
    drawUnits(ctx,state){
        for(let unitId in state.units){
            let unit=state.units[unitId];
            Units(ctx,unit,this.x,this.y,this.tileWidth,this.tileHeight,
                unitOne,unitTwo);
        }
    }
    drawHighlightedTiles(ctx,state){
        state.ui.highlightedTiles.forEach(tileKey=>{
            const [r, c] = tileKey.split("-").map(Number);
            const hX = this.x + (c * this.tileWidth);
            const hY = this.y + (r * this.tileHeight);

            ctx.fillStyle = "#ffffff33";
            ctx.fillRect(hX, hY, this.tileWidth, this.tileHeight);
        })
    }
}
const boardHeight=600;
const boardWidth=600;
const x=canvas.width/2 - boardWidth/2;
const y=canvas.height/2 - boardHeight/2;
const tileWidth=boardWidth/getState().grid.cols;
const tileHeight=boardHeight/getState().grid.rows;
const game=new Game(boardHeight,boardWidth,x,y,tileWidth,tileHeight);

function render(){
    const state=getState();
    game.drawBoard(ctx);
    game.drawGrid(ctx,state);
    game.drawUnits(ctx,state);
    game.drawHighlightedTiles(ctx,state);
}

