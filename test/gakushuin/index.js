let scope = 50;
const afterimage1 = [];
const afterimage2 = [];

const width = window.innerWidth;
const height = window.innerHeight;
const focus = new Point(0, 0);
const masterMath = new MasterMath(focus, scope, -width / 2, width / 2);

let aSlider;

// const circles = [];
// for (let a = 1; a < 10; a += 0.5) {
//   const circle = new Circle(new Point(0, a), Math.sqrt((4 * a - 1) / 4));
//   circle.setGraphingColor("white", 1, NaN, true);
//   circles.push(circle);
// }

function setup() {
  createCanvas(width, height);
  aSlider = createSlider(0, 20, 0, 0.1);
  aSlider.position(10, 10);
  aSlider.style("width", "80px");
}

function draw() {
  masterMath.setCenter(new Point(width / 2, height - 50));
  masterMath.env();

  const s = 1 / 4;

  const qua = new QuadraticFunction(s, 0, 0);
  qua.setGraphingColor("white", 1, NaN, true);

  const a = aSlider.value();

  const O = new Point(0, a);
  O.setGraphingColor("red", 5, NaN, true);
  const circle = new Circle(O, Math.sqrt(a / s - 1 / (4 * s ** 2)));
  circle.setGraphingColor("white", 1, null, true);

  const fy = new QuadraticFunction(
    1,
    1 / s - 2 * a,
    a ** 2 - a / s + 1 / (4 * s ** 2)
  );
  const solutions = fy.getSolutions(true);
  const y1 = solutions[0].x;
  const xs = new QuadraticFunction(s, 0, -y1).getSolutions();

  const p1 = new Point(xs[0].x, y1);
  const p2 = new Point(xs[1].x, y1);
  const p3 = new Point(0, y1);
  const l1 = new Line(p1, p2);
  l1.setGraphingColor("white", 1, NaN, true);
  p1.setGraphingColor("red", 5, NaN, true);
  p2.setGraphingColor("red", 5, NaN, true);
  p3.setGraphingColor("red", 5, NaN, true);

  masterMath.setObjects([qua, O, circle, l1, p1, p2, p3]);
  masterMath.draw();
}
