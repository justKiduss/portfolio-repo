import { Grid } from "./Grid.js"
import { state } from "./state.js";
import { Units } from "./Units.js";
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
canvas.width=600;
canvas.height=600;

const unitOne=new Image();
unitOne.src="./asset/player1.jpg";
const unitTwo=new Image();
unitTwo.src="./asset/player2.jpg";

let loaded=0;
function startGame(){
    loaded++;
    if(loaded>=2){
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
        Units(ctx,state,this.x,this.y,this.tileWidth,this.tileHeight,unitOne,unitTwo);
    }
}
const boardHeight=600;
const boardWidth=600;
const x=canvas.width/2 - boardWidth/2;
const y=canvas.height/2 -boardHeight/2;
const tileWidth=boardWidth/state.grid.cols;
const tileHeight=boardHeight/state.grid.rows;
const game=new Game(boardHeight,boardWidth,x,y,tileWidth,tileHeight);

function render(){
    game.drawBoard(ctx);
    game.drawGrid(ctx,state);
    game.drawUnits(ctx,state);
}

console.log(ctx);
console.log(state);
