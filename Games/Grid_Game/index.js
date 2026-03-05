const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const player1Image=new Image();
const player2Image=new Image();

let loaded=0;
function startGame(){
    loaded++;
    if(loaded === 2){
        init();
    }
}

player1Image.onload = startGame;
player2Image.onload = startGame;


player1Image.src="./asset/player1.jpg";
player2Image.src="./asset/player2.jpg";



function init(){

const players=[
    {id:"p1",row:0,col:0,image:player1Image},
    {id:"p2",row:7,col:7,image:player2Image}
]

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

class Grid{
    constructor(matrix,size){
        this.matrix=matrix;
        this.rows=matrix.length;
        this.cols=matrix[0].length;
        this.size=size;
        this.cellSize=size/this.rows;
    }
    draw(x,y){
        for(let row=0;row<this.rows;row++){
            for(let col=0;col<this.cols;col++){
                const cellX = x + (col * this.cellSize);
                const cellY = y + (row * this.cellSize);


                ctx.fillStyle=this.matrix[row][col]>0? "red":"black";
                ctx.fillRect(cellX,cellY,this.cellSize,this.cellSize);
            }
        }
    }
}

function drawPlayers(x,y,cellSize){
    players.forEach(player=>{
        const px=x+ (player.col*cellSize);
        const py=y+ (player.row*cellSize);

        ctx.drawImage(player.image,px,py,cellSize,cellSize)
    })
}

const x=innerWidth/2-(500/2);
const y=innerHeight/2-(500/2);

const grid=new Grid(matrix,500);

grid.draw(x,y);
drawPlayers(x,y,grid.cellSize)
}
