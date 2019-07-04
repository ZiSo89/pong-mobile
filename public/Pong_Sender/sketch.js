// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

var x, y, z;
var xpos, ypos;

var data = {
  left: 0,
  right: 0
};

function setup() {
  createCanvas(400, 400);
  // default values
  xpos = 200;
  ypos = 200;
  x = 0;
  y = 0;
  socket = io.connect('192.168.178.65:3000');
}

function draw() {
  background(255);

  // add/subract xpos and ypos
  xpos = 200;//(xpos + x) ;
  ypos = (ypos - (y * 4));



  if (y > 0) {
    text("y: -10", 25, 50);
    data.left = -5;
  }

  else if (y < 0) {
    text("y: 10", 25, 50);
    data.left = 5;
  }

  else {
    text("y: 0", 25, 50);
    data.left = 0;
  }
  socket.emit('data', data);

  // wrap ellipse if over bounds
  //if (xpos > 400) { xpos = 400; }
  //if (xpos < 0) { xpos = 0; }

  if (ypos > 400) { ypos = 400; }
  if (ypos < 0) { ypos = 0; }

  // draw ellipse
  fill(255, 0, 0);
  ellipse(xpos, ypos, 25, 25);

  // display variables
  fill(0);
  noStroke();
  text("x: " + x, 25, 25);
  text("z: " + z, 25, 75);
}

// accelerometer Data
window.addEventListener('devicemotion', function (e) {
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
});



function keyReleased() {
  data.left = 0;
  data.right = 0;
  socket.emit('data', data);
}

function keyPressed() {
  //console.log(key);
  if (key == 'A') {
    data.left = -10;
  } else if (key == 'Y') {
    data.left = 10;
  }

  if (key == 'J') {
    data.right = -10;
  } else if (key == 'M') {
    data.right = 10;
  }

  //console.log("left " + data.left + " right " + data.right);
  socket.emit('data', data);
}
