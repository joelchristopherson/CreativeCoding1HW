var mySound
var fft

function preload() {
  //soundFormats('mp3');
  mySound = loadSound('audiofiles/Runoff.mp3');
}

function Setup() {
  createCanvas(8000,8000);
  fft = new p5.FFT()
}

function draw() {
  background(0)
  stroke(255)
  nofill()

  var wave = fft.wavefrom()

  beginShape()
  for (var i = 0; i < width; i++) {
    var index = floor(map(i, 0, width, 0, wave.length))

    var x = i
    var y = wave[index] * 300 + height /2
    vertex(x,y)
  }
  endShape()
}

function mouseClicked() {
  if (mySound.isPlaying()){
    mySound.pause()
  } else
  mySound.play()
}