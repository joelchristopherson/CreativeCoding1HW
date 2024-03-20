function setup() {
    createCanvas(1000, 400);
   
//setting values for my player and exit, This is turning the variables into the object.
    player = { x: 30, y: height / 2, size: 20, color: 'blue' };
    exit = { x: width - 50, y: height - 400, size: 1000, color: 'green' };

    // Creating my array for the enemies
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

    // Draw and update obstacles
    obstacles.forEach(ob => {
        fill(ob.color);
        ellipse(ob.x, ob.y, ob.size);
    
        ob.x += ob.dx;
        ob.y += ob.dy;
       
        if (ob.x < 0) ob.x = width;  // 
        else if (ob.x > width) ob.x = 0;  
    
        if (ob.y < 0) ob.y = height;  // 
        else if (ob.y > height) ob.y = 0;  
    });

    // Draws the player
stroke(0); 
strokeWeight(2); 
fill(player.color);
ellipse(player.x, player.y, player.size);

//Text for the player
noStroke(); 
fill(0);
textAlign(CENTER, CENTER); 
textSize(player.size / 2); 
text('1', player.x, player.y); 
    

    // Draws the exit
    fill(exit.color);
    rect(exit.x, exit.y, exit.size, exit.size);

    //Text for the exit

fill(0);
textAlign(CENTER, CENTER); 
textSize(exit.size / 5); 
//text('EXIT',exit.x + exit.size / 2, exit.y + exit.size / 2); 

    // Move the player with arrow keys
    if (keyIsDown(LEFT_ARROW)) player.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) player.x += 5;
    if (keyIsDown(UP_ARROW)) player.y -= 5;
    if (keyIsDown(DOWN_ARROW)) player.y += 5;

    // Check for exit
    if (player.x >= exit.x && player.y >= exit.y) {
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('You Win!', width / 2, height / 2);
       noLoop() //freezes the game after the user won 
    }
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
