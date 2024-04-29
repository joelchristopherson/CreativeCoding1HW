var mySong
var fft

function preloadMusic() {
  //soundFormats('mp3');
  mySong = loadSound('audiofiles/Audio002.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT()
}

function draw() {
  background(0)
  stroke(255)
  //nofill()

  var wave = fft.wavefrom()

  //beginShape()
  for (var i = 0; i < width; i++) {
    var index = floor(map(i, 0, width, 0, wave.length))

    var x = i
    var y = wave[index] * 300 + height / 2
    point(x,y)
  }
  //endShape()
}

function mouseClicked() {
  if (mySong.isPlaying()){
    mySong.pause()
  } else
  mySong.play()
}