export function Units(ctx,unit,x,y,tileWidth,tileHeight,unitOne,unitTwo){
    const imgX=x+(tileWidth*unit.col);
    const imgY=y+(tileHeight*unit.row);

    const img=unit.owner==="player1"?unitOne:unitTwo;
    // Add a colored glow or ring under the unit to show ownership
    ctx.fillStyle = unit.owner === "player1" ? "rgba(0, 0, 255, 0.3)" : "rgba(255, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(imgX + tileWidth/2, imgY + tileHeight/2, tileWidth/3, tileHeight/4, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.drawImage(img,imgX,imgY,tileWidth,tileHeight);

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


export function getVisibleTiles(state) {
    const visible = new Set();
    const currentPlayer = state.turn.currentPlayer;
    const visionRange = 3; // You can also use unit.range or add unit.vision

    Object.values(state.units).forEach(unit => {
        if (unit.owner === currentPlayer) {
            for (let r = unit.row - visionRange; r <= unit.row + visionRange; r++) {
                for (let c = unit.col - visionRange; c <= unit.col + visionRange; c++) {
                    const dist = Math.abs(r - unit.row) + Math.abs(c - unit.col);
                    if (dist <= visionRange) {
                        visible.add(`${r}-${c}`);
                    }
                }
            }
        }
    });
    return visible;
}


