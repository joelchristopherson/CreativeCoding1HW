var signal = [];
var songIndex = 0;
var fft;
var sel;
var music = ["\Runoff.mp3"];
var musicPath = "C:\Users\joelw\OneDrive\Documents\GitHub\MART120_Homework\Final Project\audiofiles" ;

//load starting song
function preload() {
  console.log( musicPath + music[0] ); //sets regular path to file where music is kept, loads mp3 file at music index
  signal[0] = loadSound( musicPath + music[0]);

}

function setup() {

  createCanvas(windowWidth,windowHeight);

  //creating selection box
  textAlign(CENTER);
  sel = createSelect();
  sel.position(10, 10);
  //inserting song names into the selection box
  sel.option('Runoff');
  sel.option('This Is Gospel');
  sel.option('Traum');
  sel.option('The Sound');
  sel.option('Changing of the Seasons');
  sel.option('Light It Up');
  sel.option('Of The Night');
  sel.changed(mySelectEvent);

  //  Audio Feature Extraction Setup
  signal[0].play();
  fft = new p5.FFT();

}


//choosing the selected song
function mySelectEvent() {
    var item = sel.value();
    if (item === "Runaway") {
      songIDX = 0; //Runaway is at song index 0 (and etc. for following files)
    } else if (item === "This Is Gospel") {
      songIDX = 1;
    } else if (item === "Traum") {
      songIDX = 2;
    } else if (item === "The Sound") {
      songIDX = 3;
    } else if (item === "Changing of the Seasons") {
      songIDX = 4;
    } else if (item === "Light It Up") {
      songIDX = 5;
    } else if (item === "Of The Night") {
      songIDX = 6;
    }
    /*
      BELOW: If nothing is selected, then load the song index.
      Otherwise, pause the current song and jump to
      the beginning of the newly selected song.
    /*/
    if ( signal[songIDX] == null ) {
      signal[songIDX] = loadSound(musicPath + music[songIDX], loadNewSong);
    } else {
      loadNewSong();
    }
  }
  
  //loading a new song
  function loadNewSong() {
    for (var i = 0; i < signal.length; i++) {
      if (signal[i] != null) {
        signal[i].pause();
      }
    };
    signal[songIDX].loop();
    signal[songIDX].jump(0);
  }