
p5.disableFriendlyErrors = true; // disables FES

let width = 500;
let height = 500;
let planets;
let character;

let maxrotation = 2;

let rotating = 0;
let acceleratingrotation = 0;

let decceleratingrotation = 0;

let walking = 0;
let strafing = 0;

let fov = 90;
let sliderFOV;

let simpleRender;

let detail = 50;
let sliderDetail;

let mouseLock = false;


function setup() {
    createCanvas(width, height );
    planets = [];
    planets.push(new Planet(width/2, height/2,0,0, 25, 200, false, color(255,255,150)));
    planets.push(new Planet(width/3*2, height/3,-40,-25, 20, 150, true, color(100,100,255)));
    
    planets.push(new Planet(width/3, height/5*4,20,-2, 20, 150, true, color(255,100,255)));
    //planets.push(new Planet(0, 0, width, 0, color(255)));
    //planets.push(new Planet(width, height, 0, height, color(255)));
    //planets.push(new Planet(width, height, width, 0, color(255)));
    //for (let planet = 0; planet < 5; planet++) {
        //planets.push(new Planet(random(width), random(height), random(width), random(height), color(random(100) + 125, random(100) + 125, random(100) + 125)));
        //(planets[planets.length - 1]);
    //}
    createP("");
    createButton("Add random planet").mouseClicked(randomPlanet); 
    createButton("Add random star").mouseClicked(randomStar); 
    frameRate(30);
}

function randomPlanet(){
    size=random(10, 30)
    weight=size*10;
    planets.push(new Planet(random(width),random(height),random(-50,50),random(-50,50), size, weight, true,color(random(155,255),random(155,255),random(155,255))));
}


function randomStar(){
    size=random(20, 40)
    weight=size*20;
    planets.push(new Planet(random(width),random(height),random(-50,50),random(-50,50), size, weight, false,color(random(155,255),random(155,255),random(155,255))));
}

function draw() {

    background(0);
    for (let planet of planets) {
        planet.updatePos(planets);
        planet.show();
    }
  
}

function keyTyped() {
    return;

    if (key === "w") {
        walking = 1;
    }
    if (key === "s") {
        walking = -1;
    }
}
function mouseDragged() {
    return;
    if (mouseX < width && mouseX > 0) {
        if (mouseY < height && mouseY > 0) {
            character.pos = createVector(mouseX, mouseY)
        }

    }
}
function mouseClicked() {
    return;
    
    if (mouseX < width && mouseX > 0) {
        if (mouseY < height && mouseY > 0) {
            character.pos = createVector(mouseX, mouseY);
        }
        else if (mouseY < height * 2 && mouseY > 0) {
            if (!mouseLock){
            requestPointerLock();
            mouseLock = true;}else{
                exitPointerLock();
                mouseLock=false;
            }
        }
    }

}

function keyPressed() {
    return;
    if (mouseLock) {
        if (key === "a") {
            strafing = -1;
        }
        if (key === "d") {
            strafing = 1;
        }
       
    }
    else {
        if (key === "a") {
            acceleratingrotation = -.1;
            decceleratingrotation = 0;
        }
        if (key === "d") {
            acceleratingrotation = .1;
            decceleratingrotation = 0;
        }
    }

}

function keyReleased() {
    return;
    if (key === "w") {
        walking = 0;
    }
    if (key === "s") {
        walking = 0;
    }
    if (mouseLock) {
        if (key === "a") {
            strafing = 0;
        }
        if (key === "d") {
            strafing = 0;
        }
    }
    else {


        if (key === "a") {

            acceleratingrotation = 0;
            decceleratingrotation = .2;
        }
        if (key === "d") {
            acceleratingrotation = 0;
            decceleratingrotation = -.2;
        }
    }

}