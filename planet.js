class Planet{
    GravForce=6.67*Math.pow(10,-11);
    
    constructor(x, y, vx, vy, radius, mass, move, pColor, canvasSize){
        this.position=createVector(x, y);
        this.radius=radius;
        this.pColor=pColor;
        this.velocityX=vx;
        this.velocityY=vy;
        this.mass=mass;
        this.move=move;
        this.canvasSize=canvasSize;
    }


    show(){
        stroke(this.pColor);
        
        fill(this.pColor);
        push();
        circle(this.position.x, this.position.y,this.radius*2);
        pop();
    }
    updatePos(bodies){
        if (this.move){
        for (let body of bodies){
            //console.log(Math.round(body.position.x),Math.round(this.position.x), Math.round(body.position.y),Math.round(this.position.y))
            if (Math.abs(Math.round(body.position.x)-Math.round(this.position.x))>5 || Math.abs(Math.round(body.position.y)-Math.round(this.position.y))>5){
                let acceleration=this.calculateAttraction(body);
                let relativePos=createVector(body.position.x-this.position.x,body.position.y-this.position.y);
                let angle=Math.atan2(relativePos.y,relativePos.x);
                let ax=acceleration*Math.cos(angle);
                let ay=acceleration*Math.sin(angle);
                this.velocityX+=ax;
                this.velocityY+=ay;
                //console.log(ax, ay);
            }
        let time=1/144;
        this.position.x+=time*this.velocityX;
        if (this.position.x<0 || this.position.x>canvasSize.x){
            this.velocityX=-this.velocityX;
            this.position.x+=time*this.velocityX*2;
        }
        this.position.y+=time*this.velocityY;
        
        if (this.position.y<0 || this.position.y>canvasSize.y){
            this.velocityY=-this.velocityY;
            this.position.y+=time*this.velocityY*2;
        }
        }}
        
    }

    calculateAttraction(secondBody){
        let distance=Math.sqrt(Math.pow(this.position.y-secondBody.position.y,2)+Math.pow(this.position.x-secondBody.position.x,2));
        if (distance<40){
            distance=40;
        }
        let force=this.GravForce*(this.mass+secondBody.mass)/(distance*distance);
        let acceleration= force/this.mass;
        return acceleration*Math.pow(10,14);
    }
   
};