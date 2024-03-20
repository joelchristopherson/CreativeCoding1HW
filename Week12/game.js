
function setup() {
    createCanvas(1000, 400);
   
    // Setting values for my player and exit varibles (This is turning them into objects)
    player = { x: 30, y: height / 2, size: 20, color: [random(255), random(255), random(255)]};
    exit = { x: width - 51, y: height - 450 / 2  , size: 50, color: 'green' };

    // Creating my array for the enemys and give them random speed, color, size, and position
    obstacles = [];
    for (let i = 0; i < 4; i++) {
        obstacles.push({
            x: random(width / 4, 3 * width / 4),
            y: random(height),
            size: random(20, 75),
            dx: random(2, 5) * (random() > 0.5 ? 1 : -1),
            dy: random(2, 5) * (random() > 0.5 ? 1 : -1),
            color: [random(255), random(255), random(255)]
        });
        
    }
}

// Main drawing function
function draw() {
    background(220);
    drawPlayer();   
    movePlayer();
    // The function that draws an object to the screen is at the bottom and cannot be placed in this function otherwise the user can just draw on the canvas without clicking
    Obstacles(); //This references the array I created to format and move the obstacles randomly, meaning I don't have multiple functions to move each of the obstacles, but I hope that's alright.
    drawBorders(10);
    drawExit();
    youWin();
}

// Draw and move obstacles(enemies)
function Obstacles() 
    {obstacles.forEach(ob => {
        fill(ob.color);
        ellipse(ob.x, ob.y, ob.size);
    
        ob.x += ob.dx;
        ob.y += ob.dy;
       
        if (ob.x < 0) ob.x = width;   
        else if (ob.x > width) ob.x = 0;  
    
        if (ob.y < 0) ob.y = height;   
        else if (ob.y > height) ob.y = 0;  
    });
    }

 // Draws the player
function drawPlayer() {
    stroke(0); 
    strokeWeight(2); 
    fill(player.color);
    ellipse(player.x, player.y, player.size);
     
 //Text for the player
    noStroke(); 
    fill(0);
    textAlign(CENTER, CENTER); 
    textSize(player.size / 2); 
    text('P1', player.x, player.y); 
}

 // Draws the exit
 function drawExit() {
    fill(exit.color);
    rect(exit.x, exit.y, exit.size, exit.size);

    // Adjusting the text position so that it is in the center of the Exit
    let centerX = exit.x + exit.size / 2;
    let centerY = exit.y + exit.size / 2;

    //Text for the exit
    fill(0);
    textAlign(CENTER, CENTER); 
    textSize(exit.size / 2 ); 
    text('Exit', centerX, centerY);
 }

// Moves the player with the arrow keys
function movePlayer(){
    if (keyIsDown(LEFT_ARROW)) player.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) player.x += 5;
    if (keyIsDown(UP_ARROW)) player.y -= 5;
    if (keyIsDown(DOWN_ARROW)) player.y += 5;
}

// Check for exit
function youWin(){
    if (player.x + player.size / 2 >= exit.x && player.x - player.size / 2 <= exit.x + exit.size &&
    player.y + player.size / 2 >= exit.y && player.y - player.size / 2 <= exit.y + exit.size) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('You Win!', width / 2, height / 2);
    noLoop(); // Stops the draw loop
    }
}

//Creates borders 
function drawBorders(thickness){
     // top border
     rect(0,0,width,thickness);
     // left border
     rect(0,0,thickness,height);
     // bottom border
     rect(0, height-thickness,width, thickness);
     // right upper border
     rect(width-thickness,0,thickness,height-226);
     // right lower border
     rect(width-thickness,150,thickness,height-10)

}

// Add a non-moving obstacle on mouse click (This will add as many as the user clicks, not just one)
function mousePressed() {
    obstacles.push({
        x: mouseX,
        y: mouseY,
        size: 30,
        dx: 0,
        dy: 0,
        color: [0, 0, 0] 
    });
}
