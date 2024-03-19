//This is the js code of my self-portrait!

var headSize = 150; 
var sizeChange = 1; 
var minHeadSize = 100; 
var maxHeadSize = 200;

var textX = 250;
var textY = 580;
var phase = 0;
var stepSize = 2;

var originalX = textX;
var originalY = textY;

var headX = 250;
var headY = 200;
//var headDirection = 10;

var noseX =250;
var noseY =225;
//var noseDirection =1;

var shoe1X = 200;
var shoe1Y = 530;
//var shoe1Direction = 5 ;

var shoe2X = 255;
var shoe2Y = 530 ;
//var shoe2Direction = 6;

var size = 22;
var count = 0;
var sizeDirection = 2;

var bodyX = 200;
var bodyY = 85;
//var bodyDirection = 3;

var movementHead;
var movementNose;
var movementShoe1;
var movementShoe2;
var movementBody;

var rhead, ghead, bhead;
var rnose, gnose, bnose;
var rbody, gbody, bbody;
var rshoe1, gshoe1, bshoe1;
var rshoe2, gshoe2, bshoe2;

//Canvas 
function setup() {
    createCanvas(500, 600);
     movementHead = floor(random() * 10) + 1;
     movementNose = floor(random() * 10) + 1;
     movementShoe1 = floor(random() * 10) + 1;
     movementShoe2 = floor(random() * 10) + 1;
     movementBody = floor(random() * 10) + 1;
      rhead = 255
      ghead = 204 
      bhead = 153
      rnose = 255
      gnose = 204
      bnose = 153
      rbody = 100
      gbody = 100
      bbody = 250
      rshoe1 = 0
      gshoe1 = 0
      bshoe1 = 0
      rshoe2 = 0
      gshoe2 = 0
      bshoe2 = 0

}
//Drawing
function draw() {
    background(170); 

    //Title 
    textSize(size);
    size+= sizeDirection;
    count++
    if(count > 5)
    {
        sizeDirection *=-1
        count = 0
    } 
    strokeWeight(10);
    fill(0,50, 200); 
    text("Business Man", 150, 45);
    strokeWeight(5);

    headSize += sizeChange;
     if (headSize >= maxHeadSize || headSize <= minHeadSize) {
        sizeChange *= -1; 
    }
  


    //Head
    fill(rhead, ghead, bhead); 
    ellipse(headX, headY, headSize, headSize);
    headX+=movementHead
    if(headX >= 418 || headX <= 82)
    {
        movementHead *= -1;
        rhead =random(255);
        ghead = random(255);
        bhead = random(255);

    }

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
    fill(rnose,gnose,bnose);
    ellipse(noseX, noseY, 10);
    noseX+= movementNose
    if (noseX >= 500 || noseX <= 0)
    {
        movementNose *= -1
        rnose =random(255);
        gnose = random(255);
        bnose = random(255);
    }
    


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
    fill(rbody,gbody, bbody); 
    rect(bodyX, bodyY, 100);
    bodyX += movementBody
    bodyY += movementBody
    if (bodyX >= 418 || bodyX <= 82)
    {
        movementBody *= -1
        rbody =random(255);
        gbody = random(255);
        bbody = random(255);
    }

    //Arms
    line(200, 300, 150, 350); 
    line(300, 300, 350, 350); 

    //Legs
    fill(0, 50, 200); 
    rect(200, 425, 50, 100); 
    rect(250, 425, 50, 100); 

    //Shoes
    fill(rshoe1, gshoe1, bshoe1);
    rect(shoe1X,shoe1Y,45); 
    shoe1Y+=movementShoe1
    if (shoe1Y >= 575 || shoe1Y <= 0)
    {
        movementShoe1 *= -1;
        rshoe1 =random(255);
        gshoe1 = random(255);
        bshoe1 = random(255);
    }

    fill(rshoe2, gshoe2, bshoe2);
    rect(shoe2X,shoe2Y,45);
    shoe2Y+=movementShoe2
    if (shoe2Y >= 575 || shoe2Y <= 0)
    {
        movementShoe2 *= -1
        rshoe2 =random(255);
        gshoe2 = random(255);
        bshoe2 = random(255);
    }
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
    text("Joel Christopherson", textX, textY);
    if (phase == 0) {
        textY -= stepSize; 
        if (textY <= 480) phase = 1; 
    } else if (phase == 1) {
        textX -= stepSize; 
        if (textX <= 150) phase = 2; 
    } else if (phase == 2) {
        textY += stepSize; 
        if (textY >= 580) phase = 3; 
    } else if (phase == 3) {
        textX += stepSize; 
        if (textX >= 250) phase = 0; 
    }
}
