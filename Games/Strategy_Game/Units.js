export function Units(ctx,state,x,y,tileWidth,tileHeight,unitOne,unitTwo){
    const img1X=x+(tileWidth*state.units.unit1.col);
    const img1y=y+(tileHeight*state.units.unit1.row);
    ctx.drawImage(unitOne,img1X,img1y,tileWidth,tileHeight);

    const img2X=x+(tileWidth*state.units.unit2.col);
    const img2y=y+(tileHeight*state.units.unit2.col);
    ctx.drawImage(unitTwo,img2X,img2y,tileWidth,tileHeight);
}