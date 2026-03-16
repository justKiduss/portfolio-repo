import { Grid } from "./Grid.js"
import { inputs } from "./inputs.js";
import { getState, state } from "./state.js";
import { getVisibleTiles, Units} from "./Units.js";
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
canvas.width=600;
canvas.height=600;

const explosion={
    row:6,
    col:5,
    frame:0
}

const unitOne=new Image();
unitOne.src="./asset/unit.png";
const unitTwo=new Image();
unitTwo.src="./asset/unit.png";

let loaded=0;
export function startGame(){
    loaded++;
    if(loaded>=2 ){
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
        const visibleTiles = getVisibleTiles(state);
        for(let unitId in state.units){
            let unit=state.units[unitId];
            const tileKey = `${unit.row}-${unit.col}`;
            if (unit.owner === state.turn.currentPlayer || visibleTiles.has(tileKey)) {
                Units(ctx,unit,this.x,this.y,this.tileWidth,this.tileHeight,
                    unitOne,unitTwo);
            }
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
    drawExplosion(ctx,state){
        const explosion = state.ui.explosion
        if(!explosion) return      
        const x = game.x + explosion.col * game.tileWidth
        const y = game.y + explosion.row * game.tileHeight 
        ctx.fillStyle = "orange"
        ctx.beginPath()
        ctx.arc(
        x + game.tileWidth/2,
        y + game.tileHeight/2,
        10 + explosion.frame*3,
        0,
        Math.PI*2
        )
        ctx.fill() 
    }

    drawFlash(ctx,state){

        const flash = state.ui.flash
        if(!flash) return

        const x = this.x + flash.col * this.tileWidth
        const y = this.y + flash.row * this.tileHeight

        ctx.fillStyle="black"

        ctx.beginPath()
        ctx.arc(
            x + this.tileWidth/2,
            y + this.tileHeight/2,
            6 + flash.frame*2,
            0,
            Math.PI*2
        )

        ctx.fill()
    }
    drawFog(ctx, state) {
        const visibleTiles = getVisibleTiles(state);

        for (let r = 0; r < state.grid.rows; r++) {
            for (let c = 0; c < state.grid.cols; c++) {
                const tileKey = `${r}-${c}`;
                
                if (!visibleTiles.has(tileKey)) {
                    const fX = this.x + (c * this.tileWidth);
                    const fY = this.y + (r * this.tileHeight);

                    // Draw a dark overlay on hidden tiles
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; 
                    ctx.fillRect(fX, fY, this.tileWidth, this.tileHeight);
                }
            }
        }
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
    game.drawFog(ctx,state);
    game.drawHighlightedTiles(ctx,state);
    
    game.drawFlash(ctx,state);
    game.drawExplosion(ctx,state);
    const explosion = state.ui.explosion;
    const flash = state.ui.flash;

    if(flash){
        flash.frame++
        if(flash.frame > 3){
            state.ui.flash = null
        }
    }
    if(explosion){
        explosion.frame++

        if(explosion.frame > 6){
            state.ui.explosion = null
        }
    }
}



