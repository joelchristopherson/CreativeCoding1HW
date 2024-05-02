//Global variables 
//Holds the song that is selected
var mySong
//Variable for the Fast Fourier Transform (FFT), which allows the waveform to pick up the frequencies from the song.
var fft
//Array for the particles in the circle visualization
var particles = []
//Holds the visualization that the user selects
var visualizationSelect;
//Array for my songs
var songs = [
  { name: "Till I Leave", file: "audiofiles/tillIleave.mp3" },
  { name: "Whoa (Mind in Awe)", file: "audiofiles/whoa(mindinawe).mp3" },
  { name: "Runoff", file: "audiofiles/Runoff.mp3" },
  { name: "Audio 002", file: "audiofiles/Audio002.mp3" },
  { name: "Diamondz n Roses", file: "audiofiles/DiamondznRoses.mp3" },
  { name: "METAMORPHOSIS", file: "audiofiles/METAMORPHOSIS (Sped Up).mp3" },
  { name: "After Dark", file: "audiofiles/Mr.Kitty - After Dark.mp3" },
  { name: "Narco", file: "audiofiles/Narco.mp3" },
  { name: "Your Name", file: "audiofiles/DVRST - YOUR NAME.mp3" },
  { name: "STARFALL", file: "audiofiles/STARFALL.mp3" }
];
var currentSong;
var songSelect;
var playPauseButton;

//Queues up the first song
function preload() {
  mySong = loadSound('audiofiles/tillIleave.mp3');
}

//Adds labels and main interface to the screen
function setup() {
  createCanvas(windowWidth, windowHeight);
  //Allows the FFT to function correct and look better 
  angleMode(DEGREES)
  fft = new p5.FFT()

  //Creates the label for the dropdown
  let label = createSpan('Select Song: ');
  label.id('selectSongLabel');
  label.position(5, 12.5);

  //Creates the drop down menu from the song array
  songSelect = createSelect();
  songSelect.id('playPauseButton');
  songSelect.class('nav-button')
  songSelect.position(label.width + 10, 10);
  songs.forEach((song, index) => {
    songSelect.option(song.name, index);
  });
  //Loads the song if it is changed in the menu
  songSelect.changed(loadSelectedSong);

  //Sets up the visualization drop down menu
  let visLabel = createSpan('Select Visualization: ');
  visLabel.id('selectSongLabel')
  let moveOver = songSelect.position().x + songSelect.size().width + 15;
  visLabel.position(moveOver, 12.5);
  visualizationSelect = createSelect();
  let moveOver2 = visLabel.position().x + visLabel.size().width + 5;
  visualizationSelect.position(moveOver2, 10);
  visualizationSelect.id('playPauseButton')
  visualizationSelect.class('nav-button')
  visualizationSelect.option('Circle Visualization', 'circle');
  visualizationSelect.option('Linear Waveform', 'linear');
  visualizationSelect.option('Speaker Visualization', 'speaker')

  //Sets up the play/pause button 
  playPauseButton = createButton('Play/Pause');
  playPauseButton.id('playPauseButton');
  playPauseButton.class("nav-button")
  playPauseButton.position(windowWidth - playPauseButton.size().width - 30, 10);
  //Makes the button actually play/pause when the user presses it
  playPauseButton.mousePressed(togglePlayPause);

  //Sets up the help/more information button
  helpButton = createButton('More Information');
  helpButton.id('playPauseButton');
  helpButton.class("nav-button");
  helpButton.position(windowWidth - helpButton.size().width - 30, windowHeight - helpButton.size().height - 20);
  helpButton.mousePressed(showHelp);

  //Stops the song from playing when the program is first loaded, I had to do this because some browsers don't allow for autoplay
  noLoop();
}

//What the more information button displays
function showHelp() {
  alert("Need help? Here's some information on how to use this application.\n 1. Select the song/visualization you'd like to view. \n Note: You can change the visualization while the song plays. \n 2. Press 'Play/Pause' to start and stop the music. \n 3. If all else fails, refresh and wait a few moments after changing the song. \n \n Song Credits: \n g2ox_em, COTIS - till I leave \n XXXTENTACION - whoa (mind in awe) \n Jobii - Runoff \n Next To Blue - Audio 002 \n VaporGod - Diamondz n Roses \n INTERWORLD - METAMORPHOSIS \n Mr. Kitty - After Dark \n Blasterjaxx, Timmy Trumpet - Narco \n DVRST - Your Name \n MoonDeity, ARCHEZ - STARFALL\n \n Thanks for choosing AudioAura! \n \n AudioAura \n Created by Joel Christopherson \n Copyright Spring 2024");
}

//Checks to see if a song is loading
let isSongLoading = false;

//Stops a new song from loading if another is already loading
function loadSelectedSong() {
  if (isSongLoading) return;
  isSongLoading = true;

  //Selects the correct song from the drop down menu
  let songIndex = songSelect.value();
  let songPath = songs[songIndex].file;

  //Stops the current song if a new song is selected.
  if (mySong.isPlaying()) {
    mySong.stop();
  }

  //Array for the particles in the circular visualization
  particles = [];
  background(0);

  //Loads the new song
  mySong = loadSound(songPath, function () {
    //Resets the loading state once done
    isSongLoading = false; 
    //Setting up the FFT
    fft = new p5.FFT();
    //Makes sure the draw loop is running
    loop(); 
  });

  //Keeps the draw loop running when a new song is loaded but has not been played yet 
  if (!mySong.isPlaying() && !looping) {
    loop();
  }
}

//contains a switch case for the different visualization options.
function draw() {
  background(0);
  fft.analyze();
  //Grabs the visualization that the user selects from the switchcase below. This was hard for me to figure out once it was time to include more visualizations
  let vizType = visualizationSelect.value();

  switch (vizType) {
    case 'circle':
      drawCircleVisualization();
      break;
    case 'linear':
      drawLinearVisualization();
      break;
    case 'speaker':
      drawSpeakerVisualization();
      break;
  }
}

//This was the first visualization I worked on, and ironically the last due to some formatting as I introduced new features.
function drawCircleVisualization() {
  //Places the waveform in the middle of the screen
  translate(width / 2, height / 2);
  strokeWeight(10);
  stroke(255);

  //Combines the waveform with the fft variable
  let wave = fft.waveform();
  //Loop that creates a half circle and iterates twice to form a full circle, this was intentional so I could fill the circle with color and not have it be black.
  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.25) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let radius = map(wave[index], -1, 1, 150, 350);
      let x = radius * sin(i) * t;
      let y = radius * cos(i);
      vertex(x, y);
    }
    endShape();
  }
  updateParticles();
}

//The simpliar version of the circular version for obvious reasons
function drawLinearVisualization() {
  //Gets amplitude for background and color effects
  let amp = fft.getEnergy(20, 200); 
  let wave = fft.waveform();

  //Sets up color mode and stroke properties for the waveform to make it colorful.
  colorMode(HSB, 255);
  noFill();

  //Draws the original waveform with a color gradient
  beginShape();
  for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 0, wave.length));
    let x = i;
    //Ties the waveform with the colors
    let col = map(wave[index], -1, 1, 0, 255); 
    stroke(col, 255, 255);
    let y = wave[index] * 300 + height / 2;
    vertex(x, y);
  }
  endShape();

  //Draws the waveform in the opposite way with a matching color gradient
  beginShape();
  for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 0, wave.length));
    let x = i;
    let col = map(wave[index], -1, 1, 0, 255); 
    stroke(col, 255, 200); 
    let y = height - (wave[index] * 300 + height / 2);
    vertex(x, y);
  }
  endShape();
//Resets the colormode
  colorMode(RGB, 255); 
}

//Final visualization I worked on
function drawSpeakerVisualization() {
  let spectrum = fft.analyze();
  //Used to analyze the bass from the songs to change the visualization with the beat
  let beat = fft.getEnergy("bass"); 
  //Number of rings in the visualization
  let numRings = 12;  
  //Sets the max for the outermost circle in the visualization
  let maxRadius = min(width, height) / 1.25;  

  background(0); 
  noFill(); 
  strokeWeight(5);

  //Save the context of the drawing
  push(); 
  //Centers on the canvas
  translate(width / 2, height / 2);

  //Maps each of the rings to a proportion of the fft spectrum
  for (let i = 0; i < numRings; i++) {
    let freqIndex = floor(map(i, 0, numRings, 0, spectrum.length / 2)); 
    let amplitude = spectrum[freqIndex];
    //Calculates the radius for each of the circles in the fft spectrum
    let radius = map(amplitude, 0, 255, 10, maxRadius / numRings * (i + 1));  

    //Calculates a random color based on the beat
    let r = random(50, 255);
    let g = random(50, 255);
    let b = random(50, 255);

    stroke(r, g, b);
    //Draws the rings
    ellipse(0, 0, radius * 2, radius * 2);
  }
//Restores the circles to the normal sizes
  pop();  
}

//Updates the particles on the circular visualization
function updateParticles() {
  let amp = fft.getEnergy(20, 200);
  //Sets the amount of new particles allowed
  let particleRate = map(amp, 0, 255, 0, 3);
  //Create particles based on the songs amplitude
  for (let i = 0; i < particleRate; i++) {
    particles.push(new Particle());
  }
  //updates the particles to reflect the song that is play and detects the bass so the speed can be altered when bass hits in the song.
  for (var i = particles.length - 1; i >= 0; i--) {
    if (mySong.isPlaying()) {
      particles[i].update(amp > 200);
    }
    particles[i].show();
    if (particles[i].remove()) {
      particles.splice(i, 1);
    }
  }
}

//Play and Pause button
function togglePlayPause() {
  if (mySong.isPlaying()) {
    mySong.pause();
    noLoop();
  } else {
    if (!mySong.isLoaded()) {
      //This will check if the song is loaded before playing
      mySong = loadSound('audiofiles/tillIleave.mp3', function () {
        mySong.play();
      });
    } else {
      mySong.play();
    }
    loop();
  }
}


//Creating a particle object and places around the perimeter of the waveform
class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3, 12)

    this.color = [random(100, 255), random(100, 255), random(100, 255)]
  }

  //These are methods that allow me to update the particles for the circle visualization
  //This method updates the speed of the particles once the bass is detected
  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }

  //This method removes the particles from the screen once they get to the edge of the screen
  remove() {
    if (this.pos.x < -width / 2 || this.pos.x > width / 2 ||
      this.pos.y < -height / 2 || this.pos.y > width / 2) {
      return true
    } else {
      return false
    }
  }

  //This method shows the particles and gives them color
  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}

