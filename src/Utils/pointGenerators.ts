/**
 * Line generation from https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
*/

export type NumberTuple = [number, number];
export type PointGenerator = BezierPointGenerator | LinearPointGenerator | MidStepPointGenerator |
AfterStepPointGenerator | BeforeStepPointGenerator;

type BezierCurve = (pointA: NumberTuple, pointB: NumberTuple) => {length: number; angle: number};
export const bezierCurve: BezierCurve = (pointA, pointB): {length: number; angle: number} => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

type ControlPoint =
(current: [number, number], previous: [number, number], next: [number, number], reverse?: boolean) =>
NumberTuple;
export const controlPoint: ControlPoint = (current, previous, next, reverse): NumberTuple => {
  const p = previous || current;
  const n = next || current;
  const smoothing = 0.2;
  const o = bezierCurve(p, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

type BezierPointGenerator = (point: NumberTuple, i: number, a: NumberTuple[]) => string;
export const bezierPointGenerator: BezierPointGenerator = (point, i, a): string => {
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};

type LinearPointGenerator = (point: NumberTuple) => string;
export const linearPointGenerator: LinearPointGenerator = (point): string => `L${point[0]},${point[1]}`;

type MidStepPointGenerator = (point: NumberTuple, i: number, a: NumberTuple[]) => string;
export const midStepPointGenerator: MidStepPointGenerator = (point, i, a): string => {
  const past = a[i - 1] || point;
  const midPoint = past[0] + ((point[0] - past[0]) / 2);
  return `H${midPoint} V${point[1]} H${point[0]}`;
};

type AfterStepPointGenerator = (point: NumberTuple) => string;
export const afterStepPointGenerator: AfterStepPointGenerator = (point): string => {
  return `V${point[1]} H${point[0]}`;
};

type BeforeStepPointGenerator = (point: NumberTuple) => string;
export const beforeStepPointGenerator: BeforeStepPointGenerator = (point): string => {
  return `H${point[0]} V${point[1]}`;
};
