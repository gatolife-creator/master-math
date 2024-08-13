let scope = 50;
const afterimage1 = [];
const afterimage2 = [];

const width = window.innerWidth;
const height = window.innerHeight;
const focus = new Point(0, 0);
const masterMath = new MasterMath(focus, scope, -width / 2, width / 2);

let aSlider;

const circles = [];
let speed = 0.1;
let x = 0;

// const circles = [];
// for (let a = 1; a < 10; a += 0.5) {
//   const circle = new Circle(new Point(0, a), Math.sqrt((4 * a - 1) / 4));
//   circle.setGraphingColor("white", 1, NaN, true);
//   circles.push(circle);
// }

function setup() {
  createCanvas(width, height);
  aSlider = createSlider(0.1, 20, 0, 0.1);
  aSlider.position(10, 10);
  aSlider.style("width", "80px");
}

function draw() {
  masterMath.setCenter(new Point(width / 2, height - 50));
  masterMath.env();
  masterMath.setBackgroundColor([30, 30, 30]);
  const a = aSlider.value();

  const qua = new QuadraticFunction(a, 0, 0);
  qua.setGraphingColor("white", 1, NaN, true);

  x += speed;
  if (Math.abs(x) > 50) speed *= -1;

  const C = new Circle(new Point(x, qua.getY(x)), qua.getY(x));
  C.setGraphingColor("white", 1, "white", false);

  circles.push(C);
  if (circles.length > 1000) circles.shift();

  masterMath.setObjects([qua, ...circles]);
  masterMath.draw();
}
