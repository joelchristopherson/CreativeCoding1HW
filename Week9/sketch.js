//This is the js code of my self-portrait!

//Canvas 
function setup() {
    createCanvas(500, 600);
}
//Drawing
function draw() {
    background(170); 

    //Title 
    textSize(35);
    strokeWeight(10);
    fill(0,50, 200); 
    text("Business Man", 150, 45);
    strokeWeight(5)

    //Head
    fill(255, 204, 153); 
    ellipse(250, 200, 175, 200);

    //Eyes
    strokeWeight(2);
    fill(255); 
    ellipse(215, 175, 25, 20);
    ellipse(285, 175, 25, 20); 
    fill(100,100,250);
    ellipse(285,175,12);
    ellipse(215,175,12);
    fill(0); 
    point(215, 175); 
    point(285, 175); 

    // Nose
    fill(255, 204, 153);
    ellipse(250, 225, 10, 5);

    //Mouth
    strokeWeight(5);
    line(230, 250, 270, 250); 

    //Hair/brows
    stroke(color(165, 42, 42));
    line(175, 150, 250, 100);
    line(325, 150, 250, 100);
    line(205,155,225,157);
    line(275,157,295,155);
    stroke(0)

    //Body
    fill(100, 100, 250); 
    rect(200, 285, 100, 150);

    //Arms
    line(200, 300, 150, 350); 
    line(300, 300, 350, 350); 

    //Legs
    fill(0, 50, 200); 
    rect(200, 425, 50, 100); 
    rect(250, 425, 50, 100); 

    //Shoes
    fill(0);
    rect(200,530,45,10);
    rect(255,530,45,10);

    //Pockets
    fill(0, 0, 139); 
    rect(200, 426, 20, 35);
    rect(280, 426, 20, 35); 

     //Tie 
     fill(255, 0, 0); 
     triangle(250, 310, 270, 375, 230, 375); 
     fill(255, 0, 0); 
     triangle(240, 295, 250, 310, 260, 295); 
     triangle(231, 375, 250, 400, 269, 375);

    //Signature
    fill(0,50,200); 
    strokeWeight(10);
    textSize(22);
    text("Joel Christopherson", 310, 580);
}
