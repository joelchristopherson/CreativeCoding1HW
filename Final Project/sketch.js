//Global variables 
//Holds the song that is selected
var mySong
//!!!!!!!
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
  { name: "Diamondz n Roses", file: "audiofiles/DiamondznRoses.mp3"},
  { name: "METAMORPHOSIS", file: "audiofiles/METAMORPHOSIS (Sped Up).mp3"}
  //EDM, Scrillex, Narcos - timmy trumpets, pitbull
];
var currentSong;
var songSelect;
var playPauseButton;

//Queues up the first song and sets up the program to play mp3 files I upload
function preload() {
  soundFormats('mp3');
  mySong = loadSound('audiofiles/tillIleave.mp3');
}

//Adds labels and main interface to the screen
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT()

   //Creates the label for the dropdown
   let label = createSpan('Select Song: ');
   label.id('selectSongLabel');
   label.position(5, 12.5); 
  
   //Creats the drop down menu from the song array
  songSelect = createSelect(); 
  songSelect.id('playPauseButton'); 
  songSelect.class('nav-button')
  songSelect.position(115, 10); 
  songs.forEach((song, index) => {
    songSelect.option(song.name, index); 
  });
  //Loads the song if it is changed in the menu
  songSelect.changed(loadSelectedSong);

    //Sets up the visualization drop down menu
    let visLabel = createSpan('Select Visualization: ');
    visLabel.id('selectSongLabel')
    visLabel.position(335, 12.5);
    visualizationSelect = createSelect();
    visualizationSelect.position(510, 10);
    visualizationSelect.id('playPauseButton')
    visualizationSelect.class('nav-button')
    visualizationSelect.option('Circle Visualization', 'circle');
    visualizationSelect.option('Linear Waveform', 'linear');
    visualizationSelect.option('Spectrum Visualization', 'spectrum')

    //Sets up the play/pause button 
  playPauseButton = createButton('Play/Pause');
  playPauseButton.id('playPauseButton'); 
  playPauseButton.class("nav-button")
  playPauseButton.position(windowWidth - playPauseButton.size().width - 30, 10);
  //Makes the button actually play/pause when the user presses it
  playPauseButton.mousePressed(togglePlayPause); 

  //Stops the song from playing when the program is first loaded, I had to do this because some browsers don't allow for autoplay
  noLoop();
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

  if (mySong.isPlaying()) {
    mySong.stop();
  }
  
  //Clears the particles
  particles = []; 
  background(0); 

  // Load the new song
  mySong = loadSound(songPath, function() {
    isSongLoading = false; // Reset loading state once done
    fft = new p5.FFT(); // Reinitialize FFT
    loop(); // Ensure the draw loop is running
  });

  // Keep the loop running even when a new song is loaded but not yet playing
  if (!mySong.isPlaying() && !looping) {
    loop();
  }
}

function draw() {
  background(0);
  fft.analyze();
  //Grabs the visualization that the user selects from the switchcase below. This was hard for me to figure out once it was time to include more visualizations
  let vizType = visualizationSelect.value();
  
  switch(vizType) {
    case 'circle':
      drawCircleVisualization();
      break;
    case 'linear':
      drawLinearVisualization();
      break;
    case 'spectrum':
      drawSpectrumVisualization();
      break;
  }
}

//This was the first visualization I worked on
function drawCircleVisualization() {
  translate(width / 2, height / 2);
  strokeWeight(10);
  stroke(255);
  
  let wave = fft.waveform();
  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.25) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let radius = map(wave[index], -1, 1, 150, 350);
      let x = radius * cos(i);
      let y = radius * sin(i) * t;
      vertex(x, y);
    }
    endShape();
  }
  updateParticles();
}

function drawLinearVisualization() {
  let amp = fft.getEnergy(20, 200); // Get amplitude for background and color effects
  let wave = fft.waveform();

  // Set up color mode and stroke properties for a vibrant waveform
  colorMode(HSB, 255);
  noFill();

  // Draw the original waveform with a color gradient
  beginShape();
  for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 0, wave.length));
    let x = i;
    let col = map(wave[index], -1, 1, 0, 255); // Map amplitude to hue
    stroke(col, 255, 255);
    let y = wave[index] * 300 + height / 2;
    vertex(x, y);
  }
  endShape();

  // Draw the mirrored waveform with a color gradient
  beginShape();
  for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 0, wave.length));
    let x = i;
    let col = map(wave[index], -1, 1, 0, 255); // Map amplitude to hue
    stroke(col, 255, 200);  // Slightly different saturation for visual contrast
    let y = height - (wave[index] * 300 + height / 2);
    vertex(x, y);
  }
  endShape();

  colorMode(RGB, 255); // Reset color mode to default
}

function drawSpectrumVisualization() {
  let spectrum = fft.analyze();
  let beat = fft.getEnergy("bass"); // Use bass frequencies for beat detection
  let numRings = 15;  // Total number of rings
  let maxRadius = min(width, height) /1.25 ;  // Maximum radius for the outermost ring

  background(0);  // Black background
  noFill();  // No fill for the rings
  strokeWeight(5);  // Width of the rings

  push();  // Save the drawing context
  translate(width / 2, height / 2);  // Move to the center of the canvas

  for (let i = 0; i < numRings; i++) {
      let freqIndex = floor(map(i, 0, numRings, 0, spectrum.length / 2));  // Map each ring to a portion of the spectrum
      let amplitude = spectrum[freqIndex];
      let radius = map(amplitude, 0, 255, 10, maxRadius / numRings * (i + 1));  // Calculate radius based on amplitude

      // Calculate color based on beat
      let r = random(50,255);
      let g = random(50,255);
      let b = random(50,255);

      stroke(r, g, b);  // Set color based on beat
      ellipse(0, 0, radius * 2, radius * 2);  // Draw the ring
  }

  pop();  // Restore the drawing context
}

function updateParticles() {
  let amp = fft.getEnergy(20, 200);
  let particleRate = map(amp, 0, 255, 0, 3); // Dynamic particle creation rate based on amplitude
  // Create particles based on amplitude
  for (let i = 0; i < particleRate; i++) {
    particles.push(new Particle());
  }
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

function togglePlayPause() {
  if (mySong.isPlaying()) {
    mySong.pause();
    noLoop();
  } else {
    if (!mySong.isLoaded()) {
      // This will check if the song is loaded before playing
      mySong = loadSound('audiofiles/tillIleave.mp3', function() {
        mySong.play();
      });
    } else {
      mySong.play();
    }
    loop();
  }
}


//Creating a particle object and place around the perimeter of the waveform
class Particle{
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3,12)

    this.color = [random(100, 255), random(100, 255), random(100, 255)]
  }

  //These are methods that allow me to update the particles for the circle visualization
  //This method updates the speed of the particles once the bass is detected
  update(cond){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }

  //This method removes the particles from the screen once they get to the edge of the screen
  remove() {
    if(this.pos.x < -width / 2 || this.pos.x > width / 2||
    this.pos.y < -height /2 || this.pos.y > width / 2) {
      return true
    } else{ return false
    }
  }
  
  //This method shows the particles and gives them color
  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}

