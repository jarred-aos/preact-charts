import { DataObject, DataArray, NumberTuple } from '../types';
import { ValueAccessor } from './line';

export type InterpolatorFunction = (point: DataObject, x: ValueAccessor, y: ValueAccessor, i?: number, a?: DataArray) =>
string;

export const linearInterpolation: InterpolatorFunction = (point, x, y): string => `L${x(point)},${y(point)}`;

export const stepMidInterpolation: InterpolatorFunction = (point, x, y, i, a): string => {
  const past = x(a[i - 1]) || x(point);
  const midPoint = past + ((x(point) - past) / 2);
  return `H${midPoint} V${y(point)} H${x(point)}`;
};

export const stepAfterInterpolation: InterpolatorFunction = (point, x, y): string => {
  return `V${y(point)} H${x(point)}`;
};

export const stepBeforeInterpolation: InterpolatorFunction = (point, x, y): string =>
  `H${x(point)} V${y(point)}`;



export const bezierCurve = (pointA: NumberTuple, pointB: NumberTuple): {length: number; angle: number} => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

// eslint-disable-next-line max-len
type ControlPoint = (x: ValueAccessor, y: ValueAccessor, current: DataObject, previous: DataObject, next: DataObject, reverse?: boolean) => NumberTuple;
export const controlPoint: ControlPoint = (x, y, current, previous, next, reverse): NumberTuple => {
  const p = previous || current;
  const n = next || current;
  const smoothing = 0.15;
  const o = bezierCurve([x(p), y(p)], [x(n), y(n)]);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const xPos = x(current) + Math.cos(angle) * length;
  const yPos = y(current) + Math.sin(angle) * length;
  return [xPos, yPos];
};

export const bezierInterpolation: InterpolatorFunction = (point, x, y, i, a): string => {
  const [cpsX, cpsY] = controlPoint(x, y, a[i - 1], a[i - 2], point);
  const [cpeX, cpeY] = controlPoint(x, y, point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${x(point)},${y(point)}`;
};
