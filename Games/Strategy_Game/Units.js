export function Units(ctx,unit,x,y,tileWidth,tileHeight,unitOne,unitTwo){
    const imgX=x+(tileWidth*unit.col);
    const imgy=y+(tileHeight*unit.row);

    const img=unit.owner==="player1"?unitOne:unitTwo;
    ctx.drawImage(img,imgX,imgy,tileWidth,tileHeight);

}


export function Terrains(ctx,tile,x,y,tileWidth,tileHeight,terrainForest,
                terrainMountain,terrainPlain,terrainRiver,terrainWall){
    let img;
    switch(tile.terrain){
        case "forest":
            img=terrainForest;
            break;
        case "plain":
            img=terrainPlain;
            break;  
        case "mountain":
            img=terrainMountain;
            break;
        case "river":
            img=terrainRiver; 
            break;
        case "wall":
            img=terrainWall;
            break;
    }
    const imgX=x+(tileWidth*tile.col);
    const imgy=y+(tileHeight*tile.row);
    ctx.drawImage(img,imgX,imgy,tileWidth,tileHeight/2);

}