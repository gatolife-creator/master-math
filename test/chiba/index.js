let scope = 25;
const afterimage1 = [];
const afterimage2 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);
  scale(1, -1);

  const center = new Point(0, 5);

  const speed = frameCount / 100;
  const s = cos(speed);
  const t = sin(speed) + 1;

  const p = Point.O().magnify(center, scope);

  const func = new QuadraticFunction(1, -2 * s, s ** 2 + t).magnify(
    center,
    scope
  );
  stroke("white");
  func.draw(-width / 2, width / 2);

  const circle = new Circle(new Point(0, 1), 1);
  circle.magnify(center, scope).draw();

  stroke("red");
  strokeWeight(5);
  Point.O().magnify(center, scope).draw();
  //   const linear = func.getTangentLinearFunction(x);
  stroke("white");
  strokeWeight(1);
  const [linear1, linear2] = func.getTangentLinearFunctionFromPoint(p.x, p.y);
  const [t1, t2] = func.getTangentPointFromPoint(p.x, p.y);
  if (linear1.args[0] > 0) {
    linear1.draw(-width / 2, width / 2);
  }
  if (linear2.args[0] > 0) {
    linear2.draw(-width / 2, width / 2);
  }

  push();
  stroke("red");
  strokeWeight(5);
  t1.draw();
  t2.draw();

  afterimage1.push(t1);
  if (afterimage1.length > 1000) {
    afterimage1.shift();
  }
  for (let i = 0; i < afterimage1.length; i++) {
    afterimage1[i].draw();
  }

  afterimage2.push(t2);
  if (afterimage2.length > 1000) {
    afterimage2.shift();
  }
  for (let i = 0; i < afterimage2.length; i++) {
    afterimage2[i].draw();
  }

  //   afterimage of the point

  pop();
  //   t2.draw();
  linear1.draw(-width / 2, width / 2);
  linear2.draw(-width / 2, width / 2);

  //   axis
  stroke("white");
  strokeWeight(1);
  const xAxis = new Line(
    new Point(-width / 2, 0),
    new Point(width / 2, 0)
  ).magnify(center, scope);
  const yAxis = new Line(
    new Point(0, -height / 2),
    new Point(0, height / 2)
  ).magnify(center, scope);

  stroke("red");
  xAxis.draw();
  stroke("green");
  yAxis.draw();
}

function mouseWheel(event) {
  scope += (event.deltaY / 5000) * scope;
}
// let x1 = 100,
//   y1 = 200,
//   dx1 = 2;
// let x2 = 200,
//   y2 = 200,
//   dx2 = 1.5;
// let x3 = 300,
//   y3 = 200,
//   dx3 = 1;
// let afterimageGraphics;

// function setup() {
//   createCanvas(400, 400);
//   afterimageGraphics = createGraphics(width, height);
//   afterimageGraphics.background(0);
// }

// function draw() {
//   // Clear the main canvas
//   background(0);

//   // Draw and move the other figures
//   drawAndMoveFigures();

//   // Draw the afterimage effect for the specific figure
//   drawAfterimageEffect();
// }

// function drawAndMoveFigures() {
//   fill(255, 0, 0);
//   ellipse(x2, y2, 50, 50); // Moving red circle
//   x2 += dx2;
//   if (x2 > width || x2 < 0) dx2 *= -1;

//   fill(0, 255, 0);
//   rect(x3, y3, 50, 50); // Moving green square
//   x3 += dx3;
//   if (x3 > width - 50 || x3 < 0) dx3 *= -1;
// }

// function drawAfterimageEffect() {
//   // Clear the afterimage graphics buffer slightly for the trailing effect
//   afterimageGraphics.fill(0, 0, 0, 20); // Semi-transparent black
//   afterimageGraphics.noStroke();
//   afterimageGraphics.rect(0, 0, width, height);

//   // Draw the moving blue circle on the graphics buffer
//   afterimageGraphics.fill(0, 0, 255, 100); // Semi-transparent blue
//   afterimageGraphics.ellipse(x1, y1, 50, 50);

//   // Display the afterimage graphics
//   image(afterimageGraphics, 0, 0);

//   // Draw the solid blue circle over the afterimage
//   fill(0, 0, 255);
//   ellipse(x1, y1, 50, 50);

//   // Update position for the blue circle
//   x1 += dx1;
//   if (x1 > width || x1 < 0) dx1 *= -1;
// }
