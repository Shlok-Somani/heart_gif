const heart = [];
const totalFrames = 240;
let counter = 0;
var song;

function preload(){
    song = loadSound("sound\\heartbeat-05.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // song.play();
  song.loop();
}

function draw() {
  const percent = float(counter % totalFrames) / totalFrames;
  render(percent);
  counter++;
}

function render(percent) {
  background(0);
  translate(width / 2, height / 2);
  stroke(255, 0, 0);
  strokeWeight(4);
  fill(255, 0, 0);
  beginShape();
  for (let v of heart) {
    const a = map(percent, 0, 1, 0, TWO_PI * 2);
    const r = map(sin(a), -1, 1, height / 80, height / 40);
    vertex(r * v.x, r * v.y);
  }
  endShape();


  if (percent < 0.5) {
    const a = map(percent, 0, 0.5, 0, TWO_PI);
    const x = 16 * pow(sin(a), 3);
    const y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
    heart.push(createVector(x, y));

    //Name that will be displayed in the middle of the heart gif
	fill(0,0,0);
	textAlign(CENTER, CENTER);
    textSize(50);
	textStyle(BOLD);
    text('Name', x, y);
  }
	else {
    //removing the points from the array
    heart.splice(0, 1);
  }

}

function mousePressed() {
  if ( song.isPlaying() ) {
		// .isPlaying() returns a boolean
    song.stop();
  }
	else {
    song.play();
  }
}
