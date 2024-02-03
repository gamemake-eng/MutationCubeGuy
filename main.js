import './style.css'
import * as PIXI from 'pixi.js';
import * as H from './helper.js'

//ds = distances of dead cubes
//cd = # of cubes dead

import {Cube, distances, deadcubes} from './entites/cube.js'
let start = 32;
let app = H.createStage({width:window.innerWidth, height:window.innerHeight})
let cubeC = H.createGroup(app);
let cubes = [];
let ds = [];
let cd = 0;

let deadCount = document.getElementById("dead")
let bestCount = document.getElementById("best")
for (let i = 0; i < 4; i++) {
  let sprite = new Cube(start,start,(Math.random()*3)+1,(Math.random()*3)+1,app,cubeC)
  cubes.push(sprite)

  
}



H.setUpdate(() => {
  cubes.forEach((e,i) => {
    
    e.update();
    e.deadcubes = deadcubes
    deadCount.innerText = `Dead: ${cd}`
    if(e.state == 'dead'){
      ds.push(e.x)
      cubeC.removeChild(e.sprite);
      cubes.splice(i,1);
      cd += 1
      
      
    }

    if(e.x > app.screen.width){
      if(cd == 0){
        bestCount.innerText = `Best Of Last Gen: ${e.x}\nBest X speed: ${e.sx}\nBest Y speed: ${e.sy}`
        cubes.forEach((e,i) => {cubeC.removeChild(e.sprite);})
        cubes = []
      }else{
       cubes.forEach((e,i) => {cubeC.removeChild(e.sprite);})
       cubes = []
       bestCount.innerText = `Best Of Last Gen: ${e.x}`
        for (let i = 0; i < 4; i++) {
        
          let sprite = new Cube(start,start,(e.sx+(H.getRandom(-1,1))),(e.sy+(H.getRandom(-1,1))),app,cubeC)
          cubes.push(sprite)
      
        
        } 
        cd = 0;
      }

      
      

    }

    if(cubes.length == 0) {
      
      for(var i = 0; i < ds.length; i++)
      {
        var currentNumber = ds[i];
        var nextNumber = ds[i+1];
        if(currentNumber > nextNumber){
          ds[i] = nextNumber;
          ds[i+1] = currentNumber;
        }
      }
      for (let i = 0; i < 4; i++) {
        let win = deadcubes[ds[ds.length-1]]
        console.log(win)
        bestCount.innerText = `Best Of Last Gen: ${ds[ds.length-1]}`
        let sprite = new Cube(start,start,(win[0]+(H.getRandom(-1,1))),(win[1]+(H.getRandom(-1,1))),app,cubeC)
        cubes.push(sprite)
      
        
      }
      ds = []
      cd = 0
     
    }
      
    
    

    })
}, app)

