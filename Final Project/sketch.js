var mySong
var fft
var particles = []
// var songs = ['audiofiles/tillIleave.mp3', 'audiofiles/whoa(mindinawe).mp3', 'audiofiles/Runoff.mp3'];
var songs = [
  { name: "Till I Leave", file: "audiofiles/tillIleave.mp3" },
  { name: "Whoa (Mind in Awe)", file: "audiofiles/whoa(mindinawe).mp3" },
  { name: "Runoff", file: "audiofiles/Runoff.mp3" },
  { name: "Audio 002", file: "audiofiles/Audio002.mp3" },
  { name: "Diamondz n Roses", file: "audiofiles/DiamondznRoses.mp3"},
  { name: "METAMORPHOSIS", file: "audiofiles/METAMORPHOSIS (Sped Up).mp3"}
];
var currentSong;
var songSelect;
var playPauseButton;

function preload() {
  //soundFormats('mp3');
  mySong = loadSound('audiofiles/tillIleave.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  fft = new p5.FFT()

   // Create a label for the dropdown
   let label = createSpan('Select Song: ');
   label.id('selectSongLabel'); // Set the ID for CSS styling
   label.position(5, 12.5); // Position near the dropdown
  
  songSelect = createSelect(); // Create dropdown
  songSelect.id('playPauseButton'); // Set ID for CSS styling
  songSelect.class('nav-button')
  songSelect.position(115, 10); // Position it on the canvas
  songs.forEach((song, index) => {
    songSelect.option(song.name, index); // Add options to the dropdown
  });
  songSelect.changed(loadSelectedSong); // Load song when selection changes

  playPauseButton = createButton('Play/Pause');
  playPauseButton.id('playPauseButton'); 
  playPauseButton.class("nav-button")
  playPauseButton.position(windowWidth - playPauseButton.size().width - 30, 10);
  playPauseButton.mousePressed(togglePlayPause); // When the button is clicked, call the togglePlayPause function

  noLoop();
}

let isSongLoading = false; // Guard to check if song is currently loading

function loadSelectedSong() {
  if (isSongLoading) return; // Prevent new load if already loading
  isSongLoading = true;

  let songIndex = songSelect.value();
  let songPath = songs[songIndex].file;

  if (mySong.isPlaying()) {
    mySong.stop();
  }
  
  particles = []; // Clear particles
  background(0); // Clear the canvas but keep drawing

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
  background(0)
  strokeWeight(10)
  stroke(255)
  //noFill()

  translate(width / 2, height / 2)

    
  fft.analyze()
  amp = fft.getEnergy(20,200)

  var wave = fft.waveform()

  for (var t = -1; t <= 1; t += 2) {


    beginShape()
    for (var i = 0; i <= 180; i += 0.25) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1))

      var radius = map(wave[index], -1, 1, 150, 350)

      var x = radius * cos(i)
      var y = radius * sin(i) * t
      vertex(x, y)
    }
    endShape()
  }

  var p = new Particle()
  particles.push(p)

  // Always show particles, but only update their position if the song is playing
  for (var i = particles.length - 1; i >= 0; i--) {
    if (mySong.isPlaying()) {
      particles[i].update(amp > 200); // Update positions only if the song is playing
    }
    particles[i].show(); // Always display particles

    if (particles[i].remove()) {
      particles.splice(i, 1);
    }
  }
  // for (var i = 0; i < particles.length; i++){
  //   if (!particles[i].remove()){
  //     particles[i].update(amp>200)
  //     particles[i].show()
  //   } else {
  //     particles.splice(i, 1)
  //   }

  // }

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
// function mouseClicked() {
//   if (mySong.isPlaying()){
//     mySong.pause()
//     noLoop()
//   } else {
//   mySong.play()
//   loop()
//   }
// }

//Creating a particle object and place around the perimeter of the waveform
class Particle{
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3,12)

    this.color = [random(100, 255), random(100, 255), random(100, 255)]
  }
  //These are methods
  update(cond){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  remove() {
    if(this.pos.x < -width / 2 || this.pos.x > width / 2||
    this.pos.y < -height /2 || this.pos.y > width / 2) {
      return true
    } else{ return false
    }
  }
  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}
/*function draw() {
  background(0)
  stroke(255)
  noFill()

  var wave = fft.waveform()

  beginShape()
  for (var i = 0; i < width; i++) {
    var index = floor(map(i, 0, width, 0, wave.length))

    var x = i
    var y = wave[index] * 300 + height / 2
    vertex(x, y)
  }
  endShape()
}

function mouseClicked() {
  if (mySong.isPlaying()){
    mySong.pause()
    noLoop()
  } else {
  mySong.play()
  loop()
  }
}*/

