import './style.css'

//ds = distances of dead cubes
//cd = # of cubes dead

//Steps
//calulate the best of the last gen
//mutate the best of the last gen
//create new cubes with the mutated values
//repeat


import * as PIXI from 'pixi.js';
import * as H from './helper.js';
import { Cube, distances, deadcubes } from './entites/cube.js';

let start = 32;
let app = H.createStage({ width: window.innerWidth, height: window.innerHeight });
let cubeC = H.createGroup(app);
let cubes = [];
let ds = [];
let cd = 0;
let gen = 0;

let cubenum = 4;

let run = false;

let simdone = false;
let bestsx = 0;
let bestsy = 0;

let deadCount = document.getElementById("dead");
let bestCount = document.getElementById("best");
let genCount = document.getElementById("generation");
let forever = document.getElementById("foreverbox");
let capspeed = document.getElementById("capspeed");
let runbutton = document.getElementById("runbutton");
let numcubebox = document.getElementById("cubenum");

runbutton.addEventListener("click", () => {
  if (cubes.length == 0) {
    cubenum = numcubebox.value
    numcubebox.disabled = true
    for (let i = 0; i < cubenum; i++) {
      let sprite = new Cube(start,start,(Math.random()*3)+1,(Math.random()*3)+1,app,cubeC)
      cubes.push(sprite)

      
    }
  }
  run = !run;
  if (run) {
    runbutton.innerText = "Stop"
  } else {
    runbutton.innerText = "Run"
  }
})



H.setUpdate(() => {
  
  cubes.forEach((e, i) => {
    
    if (capspeed.checked) {
      e.cap = true
    } else {
      e.cap = false
    }
    if (run) {
      e.update();
      e.deadcubes = deadcubes
    }
    
    genCount.innerText = `Generation: ${gen}`
    deadCount.innerText = `Dead: ${cd}`
    if(simdone){
      if(e.state == 'dead'){
        
        cubeC.removeChild(e.sprite);
        cubes.splice(i,1);
        let sprite = new Cube(start,start,bestsx,bestsy,app,cubeC)
        cubes.push(sprite)
        
        
      }

      if (e.x > app.screen.width) {
        e.x = start
        e.y = start
      }

    }else{

      if(e.state == 'dead'){
        ds.push(e.x)
        cubeC.removeChild(e.sprite);
        cubes.splice(i,1);
        cd += 1
        
        
      }

      if(e.x > app.screen.width){
        
        if (cd == 0 && (!forever.checked)) {
          if (!forever.checked) {
            bestCount.innerText = `Best Of Last Gen: ${e.x} Best X speed: ${e.sx}  Best Y speed: ${e.sy}`
            bestsx = e.sx
            bestsy = e.sy
            simdone = true
            cubes.forEach((e, i) => { cubeC.removeChild(e.sprite); })
            cubes = []
            let sprite = new Cube(start, start, bestsx, bestsy, app, cubeC)
            cubes.push(sprite)
          }
          
        } else {
          
          cubes.forEach((e,i) => {cubeC.removeChild(e.sprite);})
          cubes = []
          bestCount.innerText = `Best Of Last Gen: ${e.x}`
          let gennext = gen + 1

          for (let i = 0; i < cubenum; i++) {
          
            let sprite = new Cube(start,start,(e.sx+(H.getRandom(-1,1))),(e.sy+(H.getRandom(-1,1))),app,cubeC)
            cubes.push(sprite)
            gen = gennext
        
          
          } 
          cd = 0;
          
        }

        
        

      }

      if(cubes.length == 0 && cd == cubenum) {
        
        for(var i = 0; i < ds.length; i++)
        {
          var currentNumber = ds[i];
          var nextNumber = ds[i+1];
          if(currentNumber > nextNumber){
            ds[i] = nextNumber;
            ds[i+1] = currentNumber;
          }
        }
        for (let i = 0; i < cubenum; i++) {
          let win = deadcubes[ds[ds.length-1]]
          console.log(win)
          bestCount.innerText = `Best Of Last Gen: ${ds[ds.length-1]}`
          let sprite = new Cube(start,start,(win[0]+(H.getRandom(-1,1))),(win[1]+(H.getRandom(-1,1))),app,cubeC)
          cubes.push(sprite)
        
          
        }
        ds = []
        cd = 0
        gen += 1;
      
      }

    }  
    
    

  })

}, app)

