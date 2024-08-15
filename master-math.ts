type StrokeColorData = string;
type StrokeWeightData = number;

type FillColorData = string;
type NoFillData = boolean;

function checkForAllAvailableShapes(callback: Function) {
  const shapes = [Point, Line, Circle];
  for (const shape of shapes) {
    callback(shape);
  }
}

class MasterMath {
  focus: Point;
  center: Point;
  scope: number;
  objects: Array<MasterFunction | MasterShape>;
  min: number;
  max: number;
  backgroundColor: [number, number, number, number] = [30, 30, 30, 255];
  fixedMousePointer: Point;

  constructor(focus: Point, scope: number = 1, min: number, max: number) {
    this.focus = focus;
    this.center = new Point(window.innerWidth / 2, window.innerHeight / 2);
    this.scope = scope;
    this.min = min;
    this.max = max;
    this.objects = [];
    window.addEventListener("wheel", (event) => {
      this.onMouseWheel(event);
    });
  }

  env(): void {
    // @ts-ignore
    background(...this.backgroundColor);
    // @ts-ignore
    translate(this.center.x, this.center.y);
    // @ts-ignore
    scale(1, -1);

    this.fixedMousePointer = new Point(
      // @ts-ignore
      mouseX - this.center.x,
      // @ts-ignore
      -(mouseY - this.center.y)
    ).magnify(this.focus, 1 / this.scope);

    // @ts-ignore
    stroke("white");
    // @ts-ignore
    strokeWeight(1);
    const xAxis = new Line(
      // @ts-ignore
      new Point(-width / 2, 0),
      // @ts-ignore
      new Point(width / 2, 0)
    ).magnify(this.focus, this.scope);
    // this.setObjects([xAxis]);
    const yAxis = new Line(
      // @ts-ignore
      new Point(0, -height / 2),
      // @ts-ignore
      new Point(0, height / 2)
    ).magnify(this.focus, this.scope);

    // @ts-ignore
    stroke("red");
    xAxis.draw();
    // @ts-ignore
    stroke("green");
    yAxis.draw();

    // 10 points on the x and y axis
    for (let i = -10; i <= 10; i++) {
      // @ts-ignore
      stroke("white");
      // @ts-ignore
      strokeWeight(5);
      // @ts-ignore
      const pointX = new Point(i, 0).magnify(this.focus, this.scope);
      const pointY = new Point(0, i).magnify(this.focus, this.scope);
      pointX.setGraphingColor("white", 5, "white", false);
      pointY.setGraphingColor("white", 5, "white", false);
      pointX.draw();
      pointY.draw();
    }
  }

  setCenter(center: Point): void {
    this.center = center;
  }

  setBackgroundColor(color: [number, number, number, number]): void {
    this.backgroundColor = color;
  }

  setObjects(objects: any[]): void {
    this.objects = objects;
  }

  addObjects(objects: any[]): void {
    this.objects.push(...objects);
  }

  draw(): void {
    for (const obj of this.objects) {
      if (obj instanceof MasterFunction) {
        obj.magnify(this.focus, this.scope).draw(this.min, this.max);
      }
      if (obj instanceof MasterShape) {
        obj.magnify(this.focus, this.scope).draw();
      }
    }
  }

  onMouseWheel(event: WheelEvent): void {
    this.scope += (event.deltaY / 5000) * this.scope;
  }
}
class MasterShape {
  strokeColor: StrokeColorData;
  strokeWeight: StrokeWeightData;
  fillColor: FillColorData;
  noFill: NoFillData;
  constructor() {
    this.strokeColor = "white";
    this.strokeWeight = 1;
    this.fillColor = "white";
    this.noFill = false;
  }

  setGraphingColor(
    strokeColor: StrokeColorData,
    strokeWeight: StrokeWeightData,
    fillColor: FillColorData,
    noFill: NoFillData
  ): void {
    this.strokeColor = strokeColor;
    this.strokeWeight = strokeWeight;
    this.fillColor = fillColor;
    this.noFill = noFill;
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }

  magnify(center: Point, magnification: number): MasterShape {
    throw new Error("Method not implemented.");
  }
}

class Point extends MasterShape {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  static O(): Point {
    return new Point(0, 0);
  }

  draw(): void {
    // @ts-ignore
    push();
    // @ts-ignore
    stroke(this.strokeColor);
    // @ts-ignore
    strokeWeight(this.strokeWeight);
    // @ts-ignore
    point(this.x, this.y);
    // @ts-ignore
    pop();
  }

  magnify(center: Point, magnification: number): Point {
    const newPoint = new Point(
      center.x + (this.x - center.x) * magnification,
      center.y + (this.y - center.y) * magnification
    );
    newPoint.setGraphingColor(
      this.strokeColor,
      this.strokeWeight,
      this.fillColor,
      this.noFill
    );
    return newPoint;
  }
}

class Line extends MasterShape {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    super();
    this.start = start;
    this.end = end;
  }

  getDividingPoint(m: number, n: number): Point {
    return new Point(
      (this.start.x * n + this.end.x * m) / (m + n),
      (this.start.y * n + this.end.y * m) / (m + n)
    );
  }

  magnify(center: Point, magnification: number): Line {
    const newStart = this.start.magnify(center, magnification);
    const newEnd = this.end.magnify(center, magnification);
    const newLine = new Line(newStart, newEnd);
    newLine.setGraphingColor(
      this.strokeColor,
      this.strokeWeight,
      this.fillColor,
      this.noFill
    );
    return newLine;
  }

  draw(): void {
    // @ts-ignore
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

class Circle extends MasterShape {
  center: Point;
  radius: number;

  constructor(center: Point, radius: number) {
    super();
    this.center = center;
    this.radius = radius;
  }

  getIntersectionWithLinearFunction(linear: LinearFunction) {
    const [a, b, c] = linear.args;
    const [h, k] = [this.center.x, this.center.y];
    const r = this.radius;
    const A = a ** 2 + 1;
    const B = 2 * a * (b - k) - 2 * h;
    const C = h ** 2 + (b - k) ** 2 - r ** 2;
    const D = B ** 2 - 4 * A * C;
    if (D < 0) return [new Point(NaN, NaN), new Point(NaN, NaN)];
    const x1 = (-B + Math.sqrt(D)) / (2 * A);
    const x2 = (-B - Math.sqrt(D)) / (2 * A);
    return [new Point(x1, linear.getY(x1)), new Point(x2, linear.getY(x2))];
  }

  draw(): void {
    // @ts-ignore
    stroke(this.strokeColor);
    // @ts-ignore
    strokeWeight(this.strokeWeight);
    if (this.noFill) {
      // @ts-ignore
      noFill();
    } else {
      // @ts-ignore
      fill(this.fillColor);
    }
    // @ts-ignore
    ellipse(this.center.x, this.center.y, this.radius * 2);
  }

  magnify(center: Point, magnification: number): Circle {
    const newRadius = this.radius * magnification;
    const newCenter = new Line(center, this.center).getDividingPoint(
      -magnification,
      magnification - 1
    );
    const newCircle = new Circle(newCenter, newRadius);
    newCircle.setGraphingColor(
      this.strokeColor,
      this.strokeWeight,
      this.fillColor,
      this.noFill
    );
    return newCircle;
  }
}

class MasterFunction {
  args: number[];
  strokeColor: StrokeColorData;
  strokeWeight: StrokeWeightData;
  fillColor: FillColorData;
  noFill: NoFillData;

  constructor(...args: number[]) {
    this.args = args;
    this.strokeColor = "white";
    this.strokeWeight = 1;
    this.fillColor = "white";
    this.noFill = false;
  }

  getY(x: number): number {
    let tmp = 0;
    const { length } = this.args;
    for (let i = 0; i < length; i++) {
      tmp += this.args[i] * x ** (length - i - 1);
    }
    return tmp;
  }

  differentiate(): MasterFunction {
    const { length } = this.args;
    const newArgs = [];
    for (let i = 0; i < length - 1; i++) {
      // @ts-ignore
      newArgs.push(this.args[i] * (length - i - 1));
    }
    return new MasterFunction(...newArgs);
  }

  getTangentLinearFunction(x: number): MasterFunction {
    const diffFunc = this.differentiate();
    const y = this.getY(x);
    const slope = diffFunc.getY(x);
    return new MasterFunction(slope, y - slope * x);
  }

  magnify(center: Point, magnification: number): MasterFunction {
    throw new Error("Method not implemented.");
  }

  draw(min: number, max: number): void {
    // @ts-ignore
    beginShape();
    // @ts-ignore
    noFill();
    for (let x = min; x < max; x += 0.1) {
      // @ts-ignore
      stroke(this.strokeColor);
      // @ts-ignore
      strokeWeight(this.strokeWeight);
      // @ts-ignore
      vertex(x, this.getY(x));
    }
    // @ts-ignore
    endShape();
  }

  setGraphingColor(
    strokeColor: StrokeColorData,
    strokeWeight: StrokeWeightData,
    fillColor: FillColorData,
    noFill: NoFillData
  ): void {
    this.strokeColor = strokeColor;
    this.strokeWeight = strokeWeight;
    this.fillColor = fillColor;
    this.noFill = noFill;
  }
}

class LinearFunction extends MasterFunction {
  constructor(a: number, b: number) {
    super(a, b);
  }

  static estimateLinearByTwoPoints(p1: Point, p2: Point): LinearFunction {
    const a = (p2.y - p1.y) / (p2.x - p1.x);
    const b = p1.y - a * p1.x;
    return new LinearFunction(a, b);
  }

  getIntersectionWithLinearFunction(linear: LinearFunction): Point {
    const [a1, b1] = this.args;
    const [a2, b2] = linear.args;
    const x = (b2 - b1) / (a1 - a2);
    return new Point(x, this.getY(x));
  }

  magnify(center: Point, magnification: number): LinearFunction {
    const l1 = new Line(center, new Point(-5, this.getY(-5)));
    const l2 = new Line(center, new Point(5, this.getY(5)));

    const p1 = l1.getDividingPoint(-magnification, magnification - 1);
    const p2 = l2.getDividingPoint(-magnification, magnification - 1);
    return LinearFunction.estimateLinearByTwoPoints(p1, p2);
  }
}

class QuadraticFunction extends MasterFunction {
  constructor(a: number, b: number, c: number) {
    super(a, b, c);
  }

  getTangentLinearFunctionFromPoint(
    x: number,
    y: number
  ): [LinearFunction, LinearFunction] {
    const [a, b, c] = this.args;
    const D = 4 * (a * x) ** 2 - 4 * a * (-b * x + y - c);
    if (D < 0)
      return [new LinearFunction(NaN, NaN), new LinearFunction(NaN, NaN)];
    const t1 = (2 * a * x + Math.sqrt(D)) / (2 * a);
    const t2 = (2 * a * x - Math.sqrt(D)) / (2 * a);

    const linear1 = new LinearFunction(2 * a * t1 + b, -a * t1 ** 2 + c);
    const linear2 = new LinearFunction(2 * a * t2 + b, -a * t2 ** 2 + c);

    return [linear1, linear2];
  }

  getTangentPointFromPoint(x: number, y: number): [Point, Point] {
    const [a, b, c] = this.args;
    const D = 4 * (a * x) ** 2 - 4 * a * (-b * x + y - c);
    if (D < 0) return [new Point(NaN, NaN), new Point(NaN, NaN)];
    const t1 = (2 * a * x + Math.sqrt(D)) / (2 * a);
    const t2 = (2 * a * x - Math.sqrt(D)) / (2 * a);

    const p1 = new Point(t1, a * t1 ** 2 + b * t1 + c);
    const p2 = new Point(t2, a * t2 ** 2 + b * t2 + c);

    return [p1, p2];
  }

  static estimateQuadraticByThreePoints(
    p1: Point,
    p2: Point,
    p3: Point
  ): QuadraticFunction {
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    const x3 = p3.x;
    const y3 = p3.y;

    const b =
      ((y3 - y1) * x2 ** 2 -
        (y3 - y1) * x1 ** 2 -
        ((y2 - y1) * x3 ** 2 - (y2 - y1) * x1 ** 2)) /
      ((x2 - x1) * (x1 ** 2 - x3 ** 2) - (x3 - x1) * (x1 ** 2 - x2 ** 2));

    const a = (y2 - y1 - b * (x2 - x1)) / (x2 ** 2 - x1 ** 2);

    const c = y1 - a * x1 ** 2 - b * x1;

    return new QuadraticFunction(a, b, c);
  }

  getYIntercept(): Point {
    return new Point(0, this.args[2]);
  }

  getSolutions(log: boolean): [Point, Point] {
    // prevent D = NaN
    const [a, b, c] = this.args;
    const D = b ** 2 - 4 * a * c;
    if (log) {
      console.log(a, b, c, D);
    }
    if (D < 0) return [new Point(NaN, NaN), new Point(NaN, NaN)];
    const x1 = (-b + Math.sqrt(D)) / (2 * a);
    const x2 = (-b - Math.sqrt(D)) / (2 * a);
    if (log) {
      console.log("coor_x: ", x1, x2);
    }
    return [new Point(x1, this.getY(x1)), new Point(x2, this.getY(x2))];
  }

  magnify(center: Point, magnification: number): QuadraticFunction {
    const l1 = new Line(center, this.getYIntercept());
    const l2 = new Line(center, new Point(-5, this.getY(-5)));
    const l3 = new Line(center, new Point(5, this.getY(5)));

    const p1 = l1.getDividingPoint(-magnification, magnification - 1);
    const p2 = l2.getDividingPoint(-magnification, magnification - 1);
    const p3 = l3.getDividingPoint(-magnification, magnification - 1);
    return QuadraticFunction.estimateQuadraticByThreePoints(p1, p2, p3);
  }
}

class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  mul(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  div(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector2 {
    return this.div(this.mag());
  }

  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  angleBetween(v: Vector2): number {
    return Math.acos(this.dot(v) / (this.mag() * v.mag()));
  }

  static fromAngle(angle: number): Vector2 {
    return new Vector2(Math.cos(angle), Math.sin(angle));
  }

  toPoint(): Point {
    return new Point(this.x, this.y);
  }
}
