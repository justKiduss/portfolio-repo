import { dispatch } from "./dispatch.js";
import { getState } from "./state.js";
const h3=document.querySelector("h3");
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext('2d');

canvas.width=500;
canvas.height=500;

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
let board,boardwidth,boardHeight,tileWidth,tileHeight,x,y;
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
            const tileWidth=this.boardwidth/state.board.cols;
            const tileHeight=this.boardHeight/state.board.rows;
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
            const tileWidth=this.boardwidth/state.board.cols;
            const tileHeight=this.boardHeight/state.board.rows;
            const p1x=this.x+(state.players.p1.col*tileWidth);
            const p1y=this.y+(state.players.p1.row*tileHeight);
            const p2x=this.x+(state.players.p2.col*tileWidth);
            const p2y=this.y+(state.players.p2.row*tileHeight);
            ctx.drawImage(player1,p1x,p1y,tileWidth,tileHeight);
            ctx.drawImage(player2,p2x,p2y,tileWidth,tileHeight);
        }
    }
    
    boardwidth=500;
    boardHeight=500;
    x=canvas.width/2-boardwidth/2;
    y=canvas.height/2-boardHeight/2;
    tileWidth=boardwidth/getState().board.cols;
    tileHeight=boardHeight/getState().board.rows;
    board=new Board(boardHeight,boardwidth,x,y);

    inputs()
    render();
    console.log(ctx);


}

function inputs(){
            let turn=getState().turn;
            canvas.addEventListener("click",(e)=>{
            const rect=canvas.getBoundingClientRect();
            const mouseX=e.clientX-rect.left;
            const mouseY=e.clientY-rect.top;
            if (
                mouseX >= x && mouseX <= x + boardwidth &&
                mouseY >= y && mouseY <= y + boardHeight
            ){
                const col = Math.min(getState().board.cols - 1,Math.floor((mouseX - x) / tileWidth));
                const row = Math.min(getState().board.rows - 1,Math.floor((mouseY - y) / tileHeight));

                const player=getState().players[turn];
                console.log(player)
                const rowDiff=Math.abs(row - player.row);
                const colDiff=Math.abs(col - player.col);
                if(rowDiff + colDiff !== 1) return; 
                    dispatch({
                        type:"MOVEMENT",
                        payload:{row,col,id:turn},
                    },render)
                    turn=turn==="p1"?"p2":"p1";
                console.log(getState());
            }
        })
        addEventListener("keydown",(e)=>{
            const player=getState().players[turn];
            let direction={row:0,col:0};

            switch(e.key){
                case "ArrowUp":    direction = { row: -1, col: 0 }; break;
                case "ArrowDown":  direction = { row: 1, col: 0 }; break;
                case "ArrowLeft":  direction = { row: 0, col: -1 }; break;
                case "ArrowRight": direction = { row: 0, col: 1 }; break;
                default: return; // Exit if other keys are pressed 
            }
        })
}
function render(){
    const state=getState();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.drawBoard(ctx);
    board.drawGrid(matrix,state,ctx);
    board.drawPlayer(state,ctx);
    h3.textContent=state.status;

}

