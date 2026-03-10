const Matrix=[
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
]
export function Grid(ctx,state,x,y,tileWidth,tileHeight){
    for(let row=0;row<state.grid.rows;row++){
        for(let col=0;col<state.grid.cols;col++){
            const gridX= x+(tileWidth*col);
            const gridY=y+(tileHeight*row);
            ctx.fillStyle=Matrix[row][col]>0?"black":"red";
            ctx.fillRect(gridX,gridY,tileWidth,tileHeight);
        }
    }
}