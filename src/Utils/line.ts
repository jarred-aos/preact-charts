import { DataArray, DataObject } from '../types';
import { InterpolatorFunction, linearInterpolation } from './interpolators';
export type ValueAccessor = (point: DataObject) => number

export interface LineArgument {
  x: ValueAccessor;
  y: ValueAccessor;
  interpolation?: InterpolatorFunction;
}

export function line ({ x, y, interpolation }: LineArgument): (data: DataArray) => string {
  return function (data: DataArray): string {
    return data.reduce((acc, point, i, a) =>
      i === 0 ?
        `M ${x(point)},${y(point)}` :
        `${acc} ${interpolation ? interpolation(point, x, y, i, a) : linearInterpolation(point, x, y)}`
    , '');
  };
}
