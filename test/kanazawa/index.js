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

  const b = new Vector2(1, 1);

  if (flag) {
    for (let i = 0; i < 50; i++) {
      const x = random(-4, 4);
      const y = random(-4, 4);
      const p = new Vector2(x, y);
      if (
        p.sub(b).mag() <= p.add(b.mul(3)).mag() &&
        p.add(b.mul(3)).mag() <= p.sub(b).mag() * 3
      ) {
        const p1 = p.toPoint();
        p1.setGraphingColor("white", 5, NaN, true);
        points.push(p1);
      }
    }
  }

  masterMath.setObjects(points);
  masterMath.draw();
  // for (const p0 of points) {
  //   // p0.setGraphingColor("white", 5, NaN, true);
  //   p0.draw();
  // }
}

function mouseWheel(event) {
  scope += (event.deltaY / 5000) * scope;
}

// function mousePressed() {
//   flag = !flag;
// }
