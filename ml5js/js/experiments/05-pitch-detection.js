// Code adapted from: 
// https://github.com/ml5js/ml5-examples/blob/release/javascript/PitchDetection/PitchDetection/sketch.js

let stream;
let pitchDetection;
let startButtonElem = document.getElementById('start-btn');
let freqResultElem = document.getElementById('freqResult');

startButtonElem.addEventListener('click', () => {
  setup();
  init(stream, audioContext);
});

// -----------------------------------------------------------
async function setup() {
  const audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({ 
    audio: true, 
    video: false 
  });
  console.log(stream);
  init(stream, audioContext);
}

// -----------------------------------------------------------
function init(stream, audioContext) {
  pitchDetection = ml5.pitchDetection(
    'models/sound-model',
    audioContext,
    stream,
    modelLoaded
  );
}

// -----------------------------------------------------------
function modelLoaded() {
  console.log('Model loaded.');
  getPitch();
}

// -----------------------------------------------------------
function getPitch() {
  pitchDetection.getPitch((err, freq) => {
    if (err) {
      console.error(err);
      return;
    } else {
      if (freq) {
        freqResultElem.innerHTML = freq.toFixed(2);  
      }
     
    }
    getPitch();
  });
}