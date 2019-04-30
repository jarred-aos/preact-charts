export interface ChartProps {
  name: string;
  height?: number;
  width?: number;
  margin?: Margin;
}

export interface ChartDefaultProps {
  height: number;
  width: number;
  margin: Margin;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface NumberObject {
  [key: string]: number;
}

export type DataArray = NumberObject[];

export interface GroupedDataObject {
  [key: string]: {name: number | string; value: number}[];
}

export interface DataObject {
  [key: string]: number | string | Date;
}

export interface TimestampData extends DataObject {
  timestamp: Date;
}

export type TimestampArray = TimestampData[];

export interface EventsData {
  idx: number;
  event: number;
  start: string | Date;
  end: string | Date;
  type: string;
  sub_type: string | null;
  comment: string | null;
}

export type NumberTuple = [number, number];
