// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let leftscore = 0;
let rightscore = 0;

var socket;

function setup() {
    createCanvas(600, 400);
    ding = loadSound("data/ding.mp3");
    puck = new Puck();
    left = new Paddle(true,100);
    right = new Paddle(false,400);

    socket = io.connect('192.168.178.65:3000');

    socket.on('data',
    // When we receive data
    function(data) {
      console.log("Got: " + data.right + " " + data.left );
      left.move(data.left);
      right.move(data.right);
    }
  );

}

function draw() {
    background(0);
    
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();
    
    puck.update();
    puck.edges();
    puck.show();
    
    fill(255);
    textSize(32);
    //text(leftscore, 32, 40);
    text(rightscore, width-64, 40);
}


function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    console.log(key);
    if (key == 'w') {
        left.move(-10);
    } else if (key == 's') {
        left.move(10);
    }

    if (key == 'J') {
        right.move(-10);
    } else if (key == 'M') {
        right.move(10);
    }
}
