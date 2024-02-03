import './style.css'
import * as PIXI from 'pixi.js';
import * as H from './helper.js'
import {Cube} from './entites/cube.js'

let app = H.createStage({width:window.innerWidth, height:window.innerHeight})
let cubeC = H.createGroup(app);
let cubes = [];

for (let i = 0; i < 4; i++) {
  let sprite = new Cube(0,i*(32*2),-i*2,0,app)
  cubes.push(sprite)
  cubeC.addChild(sprite.sprite)
  
}



H.setUpdate(() => {
  cubes.forEach((e,i) => {
    e.update();
  })
}, app)

