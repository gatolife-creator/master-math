let scope = 100;
const width = window.innerWidth;
const height = window.innerHeight;
const focus = new Point(0, 0);
const masterMath = new MasterMath(focus, scope, -width / 2, width / 2);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  masterMath.setCenter(new Point(width / 2, height / 2));
  masterMath.env();

  const scopeX = 1 / 50000;

  // const args = [1, 0, -30, 0, 273, 0, -820, 0, 576, 0];
  // x^11 - 55 x^9 + 1023 x^7 - 7645 x^5 + 21076 x^3 - 14400 x
  const args = [1, 0, -55, 0, 1023, 0, -7645, 0, 21076, 0, -14400, 0];

  const newArgs = args.map((arg) => arg * scopeX);

  const func = new MasterFunction(...newArgs);
  func.setGraphingColor("white", 1, NaN, true);

  masterMath.setObjects([func]);
  masterMath.draw();
}

function mouseWheel(event) {
  scope += (event.deltaY / 5000) * scope;
}
