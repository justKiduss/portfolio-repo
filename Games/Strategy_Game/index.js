const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
canvas.width=500;
canvas.height=500;

class Game{
    constructor(boardHeight,boardWidth,x,y){
        this.boardHeight=boardHeight;
        this.boardWidth=boardWidth;
        this.x=x;
        this.y=y;
    }

    drawBoard(ctx){
        ctx.fillStyle="black";
        ctx.fillRect(x,y,boardWidth,boardHeight);
    }
}
const boardHeight=500;
const boardWidth=500;
const x=canvas.width/2 - boardWidth/2;
console.log(x);
const y=canvas.height/2 -boardHeight/2;
console.log(y);
const game=new Game(boardHeight,boardWidth,x,y);
game.drawBoard(ctx);
console.log(ctx);
console.log("haa");
