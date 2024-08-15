let scope = 100;
const width = window.innerWidth;
const height = window.innerHeight;
const focus = new Point(0, 0);
const masterMath = new MasterMath(focus, scope, -width / 2, width / 2);

let flag = true;

console.log(masterMath);

const points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  masterMath.setCenter(new Point(width / 2, height / 2));
  masterMath.env();

  const A = new Point(-2, 0);
  A.setGraphingColor("lightgreen", 10, NaN, true);
  const B = new Point(2, 0);
  B.setGraphingColor("lightgreen", 10, NaN, true);
  const C = new Point(3, 0);
  C.setGraphingColor("lightgreen", 10, NaN, true);

  const pointer = new Point(
    masterMath.fixedMousePointer.x,
    masterMath.fixedMousePointer.y
  );
  pointer.setGraphingColor("white", 10, NaN, true);

  const m = LinearFunction.estimateLinearByTwoPoints(C, pointer);
  m.setGraphingColor("white", 1, NaN, true);

  const a = m.args[0];
  const linear = new LinearFunction(a, -3 * a);
  linear.setGraphingColor("white", 1, NaN, true);

  const circle = new Circle(Point.O(), 2);
  circle.setGraphingColor("white", 1, NaN, true);

  const [Bdash, Adash] = circle.getIntersectionWithLinearFunction(linear);
  Adash.setGraphingColor("red", 10, NaN, true);
  Bdash.setGraphingColor("red", 10, NaN, true);

  const l1 = LinearFunction.estimateLinearByTwoPoints(A, Adash);
  l1.setGraphingColor("white", 1, NaN, true);
  const l2 = LinearFunction.estimateLinearByTwoPoints(B, Bdash);
  l2.setGraphingColor("white", 1, NaN, true);

  const P = l1.getIntersectionWithLinearFunction(l2);
  P.setGraphingColor("red", 10, NaN, true);

  masterMath.setObjects([
    circle,
    A,
    B,
    C,
    m,
    linear,
    Adash,
    Bdash,
    l1,
    l2,
    P,
    pointer,
  ]);
  masterMath.draw();
}

function mouseWheel(event) {
  scope += (event.deltaY / 5000) * scope;
}

// function mousePressed() {
//   flag = !flag;
// }
