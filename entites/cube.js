import * as H from '../helper.js'
const States = Object.freeze({
    ALIVE: "alive",
    DEAD: "dead"
})
export class Cube {
    constructor(x, y, sx, sy, app) {
        this.app = app
        this.x = x
        this.y = y
        this.sx = sx
        this.sy = sy
        this.state = States.ALIVE;
        this.sprite = H.createSprite("../cube.png",this.x,this.y,this.app)

    }

    update() {
        this.sprite.x = this.x
        this.sprite.y = this.y
        if(States.ALIVE){
            this.x += this.sx
            this.y += this.sy 
            if(this.x < 0){
                this.state = States.DEAD
            }
        }else {
            this.x = 0
            this.sprite.tint = "#FF000000"
        }
        
    }
}