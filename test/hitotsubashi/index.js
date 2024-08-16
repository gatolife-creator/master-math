let scope = 100;
const width = window.innerWidth;
const height = window.innerHeight;
const focus = new Point(0, 0);
const masterMath = new MasterMath(focus, scope, -width / 2, width / 2);

let flag = true;
let a = 0.01;
let speed = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
}

function draw() {
  masterMath.setCenter(new Point(width / 2, height / 2));
  masterMath.env(false);

  a += speed;
  if (a > 1 || a < 0) {
    speed *= -1;
  }

  const cubic = new CubicFunction(1, 0, -3 * a ** 2, a ** 2);
  cubic.setGraphingColor("white", 0, NaN, true);
  console.log(cubic);
  const [p1, p2] = cubic.getExtremum();

  const r = 100;
  const step = (p2.x - p1.x) / r;

  // const cubic1 = new CubicFunction(1, 0, 0, 0);
  // cubic1.setGraphingColor("white", 1, NaN, true);
  const cubic2 = new CubicFunction(1, 0, -3, 1);
  cubic2.setGraphingColor("white", 1, NaN, true);
  const cubic3 = new CubicFunction(-2, 1, 0, 0);
  cubic3.setGraphingColor("white", 1, NaN, true);

  const q = [];
  for (let i = 0; i < r; i++) {
    const q0 = cubic.getPoint(p1.x + step * i);
    q0.setGraphingColor("red", 2, NaN, true);
    q.push(q0);
  }

  p1.setGraphingColor("red", 1, NaN, true);
  p2.setGraphingColor("red", 1, NaN, true);

  masterMath.setObjects([cubic, p1, p2, ...q /*cubic1*/, cubic2, cubic3]);
  masterMath.draw();
}

function mouseWheel(event) {
  scope += (event.deltaY / 5000) * scope;
}
