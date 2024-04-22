//Class and Constructor
class Shape {
    constructor(x, y, width, height, col, type) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.col = col;
      this.type = type;  //Used to type the type of the shape
    }
  
    //Displays the different shapes I want to include
    display() {
      fill(this.col);
      if (this.type === 'rectangle') {
        rect(this.x, this.y, this.width, this.height);
      } else if (this.type === 'circle') {
        ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height);
      } else if (this.type === 'triangle') {
        triangle(this.x, this.y + this.height, this.x + this.width / 2, this.y, this.x + this.width, this.y + this.height);
      }
    }
  
  }
  let shapes = [];
  
  function setup() {
    createCanvas(550, 400);
    //Setting up the shapes, size, color, etc
    shapes.push(new Shape(100, 50, 100, 100, 'hotpink', 'rectangle'));
    shapes.push(new Shape(200, 150, 150, 120, 'gold', 'circle'));
    shapes.push(new Shape(300, 250, 200, 100, 'silver', 'triangle'));
  }
  
  function draw() {
    background("black");
    
    //Displays all shapes with array
    shapes.forEach((shape, index) => {
      shape.display();
    });
  }
  
