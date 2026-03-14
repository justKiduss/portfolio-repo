export function Units(ctx,unit,x,y,tileWidth,tileHeight,unitOne,unitTwo){
    const imgX=x+(tileWidth*unit.col);
    const imgy=y+(tileHeight*unit.row);

    const img=unit.owner==="player1"?unitOne:unitTwo;
    ctx.drawImage(img,imgX,imgy,tileWidth,tileHeight);

}
export const Stat=(getState)=>{
        const state=getState();
        const status=state.units[state.selection.unitId];
        if(!status) return;
        const ul=document.getElementById("unit-stat");
        ul.innerHTML="";

        Object.entries(status).forEach(([key,value])=>{
                const li=document.createElement("li");
                li.textContent=`${key.toUpperCase()}: ${value}`;
                ul.appendChild(li);
        })
}
