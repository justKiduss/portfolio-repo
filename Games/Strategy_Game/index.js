import { Grid } from "./Grid.js"
import { inputs } from "./inputs.js";
import { state } from "./state.js";
import { Units,Terrains} from "./Units.js";
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
canvas.width=600;
canvas.height=600;

const unitOne=new Image();
unitOne.src="./asset/player1.jpg";
const unitTwo=new Image();
unitTwo.src="./asset/player2.jpg";
const terrainPlain=new Image();
terrainPlain.src="./asset/plain.png";
const terrainMountain=new Image();
terrainMountain.src="./asset/mountain.png";
const terrainRiver=new Image();
terrainRiver.src="./asset/river.png";
const terrainForest=new Image();
terrainForest.src="./asset/forest.png";

let loaded=0;
function startGame(){
    loaded++;
    if(loaded>=6){
        inputs(canvas,x,y,boardWidth,boardHeight,tileHeight,tileWidth);
        render();

    }
}
unitOne.onload=startGame;
unitTwo.onload=startGame;
terrainForest.onload=startGame;
terrainMountain.onload=startGame;
terrainPlain.onload=startGame;
terrainRiver.onload=startGame;

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
    drawTerrains(ctx,state){
        for(let terrainId in state.tiles){
            let tile=state.tiles[terrainId];
            Terrains(ctx,tile,this.x,this.y,this.tileWidth,this.tileHeight,
                terrainForest,terrainMountain,terrainPlain,terrainRiver);
        }
    }
    drawHighlightedTiles(){
        for(let tile in state.ui.highlightedTiles){
            highLight(ctx,state,tile);
        }
    }
}
const boardHeight=600;
const boardWidth=600;
const x=canvas.width/2 - boardWidth/2;
const y=canvas.height/2 - boardHeight/2;
const tileWidth=boardWidth/state.grid.cols;
const tileHeight=boardHeight/state.grid.rows;
const game=new Game(boardHeight,boardWidth,x,y,tileWidth,tileHeight);

function render(){
    game.drawBoard(ctx);
    game.drawGrid(ctx,state);
    game.drawUnits(ctx,state);
    game.drawTerrains(ctx,state);
}

