// for each enemy unit
//     find closest player unit
//     move toward player
//     attack if within range

import { getState } from "./state"
export function ai(){
    const state=getState();
    const units=state.units;
    const currentPlayer=state.turn.currentPlayer;

    const aiUnits=Object.values(units).filter(
        unit=>unit.owner===currentPlayer
    );

    const enemyUnits=Object.values(units).filter(
        unit=>unit.owner!== currentPlayer
    );


    if(aiUnits.length>0 && enemyUnits>0){
        const activeAiUnit=aiUnits[0];
        let nearestEnemy=null;
        let minDistance=Infinity;

        enemyUnits.forEach(enemy=>{
            const dist=Math.abs(activeAiUnit.row-enemyUnits.row) +
                Math.abs(activeAiUnit.col-enemyUnits.col)
            if(dist<minDistance){
                minDistance=dist;
                nearestEnemy=enemy;
            }
        })

        console.log(`Nearest enemy to ${activeAiUnit.id} is at ${nearestEnemy.row},${nearestEnemy.col}`)
    }
    






    for(let r=units.row-units.row;r<state.grid.rows;r++){
        for(let c=units.col-units.col;c<state.grid.cols;c++){
            let key=`${r}-${c}`;
            if(key in state.unitLocations){
                if()
                enemyUnits.push(key);
            }
        }
    }

    for(let id in units){
        const unit=units[id];
        if(unit.owner===enemy){
            
        }
    }


}