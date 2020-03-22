let jellyImgElem = document.getElementById('jelly');
let resultsElem = document.getElementById('results');

init();

// -----------------------------------------------------------
async function init() {
 
  const imgClassifierMobileNet = await ml5.imageClassifier('MobileNet')

  Promise.all([
    imgClassifierMobileNet,
  ]).then(() => {
    console.log('MobileNet Model loaded.');
  });

  imgClassifierMobileNet.classify(jellyImgElem, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log('MobileNet results:', results);
      displayResults(results);
    }
  });

}

// -----------------------------------------------------------
function displayResults(results) {
  // Results is an array of objects: 
  // { label: "parachute, chute" confidence: 0.38153982162475586 }
  let resultItems = results.map(result => {
    return `
      <p>
        Label: ${ result["label"] } <br/>
        Confidence: ${ result["confidence"] }
      </p>
    `
  }).join('');

  resultsElem.innerHTML = resultItems;
}


// -----------------------------------------------------------
