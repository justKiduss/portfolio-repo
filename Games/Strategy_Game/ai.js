// for each enemy unit
//     find closest player unit
//     move toward player
//     attack if within range

import { getState } from "./state.js";
import { dispatch } from "./dispatch.js";

export function ai(render) {
    const state = getState();
    const currentPlayer = state.turn.currentPlayer;
    const aiUnits = Object.values(state.units).filter(u => u.owner === currentPlayer);
    const enemyUnits = Object.values(state.units).filter(u => u.owner !== currentPlayer);

    if (aiUnits.length === 0 || enemyUnits.length === 0) return;

    aiUnits.forEach((activeAiUnit, index) => {
        // Stagger actions so the player can watch the AI units move one by one
        setTimeout(() => {
            const freshState = getState(); // Always get the latest state inside the timeout
            let nearestEnemy = null;
            let minDistance = Infinity;

            enemyUnits.forEach(enemy => {
                const dist = Math.abs(activeAiUnit.row - enemy.row) + Math.abs(activeAiUnit.col - enemy.col);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestEnemy = enemy;
                }
            });

            if (nearestEnemy) {
                if (minDistance > activeAiUnit.range) {
                    aiMove(activeAiUnit, nearestEnemy, freshState, render);
                } else {
                    aiAttack(activeAiUnit, nearestEnemy, render);
                }
            }

            // Only end the turn after the VERY LAST AI unit has finished
            if (index === aiUnits.length - 1) {
                setTimeout(() => dispatch({ type: "END_TURN" }, render), 600);
            }
        }, index * 600); 
    });
}

function aiAttack(attacker, target, render) {
    // Calculate actual direction so the reducer registers the hit
    const dir = {
        row: target.row > attacker.row ? 1 : (target.row < attacker.row ? -1 : 0),
        col: target.col > attacker.col ? 1 : (target.col < attacker.col ? -1 : 0)
    };

    dispatch({ type: "SELECTION", payload: attacker.id }, render);
    dispatch({
        type: "ATTACK",
        payload: {
            row: attacker.row,
            col: attacker.col,
            enemy: target.id,
            shooter: attacker.id,
            dir: dir 
        }
    }, render);
}

export function aiMove(myUnit, enemyUnit, state, render) {
    const rowDiff = enemyUnit.row - myUnit.row;
    const colDiff = enemyUnit.col - myUnit.col;

    let targetRow = myUnit.row;
    let targetCol = myUnit.col;

    // 1. Determine the best direction to close the gap
    // We prioritize the larger distance first
    if (Math.abs(rowDiff) > Math.abs(colDiff)) {
        targetRow += rowDiff > 0 ? 1 : -1;
    } else if (colDiff !== 0) {
        targetCol += colDiff > 0 ? 1 : -1;
    } else if (rowDiff !== 0) {
        // Fallback if colDiff was 0
        targetRow += rowDiff > 0 ? 1 : -1;
    }

    // 2. Check for Obstacles (Walls and other Units)
    const targetTileKey = `${targetRow}-${targetCol}`;
    const isWall = state.tiles[targetTileKey]?.terrain === "wall";
    const isOccupied = Object.values(state.units).some(
        u => u.row === targetRow && u.col === targetCol
    );

    if (isWall || isOccupied) {
        console.log("AI movement blocked by obstacle");
        return; 
    }

    // 3. Execute the move via Dispatch
    // We first select the unit, then move it
    dispatch({ type: "SELECTION", payload: myUnit.id }, render);
    
    dispatch({
        type: "MOVEMENT",
        payload: { row: targetRow, col: targetCol }
    }, render);
}