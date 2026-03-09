# Grid Duel

A turn-based two-player grid shooting game built with Vanilla JavaScript and HTML5 Canvas.

The project demonstrates a Redux-style state architecture implemented manually without external libraries.

---

# Gameplay

Two players compete on an 8x8 grid.

Player 1 starts at the top-left corner.
Player 2 starts at the bottom-right corner.

Each player can:

• Move one tile per turn  
• Shoot a laser in four directions  

Controls alternate between players automatically.

---

# Controls

Movement

Mouse click on a neighboring tile.

Only one-tile movement is allowed.

Valid moves:

Up  
Down  
Left  
Right

Invalid moves:

Diagonal  
Multiple tiles  

---

# Shooting

Use arrow keys.

ArrowUp  
ArrowDown  
ArrowLeft  
ArrowRight  

The player fires a laser across the entire board.

---

# Hit Rules

A hit occurs if the opponent is aligned with the shooter.

Vertical hit

Same column  
Enemy above or below

Horizontal hit

Same row  
Enemy left or right

---

# Damage System

Players start with:

Health = 3

When hit:

Enemy health decreases by 1.

If hit:

• enemy teleports back to starting tile  
• shooter teleports back to starting tile  

If miss:

• no teleport  
• no damage  

---

# Game Over

When a player's health reaches zero:

The opponent wins.

The game displays a victory message overlay.

---

# Architecture

The game uses a unidirectional state system similar to Redux.


User Input
↓
dispatch(action)
↓
reducer(state, action)
↓
setState(newState)
↓
render()


---

# Project Structure


index.html

index.js
Game initialization
Input handling
Rendering pipeline

reducer.js
Pure game logic

dispatch.js
State update dispatcher

state.js
Global state container

assets/
player images


---

# Core Concepts Demonstrated

State management

Immutable updates

Reducer pattern

Canvas rendering

Event-driven architecture

Game loop design

---

# Technologies

JavaScript (ES Modules)

HTML5 Canvas

No external libraries

---

# Board

8x8 grid

500x500 canvas

Players spawn at:

Player 1 → (0,0)  
Player 2 → (7,7)

---

# Future Improvements

Health UI

Restart button

Better animations

Obstacle tiles

AI opponent

Sound effects

Networking for multiplayer

---

# Author

Weekly Deep Dive Project
JavaScript architecture practice.