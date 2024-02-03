import * as H from '../helper.js'
const States = Object.freeze({
    ALIVE: "alive",
    DEAD: "dead"
})
let win = []
export let deadcubes = {}
export let distances = []
export class Cube {
    constructor(x, y, sx, sy, app, g) {
        this.app = app
        this.ox = x
        this.oy = y
        this.x = x
        this.y = y
        this.sx = sx
        this.sy = sy
        this.state = States.ALIVE;
        this.sprite = H.createSprite("../cube.png",this.x,this.y,this.app, g)
        this.deadcubes = {}
    }

    update() {
        this.sprite.x = this.x
        this.sprite.y = this.y
        if(this.state==States.ALIVE){
            H.clamp(this.sx, -10, 10)
            this.x += this.sx
            this.y += this.sy

            if(this.x < 0){

                this.state = States.DEAD
                deadcubes[this.x] = [this.sx, this.sy]
                
            }
            if((this.y < 0)||(this.y+32 > this.app.screen.height)){
                this.state = States.DEAD
                deadcubes[this.x] = [this.sx, this.sy]
            }
        }else if(this.state==States.DEAD) {
            
            this.sprite.tint = "#FF000000"
        }

        
        
    }

    mutate(win) {
        this.sx = win[0]
          this.sy = win[1]
          this.state = States.ALIVE
          //console.log(this.sx)
    }
}