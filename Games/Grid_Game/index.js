import { dispatch } from "./dispatch.js";
import { state } from "./state.js";
const canvas=document.querySelector("canvas");

const ctx=canvas.getContext('2d');

canvas.width=innerWidth;
canvas.height=innerHeight;

const matrix=[
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
]


const player1=new Image();
player1.src="./asset/player1.jpg";
const player2=new Image();
player2.src="./asset/player2.jpg";

let loaded=0;
function startGame(){
    loaded++;
    if(loaded==2){
        init();
    }
}

player1.onload=startGame;
player2.onload=startGame;
let board;
function init(){
    class Board{

        constructor(boardHeight,boardwidth,x,y){
            this.boardHeight=boardHeight;
            this.boardwidth=boardwidth;
            this.x=x;
            this.y=y;
        }

        drawBoard(ctx){
            ctx.fillStyle="black";
            ctx.fillRect(this.x,this.y,this.boardwidth,this.boardHeight);
        }

        drawGrid(matrix,state,ctx){
            const tileWidth=this.boardwidth/state.board.rows;
            const tileHeight=this.boardHeight/state.board.cols;
            for(let row=0;row<state.board.rows;row++){
                for(let col=0;col<state.board.cols;col++){
                    ctx.fillStyle=matrix[row][col]>0?"red":"black";

                    const tilex=this.x+(col*tileWidth);
                    const tiley=this.y+(row*tileHeight);

                    ctx.fillRect(tilex,tiley,tileWidth,tileHeight);
                }
            }
        }

        drawPlayer(state,ctx){
            const tileWidth=this.boardwidth/state.board.rows;
            const tileHeight=this.boardHeight/state.board.cols;
            const p1x=this.x+(state.players.p1.col*tileWidth);
            const p1y=this.y+(state.players.p1.row*tileHeight);
            const p2x=this.x+(state.players.p2.col*tileWidth);
            const p2y=this.y+(state.players.p2.row*tileHeight);
            ctx.drawImage(player1,p1x,p1y,tileWidth,tileHeight);
            ctx.drawImage(player2,p2x,p2y,tileWidth,tileHeight);
        }

    }
 
    const boardwidth=500;
    const boardHeight=500;
    const x=canvas.width/2-boardwidth/2;
    const y=canvas.height/2-boardHeight/2;
    const tileWidth=boardwidth/state.board.rows;
    const tileHeight=boardHeight/state.board.cols;
    board=new Board(boardHeight,boardwidth,x,y);
    board.drawBoard(ctx);
    board.drawGrid(matrix,state,ctx);
    board.drawPlayer(state,ctx);
    console.log(ctx);

    canvas.addEventListener("click",(e)=>{
        const mouseX=e.clientX-canvas.offsetLeft;
        const mouseY=e.clientY-canvas.offsetTop;

         if (
            mouseX >= x &&
            mouseX <= x + boardwidth &&
            mouseY >= y &&
            mouseY <= y + boardHeight
        ){
            const col = Math.floor((mouseX - x) / tileWidth);
            const row = Math.floor((mouseY - y) / tileHeight);
            console.log(row,col)
              dispatch({
                type:"MOVE_UP",
                payload:{
                    row:row,
                    col:col
                },
            },render
        )
        }

    
      
    })

}

function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    board.drawBoard(ctx)
    board.drawGrid(matrix,state,ctx)
    board.drawPlayer(state,ctx)
}


