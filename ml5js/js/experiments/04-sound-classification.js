let confidenceElem = document.getElementById('confidence');
let wordElem = document.getElementById('word');

const opts = {
  probabilityThreshold: 0.7
};

const soundClassifier = ml5.soundClassifier('SpeechCommands18w', opts, soundClassifierModelReady);

// -----------------------------------------------------------
function init() {
  soundClassifier.classify((err, results) => {
    if (err) {
      console.error(err);
      return;
    } else {
      displayResults(results);
    }
  });
}

// -----------------------------------------------------------
function soundClassifierModelReady(err, results) {
  console.log('Sound classifier model loaded.');
  init();
}

// -----------------------------------------------------------
function displayResults(results) {
  console.log(results)
  let topResult = results[0];

  confidenceElem.innerHTML = topResult["confidence"].toFixed(2);
  wordElem.innerHTML = topResult["label"];
}