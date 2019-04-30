import { NumberTuple, PointGenerator } from './pointGenerators';


type LineGenerator = (points: NumberTuple[], generator: PointGenerator) => string
export const lineGenerator: LineGenerator = (points, generator): string => {
  return points.reduce((acc, point, i, a) =>
    i === 0 ?
      `M ${point[0]},${point[1]}` :
      `${acc} ${generator(point, i, a)}`
  , '');
};
