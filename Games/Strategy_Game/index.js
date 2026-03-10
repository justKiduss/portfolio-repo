import { Grid } from "./Grid.js"
import { state } from "./state.js";
import { Units } from "./Units.js";
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
canvas.width=600;
canvas.height=600;

class Game{
    constructor(boardHeight,boardWidth,x,y){
        this.boardHeight=boardHeight;
        this.boardWidth=boardWidth;
        this.x=x;
        this.y=y;
    }

    drawBoard(ctx){
        ctx.fillStyle="black";
        ctx.fillRect(this.x,this.y,this.boardWidth,this.boardHeight);
    }
    drawGrid(ctx,state){
        Grid(ctx,state,this.x,this.y,this.boardWidth,this.boardHeight);
    }
    drawUnits(ctx,state){
        Units(ctx,state);
    }
}
const boardHeight=600;
const boardWidth=600;
const x=canvas.width/2 - boardWidth/2;
console.log(x);
const y=canvas.height/2 -boardHeight/2;
console.log(y);
const game=new Game(boardHeight,boardWidth,x,y);
game.drawBoard(ctx);
game.drawGrid(ctx,state);
game.drawUnits(ctx,state);
console.log(ctx);
console.log("haa");
