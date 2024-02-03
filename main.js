import './style.css'
import * as PIXI from 'pixi.js';
import * as H from './helper.js'
import {Cube, distances, deadcubes} from './entites/cube.js'

let app = H.createStage({width:window.innerWidth, height:window.innerHeight})
let cubeC = H.createGroup(app);
let cubes = [];
let ds = [];
for (let i = 0; i < 4; i++) {
  let sprite = new Cube(0,0,(Math.random()*3)+1,(Math.random()*3)+1,app,cubeC)
  cubes.push(sprite)

  
}



H.setUpdate(() => {
  cubes.forEach((e,i) => {
    
    e.update();
    e.deadcubes = deadcubes
    if(e.state == 'dead'){
      ds.push(e.x)
      cubeC.removeChild(e.sprite);
      cubes.splice(i,1);
      
    }

    if(e.x > app.screen.width){
      cubes.forEach((e,i) => {cubeC.removeChild(e.sprite);})
      cubes = []
      for (let i = 0; i < 4; i++) {
        
        let sprite = new Cube(0,0,(e.sx+(H.getRandom(-1,1))),(e.sy+(H.getRandom(-1,1))),app,cubeC)
        cubes.push(sprite)
      
        
      }

    }

    if(cubes.length == 1) {
      
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
        let sprite = new Cube(0,0,(e.sx+(H.getRandom(-1,1))),(e.sy+(H.getRandom(-1,1))),app,cubeC)
        cubes.push(sprite)
      
        
      }
      ds = []
    }
    
    
  })
}, app)

