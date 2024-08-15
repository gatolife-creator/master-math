var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function checkForAllAvailableShapes(callback) {
    var shapes = [Point, Line, Circle];
    for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
        var shape = shapes_1[_i];
        callback(shape);
    }
}
var MasterMath = /** @class */ (function () {
    function MasterMath(focus, scope, min, max) {
        if (scope === void 0) { scope = 1; }
        var _this = this;
        this.backgroundColor = [30, 30, 30, 255];
        this.focus = focus;
        this.center = new Point(window.innerWidth / 2, window.innerHeight / 2);
        this.scope = scope;
        this.min = min;
        this.max = max;
        this.objects = [];
        window.addEventListener("wheel", function (event) {
            _this.onMouseWheel(event);
        });
    }
    MasterMath.prototype.env = function () {
        // @ts-ignore
        background.apply(void 0, this.backgroundColor);
        // @ts-ignore
        translate(this.center.x, this.center.y);
        // @ts-ignore
        scale(1, -1);
        this.fixedMousePointer = new Point(
        // @ts-ignore
        mouseX - this.center.x, 
        // @ts-ignore
        -(mouseY - this.center.y)).magnify(this.focus, 1 / this.scope);
        // @ts-ignore
        stroke("white");
        // @ts-ignore
        strokeWeight(1);
        var xAxis = new Line(
        // @ts-ignore
        new Point(-width / 2, 0), 
        // @ts-ignore
        new Point(width / 2, 0)).magnify(this.focus, this.scope);
        // this.setObjects([xAxis]);
        var yAxis = new Line(
        // @ts-ignore
        new Point(0, -height / 2), 
        // @ts-ignore
        new Point(0, height / 2)).magnify(this.focus, this.scope);
        // @ts-ignore
        stroke("red");
        xAxis.draw();
        // @ts-ignore
        stroke("green");
        yAxis.draw();
        // 10 points on the x and y axis
        for (var i = -10; i <= 10; i++) {
            // @ts-ignore
            stroke("white");
            // @ts-ignore
            strokeWeight(5);
            // @ts-ignore
            var pointX = new Point(i, 0).magnify(this.focus, this.scope);
            var pointY = new Point(0, i).magnify(this.focus, this.scope);
            pointX.setGraphingColor("white", 5, "white", false);
            pointY.setGraphingColor("white", 5, "white", false);
            pointX.draw();
            pointY.draw();
        }
    };
    MasterMath.prototype.setCenter = function (center) {
        this.center = center;
    };
    MasterMath.prototype.setBackgroundColor = function (color) {
        this.backgroundColor = color;
    };
    MasterMath.prototype.setObjects = function (objects) {
        this.objects = objects;
    };
    MasterMath.prototype.addObjects = function (objects) {
        var _a;
        (_a = this.objects).push.apply(_a, objects);
    };
    MasterMath.prototype.draw = function () {
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj instanceof MasterFunction) {
                obj.magnify(this.focus, this.scope).draw(this.min, this.max);
            }
            if (obj instanceof MasterShape) {
                obj.magnify(this.focus, this.scope).draw();
            }
        }
    };
    MasterMath.prototype.onMouseWheel = function (event) {
        this.scope += (event.deltaY / 5000) * this.scope;
    };
    return MasterMath;
}());
var MasterShape = /** @class */ (function () {
    function MasterShape() {
        this.strokeColor = "white";
        this.strokeWeight = 1;
        this.fillColor = "white";
        this.noFill = false;
    }
    MasterShape.prototype.setGraphingColor = function (strokeColor, strokeWeight, fillColor, noFill) {
        this.strokeColor = strokeColor;
        this.strokeWeight = strokeWeight;
        this.fillColor = fillColor;
        this.noFill = noFill;
    };
    MasterShape.prototype.draw = function () {
        throw new Error("Method not implemented.");
    };
    MasterShape.prototype.magnify = function (center, magnification) {
        throw new Error("Method not implemented.");
    };
    return MasterShape;
}());
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Point.O = function () {
        return new Point(0, 0);
    };
    Point.prototype.draw = function () {
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
    };
    Point.prototype.magnify = function (center, magnification) {
        var newPoint = new Point(center.x + (this.x - center.x) * magnification, center.y + (this.y - center.y) * magnification);
        newPoint.setGraphingColor(this.strokeColor, this.strokeWeight, this.fillColor, this.noFill);
        return newPoint;
    };
    return Point;
}(MasterShape));
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(start, end) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    Line.prototype.getDividingPoint = function (m, n) {
        return new Point((this.start.x * n + this.end.x * m) / (m + n), (this.start.y * n + this.end.y * m) / (m + n));
    };
    Line.prototype.magnify = function (center, magnification) {
        var newStart = this.start.magnify(center, magnification);
        var newEnd = this.end.magnify(center, magnification);
        var newLine = new Line(newStart, newEnd);
        newLine.setGraphingColor(this.strokeColor, this.strokeWeight, this.fillColor, this.noFill);
        return newLine;
    };
    Line.prototype.draw = function () {
        // @ts-ignore
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    };
    return Line;
}(MasterShape));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(center, radius) {
        var _this = _super.call(this) || this;
        _this.center = center;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.getIntersectionWithLinearFunction = function (linear) {
        var _a = linear.args, a = _a[0], b = _a[1], c = _a[2];
        var _b = [this.center.x, this.center.y], h = _b[0], k = _b[1];
        var r = this.radius;
        var A = Math.pow(a, 2) + 1;
        var B = 2 * a * (b - k) - 2 * h;
        var C = Math.pow(h, 2) + Math.pow((b - k), 2) - Math.pow(r, 2);
        var D = Math.pow(B, 2) - 4 * A * C;
        if (D < 0)
            return [new Point(NaN, NaN), new Point(NaN, NaN)];
        var x1 = (-B + Math.sqrt(D)) / (2 * A);
        var x2 = (-B - Math.sqrt(D)) / (2 * A);
        return [new Point(x1, linear.getY(x1)), new Point(x2, linear.getY(x2))];
    };
    Circle.prototype.draw = function () {
        // @ts-ignore
        stroke(this.strokeColor);
        // @ts-ignore
        strokeWeight(this.strokeWeight);
        if (this.noFill) {
            // @ts-ignore
            noFill();
        }
        else {
            // @ts-ignore
            fill(this.fillColor);
        }
        // @ts-ignore
        ellipse(this.center.x, this.center.y, this.radius * 2);
    };
    Circle.prototype.magnify = function (center, magnification) {
        var newRadius = this.radius * magnification;
        var newCenter = new Line(center, this.center).getDividingPoint(-magnification, magnification - 1);
        var newCircle = new Circle(newCenter, newRadius);
        newCircle.setGraphingColor(this.strokeColor, this.strokeWeight, this.fillColor, this.noFill);
        return newCircle;
    };
    return Circle;
}(MasterShape));
var MasterFunction = /** @class */ (function () {
    function MasterFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.args = args;
        this.strokeColor = "white";
        this.strokeWeight = 1;
        this.fillColor = "white";
        this.noFill = false;
    }
    MasterFunction.prototype.getY = function (x) {
        var tmp = 0;
        var length = this.args.length;
        for (var i = 0; i < length; i++) {
            tmp += this.args[i] * Math.pow(x, (length - i - 1));
        }
        return tmp;
    };
    MasterFunction.prototype.differentiate = function () {
        var length = this.args.length;
        var newArgs = [];
        for (var i = 0; i < length - 1; i++) {
            // @ts-ignore
            newArgs.push(this.args[i] * (length - i - 1));
        }
        return new (MasterFunction.bind.apply(MasterFunction, __spreadArray([void 0], newArgs, false)))();
    };
    MasterFunction.prototype.getTangentLinearFunction = function (x) {
        var diffFunc = this.differentiate();
        var y = this.getY(x);
        var slope = diffFunc.getY(x);
        return new MasterFunction(slope, y - slope * x);
    };
    MasterFunction.prototype.translate = function (dx, dy) {
        var length = this.args.length;
        var n = length - 1;
        // console.log("x^" + n);
        var newArgs = Array(length).fill(0);
        newArgs[n] += dy;
        for (var i = 0; i < length; i++) {
            // console.log(`${this.args[i]}(x-${dx})^${n - i}`);
            for (var k = 0; k < length - i; k++) {
                // console.log(
                //   `${this.args[i]}(${n - i}C${k}(${-dx})^${k}x^${n - i - k})`
                // );
                // console.log(combination(n - i, k) * this.args[i] * Math.pow(-dx, k));
                newArgs[length - (n - i - k) - 1] +=
                    combination(n - i, k) * this.args[i] * Math.pow(-dx, k);
            }
        }
        return new (MasterFunction.bind.apply(MasterFunction, __spreadArray([void 0], newArgs, false)))();
    };
    MasterFunction.prototype.magnify = function (center, magnification) {
        var _this = this;
        var scaledCoeffs = this.translate(-center.x, -center.y).args.map(function (coeff, i) { return coeff / Math.pow(magnification, _this.args.length - i - 2); });
        return new (MasterFunction.bind.apply(MasterFunction, __spreadArray([void 0], scaledCoeffs, false)))();
    };
    MasterFunction.prototype.draw = function (min, max) {
        // @ts-ignore
        beginShape();
        // @ts-ignore
        noFill();
        for (var x = min; x < max; x += 0.1) {
            // @ts-ignore
            stroke(this.strokeColor);
            // @ts-ignore
            strokeWeight(this.strokeWeight);
            // @ts-ignore
            vertex(x, this.getY(x));
        }
        // @ts-ignore
        endShape();
    };
    MasterFunction.prototype.setGraphingColor = function (strokeColor, strokeWeight, fillColor, noFill) {
        this.strokeColor = strokeColor;
        this.strokeWeight = strokeWeight;
        this.fillColor = fillColor;
        this.noFill = noFill;
    };
    return MasterFunction;
}());
var LinearFunction = /** @class */ (function (_super) {
    __extends(LinearFunction, _super);
    function LinearFunction(a, b) {
        return _super.call(this, a, b) || this;
    }
    LinearFunction.estimateLinearByTwoPoints = function (p1, p2) {
        var a = (p2.y - p1.y) / (p2.x - p1.x);
        var b = p1.y - a * p1.x;
        return new LinearFunction(a, b);
    };
    LinearFunction.prototype.getIntersectionWithLinearFunction = function (linear) {
        var _a = this.args, a1 = _a[0], b1 = _a[1];
        var _b = linear.args, a2 = _b[0], b2 = _b[1];
        var x = (b2 - b1) / (a1 - a2);
        return new Point(x, this.getY(x));
    };
    LinearFunction.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, new Point(-5, this.getY(-5)));
        var l2 = new Line(center, new Point(5, this.getY(5)));
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        return LinearFunction.estimateLinearByTwoPoints(p1, p2);
    };
    return LinearFunction;
}(MasterFunction));
var QuadraticFunction = /** @class */ (function (_super) {
    __extends(QuadraticFunction, _super);
    function QuadraticFunction(a, b, c) {
        return _super.call(this, a, b, c) || this;
    }
    QuadraticFunction.prototype.getTangentLinearFunctionFromPoint = function (x, y) {
        var _a = this.args, a = _a[0], b = _a[1], c = _a[2];
        var D = 4 * Math.pow((a * x), 2) - 4 * a * (-b * x + y - c);
        if (D < 0)
            return [new LinearFunction(NaN, NaN), new LinearFunction(NaN, NaN)];
        var t1 = (2 * a * x + Math.sqrt(D)) / (2 * a);
        var t2 = (2 * a * x - Math.sqrt(D)) / (2 * a);
        var linear1 = new LinearFunction(2 * a * t1 + b, -a * Math.pow(t1, 2) + c);
        var linear2 = new LinearFunction(2 * a * t2 + b, -a * Math.pow(t2, 2) + c);
        return [linear1, linear2];
    };
    QuadraticFunction.prototype.getTangentPointFromPoint = function (x, y) {
        var _a = this.args, a = _a[0], b = _a[1], c = _a[2];
        var D = 4 * Math.pow((a * x), 2) - 4 * a * (-b * x + y - c);
        if (D < 0)
            return [new Point(NaN, NaN), new Point(NaN, NaN)];
        var t1 = (2 * a * x + Math.sqrt(D)) / (2 * a);
        var t2 = (2 * a * x - Math.sqrt(D)) / (2 * a);
        var p1 = new Point(t1, a * Math.pow(t1, 2) + b * t1 + c);
        var p2 = new Point(t2, a * Math.pow(t2, 2) + b * t2 + c);
        return [p1, p2];
    };
    QuadraticFunction.estimateQuadraticByThreePoints = function (p1, p2, p3) {
        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;
        var x3 = p3.x;
        var y3 = p3.y;
        var b = ((y3 - y1) * Math.pow(x2, 2) -
            (y3 - y1) * Math.pow(x1, 2) -
            ((y2 - y1) * Math.pow(x3, 2) - (y2 - y1) * Math.pow(x1, 2))) /
            ((x2 - x1) * (Math.pow(x1, 2) - Math.pow(x3, 2)) - (x3 - x1) * (Math.pow(x1, 2) - Math.pow(x2, 2)));
        var a = (y2 - y1 - b * (x2 - x1)) / (Math.pow(x2, 2) - Math.pow(x1, 2));
        var c = y1 - a * Math.pow(x1, 2) - b * x1;
        return new QuadraticFunction(a, b, c);
    };
    QuadraticFunction.prototype.getYIntercept = function () {
        return new Point(0, this.args[2]);
    };
    QuadraticFunction.prototype.getSolutions = function (log) {
        // prevent D = NaN
        var _a = this.args, a = _a[0], b = _a[1], c = _a[2];
        var D = Math.pow(b, 2) - 4 * a * c;
        if (log) {
            console.log(a, b, c, D);
        }
        if (D < 0)
            return [new Point(NaN, NaN), new Point(NaN, NaN)];
        var x1 = (-b + Math.sqrt(D)) / (2 * a);
        var x2 = (-b - Math.sqrt(D)) / (2 * a);
        if (log) {
            console.log("coor_x: ", x1, x2);
        }
        return [new Point(x1, this.getY(x1)), new Point(x2, this.getY(x2))];
    };
    QuadraticFunction.prototype.magnify = function (center, magnification) {
        var l1 = new Line(center, this.getYIntercept());
        var l2 = new Line(center, new Point(-5, this.getY(-5)));
        var l3 = new Line(center, new Point(5, this.getY(5)));
        var p1 = l1.getDividingPoint(-magnification, magnification - 1);
        var p2 = l2.getDividingPoint(-magnification, magnification - 1);
        var p3 = l3.getDividingPoint(-magnification, magnification - 1);
        return QuadraticFunction.estimateQuadraticByThreePoints(p1, p2, p3);
    };
    return QuadraticFunction;
}(MasterFunction));
var CubicFunction = /** @class */ (function (_super) {
    __extends(CubicFunction, _super);
    function CubicFunction(a, b, c, d) {
        return _super.call(this, a, b, c, d) || this;
    }
    return CubicFunction;
}(MasterFunction));
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    };
    Vector2.prototype.sub = function (v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    };
    Vector2.prototype.mul = function (scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    };
    Vector2.prototype.div = function (scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    };
    Vector2.prototype.mag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector2.prototype.normalize = function () {
        return this.div(this.mag());
    };
    Vector2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector2.prototype.angleBetween = function (v) {
        return Math.acos(this.dot(v) / (this.mag() * v.mag()));
    };
    Vector2.fromAngle = function (angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    };
    Vector2.prototype.toPoint = function () {
        return new Point(this.x, this.y);
    };
    return Vector2;
}());
