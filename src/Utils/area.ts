import { DataArray } from '../types';
import { linearInterpolation } from './interpolators';
import { LineArgument } from './line';

interface AreaArgument extends LineArgument {
  y0: number;
}

export function area ({ x, y, y0, interpolation }: AreaArgument): (data: DataArray) => string {
  return function (data: DataArray): string {
    return data.reduce((acc, point, i, a) =>
      i === a.length - 1 ?
        `${acc} ${interpolation ? interpolation(point, x, y, i, a) : linearInterpolation(point, x, y)} V${y0} Z` :
        `${acc} ${interpolation ? interpolation(point, x, y, i, a) : linearInterpolation(point, x, y)}`
    , `M0,${y0}`);
  };
}
