export function Units(ctx,state,x,y,tileWidth,tileHeight,unitOne,unitTwo
                        ,terrainForest,terrainMountain,terrainPlain,terrainRiver
){
    const img1X=x+(tileWidth*state.units.unit1.col);
    const img1y=y+(tileHeight*state.units.unit1.row);
    ctx.drawImage(unitOne,img1X,img1y,tileWidth,tileHeight);

    const img2X=x+(tileWidth*state.units.unit2.col);
    const img2y=y+(tileHeight*state.units.unit2.row);
    ctx.drawImage(unitTwo,img2X,img2y,tileWidth,tileHeight);

    const img3X=x+(tileWidth*state.tiles.tiles["0-0"].col);
    const img3y=y+(tileHeight*state.tiles.tiles["0-0"].row);
    ctx.drawImage(terrainForest,img3X,img3y,tileWidth,tileHeight/2);

    const img4X=x+(tileWidth*state.tiles.tiles["0-1"].col);
    const img4y=y+(tileHeight*state.tiles.tiles["0-1"].row);
    ctx.drawImage(terrainMountain,img4X,img4y,tileWidth,tileHeight/2);

    const img5X=x+(tileWidth*state.tiles.tiles["2-4"].col);
    const img5y=y+(tileHeight*state.tiles.tiles["2-4"].row);
    ctx.drawImage(terrainRiver,img5X,img5y,tileWidth,tileHeight/2);

    const img6X=x+(tileWidth*state.tiles.tiles["6-5"].col);
    const img6y=y+(tileHeight*state.tiles.tiles["6-5"].row);
    ctx.drawImage(terrainPlain,img6X,img6y,tileWidth,tileHeight/2);

}