// Style transfer model pulled from:
// https://github.com/ml5js/ml5-examples/tree/master/p5js/StyleTransfer/StyleTransfer_Image

let imgInputElem = document.getElementById('input');
let imgOutputElem = document.getElementById('output');

const style = ml5.styleTransfer('./models/udnie/', styleTransferModelLoaded);

// -----------------------------------------------------------
function init() {
  style.transfer(imgInputElem, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      imgOutputElem.src = result.src;
    }
  });
}

// -----------------------------------------------------------
function styleTransferModelLoaded() {
  console.log('Style transfer model loaded.');
  init();
}