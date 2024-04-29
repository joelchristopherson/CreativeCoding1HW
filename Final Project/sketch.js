let mySound
var fft
function preload() {
  soundFormats('mp3');
  mySound = loadSound('audiofiles/Runoff.mp3');
}

/*function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(canvasPressed);
  background(220);
  text('tap here to play', 10, 20);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  mySound.play();
}*/

function Setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT()
}

function draw() {
  background(0)
  stroke(255)

  var wave = fft.wavefrom()

  for (var i = 0; i < width; i++) {
    var index = floor(map(i, 0, width, 0, wave.length))

    var x = i
    var y = wave[index] * 300 + height /2
    point(x,y)
  }
}

function mouseClicked() {
  if (mySound.isPlaying()){
    mySound.pause()
  } else
  mySound.play()
}