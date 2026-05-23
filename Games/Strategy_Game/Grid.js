import { startGame } from "./index.js";
const Matrix=[
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', 'P', 'F', 'F', 'F', 'P', 'P', 'P', 'P', 'P'],
    ['P', 'P', 'F', 'F', 'F', 'P', 'M', 'M', 'M', 'P'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'M', 'M', 'M', 'P'],
    ['P', 'R', 'R', 'R', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', 'R', 'R', 'R', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'M', 'M', 'M', 'P'],
    ['P', 'P', 'F', 'F', 'F', 'P', 'M', 'M', 'M', 'P'],
    ['P', 'P', 'F', 'F', 'F', 'P', 'P', 'P', 'P', 'P'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
]
const sprites = {
    P: new Image(),
    F: new Image(),
    R: new Image(),
    M: new Image()
};

sprites.P.onload = startGame;
sprites.F.onload = startGame;
sprites.R.onload = startGame;
sprites.M.onload = startGame;

sprites.P.src = 'asset/grass2.png';
sprites.F.src = 'asset/forest2.png';
sprites.R.src = 'asset/river2.png';
sprites.M.src = 'asset/mountain2.png';

export function Grid(ctx,state,x,y,tileWidth,tileHeight){
    for(let row=0;row<state.grid.rows;row++){
        for(let col=0;col<state.grid.cols;col++){
            const gridX= x+(tileWidth*col);
            const gridY=y+(tileHeight*row);

            const terrainType = Matrix[row][col];
            const img = sprites[terrainType];
            ctx.drawImage(img, gridX, gridY, tileWidth, tileHeight);

            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.strokeRect(gridX, gridY, tileWidth, tileHeight);
        }
    }
}

