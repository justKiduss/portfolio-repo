import {state} from "./state.js";
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext('2d');


canvas.width=innerWidth; // prop of window object and it doesn't need windew.innerWidth
canvas.height=innerHeight;

class Player{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fillStyle=this.color
        ctx.fill()
    }
}

class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fillStyle=this.color
        ctx.fill()
    }
}
const x=canvas.width/2;
const y=canvas.height/2;
const player=new Player(x,y,30,'red');
player.draw();

addEventListener('click',(e)=>{
    const x=e.clientX;
    const y=e.clientY;

    const projectile=new Projectile(x,y,5,'blue',null);
    console.log(e)
    projectile.draw();

})
