// Code is from Dan Shiffman's tutorial "Train Your Own Neural Network"
// https://www.youtube.com/watch?v=8HEgeAbYphA

let model;
let targetLabel = 'C';
let state = 'collection';

// -----------------------------------------------------------
function setup() {
  createCanvas(500, 500);
  background(250);

  // options/properties of neural network
  // could input a data file (dataUrl property)
  // task could also be 'regression'
  let opts = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification'
  }

  model = ml5.neuralNetwork(opts);
}

// -----------------------------------------------------------
function keyPressed() {

  if (key == 't') {
    // Set options for training process
    // ml5 shuffles inputs because it's not optimal to train
    // with organized/ordered data
    // Sending our data is 1 epoch 
    // debug:true = tfjs-vis - visualization tool
    state = 'training';
    let options = {
      epochs: 100,
      debug: true
    }
    model.normalizeData();
    model.train(options, whileTraining, finishedTraining);
  } else {
    // C, D, E
    targetLabel = key.toUpperCase();
  }

}


// -----------------------------------------------------------
function whileTraining(epoch, loss) {
  console.log(epoch);
}


// -----------------------------------------------------------
function finishedTraining() {
  console.log('finished training!');
  state = 'prediction';
}


// -----------------------------------------------------------
function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  };

  if (state == 'collection') {
    let target = {
      label: targetLabel
    };
  
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  } else if (state == 'prediction') {
    // ask model to classify
    model.classify(inputs, gotResults);
  }
}

// -----------------------------------------------------------
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  } else {
    console.log(results);
    // Draw results
    stroke(0);
    fill(0, 255, 255, 100);
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(results[0]['label'], mouseX, mouseY);
  }
}

// -----------------------------------------------------------
// function draw() {
//   background(0);
// }