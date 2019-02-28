[![npm](https://img.shields.io/npm/v/preact-charts.svg)](https://www.npmjs.com/package/preact-charts)
# preact-charts
⚛️ preact based charting library. Written with d3-maths, and TypeScript!

Install via `npm` using: `npm install preact-charts`.

The goal of this project is to be as light as possible adding some easy chart support to the preact ecosystem.
I have tried my best to limit the required dependencies to only the sections of d3 that are needed, while also not attempting to replicate already implemented code.

I hope that this library of components will be as developer friendly as possible, including easy ways for developers to style the charts as they wish.

The below documentation will include some TypeScript syntax. If you are new to TypeScript or don't use it, optional props are declared with a `?:`.

## Demos
[Trend and Range Charts](https://codesandbox.io/s/24r127q0yj?fontsize=14)

## Current Charts
### Difference Chart
Will display a vertical bar chart with a y-axis that is centered at 0 on the x-axis.

**Props:**
```typescript
interface DiffBarProps {
    name: string;
    data: Array<{name: string, value: number}>;
    height?: number;
    width?: number;
    margin?: Margin;
    ticks?: number;
}
```

**Usage:**
```tsx
import { h, Component } from 'preact';
import { DifferenceChart } from 'preact-charts';
const data: Array<{name: string, value: number}> = [...];
...
<DifferenceChart name='differenceChart' data={data}/>
```

### Grouped Bar Chart
**Props:**
```typescript
interface GroupedBarProps {
    name: string;
    data: GroupedDataObject;
    groups: string[];
    legendReference: {[key: string]: string};
    height?: number;
    width?: number;
    margin?: Margin;
    ticks?: number;
}
```
Where:
```typescript
interface GroupedDataObject {
    [key: string]: Array<{name: number | string, value: number}>;
}
```
Prop `legendReference` is an object where the keys are the same as the keys of the input data. The value is what will be displayed on the chart legend.

**Usage:**
```tsx
import { h, Component } from 'preact';
import { GroupedBar, GroupedDataObject } from 'preact-charts';
const data: GroupedDataObject = {...};
...
<GroupedBar name='groupedBar1' data={data} groups={Object.keys(data)} legendReference={chartLegendReference}/>
```

### Horizontal Bar Chart
This chart is the same as the GroupedBar, but is displayed with horizontal bars.

**Props:**
```typescript
interface HorizontalBarProps {
    name: string;
    data: GroupedDataObject;
    groups: string[];
    legendReference: {[key: string]: string};

    height?: number;
    width?: number;
    margin?: Margin;
    ticks?: number;
}
```

**Usage:**
```tsx
import { h, Component } from 'preact';
import { HorizontalBar, GroupedDataObject } from 'preact-charts';
const data: GroupedDataObject = {...};
...
<HorizontalBar name='hozBar' data={data} groups={Object.keys(data)} legendReference={chartLegendReference}/>
```

### Histogram

**Props:**
```typescript
interface HistogramProps {
    name: string;
    x: string;
    data: DataArray;
    height?: number;
    width?: number;
    margin?: Margin;
    ticks?: number;
}
```
`x` should be a key in `data`. Will display a histogram of the data with that key.

**Usage:**
```tsx
import { h, Component } from 'preact';
import { Histogram, DataArray } from 'preact-charts';
const data: DataArray = [...];
...
<Histogram name='histogram' x={Object.keys(data[0])[0]} data={data}/>
```

### LineScatter
**Props:**
```typescript
interface LineScatterProps {
    name: string;
    x: string;
    y: string;
    data: DataArray[];
    height?: number;
    width?: number;
    margin?: Margin;
    radius?: number;
    labels?: boolean;
    legendReference?: string[];
}
```
Input data is an array of data arrays. Each inner array will be displayed as a group of dots connected by a line.
`legendReference` is an array where `legendReference[index] === data[index]`. The index of legendReference relate to the index of the data.

LineScatter has a built in zoom functionality. Allowing user to select a portion of the chart and the axis will scale to that selection.
Double clicking the chart  will cause the zoom to reset.

**Usage:**
```tsx
import { h, Component } from 'preact';
import { LineScatter, DataArray } from 'preact-charts';
const data: DataArray[] = [...];
...
<LineScatter name='linescatter' data={data} x='dataKey1' y='dataKey2' labels={true} legendReference={legendRef}/>
```

### ScatterPlot
**Props:**
```typescript
interface ScatterPlotProps {
    name: string;
    x: string;
    y: string;
    data: DataArray;
    height?: number;
    width?: number;
    margin?: Margin;
    radius?: number;
    labels?: boolean;
}
```
The radius of the displayed circles can be changed. `labels` is a boolean determining if axis labels should be presented.

ScatterPlot also has a built in zoom functionality. Allowing user to select a portion of the chart and the axis will scale to that selection.
Double clicking the chart  will cause the zoom to reset.

**Usage:**
```tsx
import { h, Component } from 'preact';
import { ScatterPlot, DataArray } from 'preact-charts';
const data: DataArray = [...];
...
<ScatterPlot name='scatter' data={data} x='dataKey1' y='dataKey2' labels={true}/>
```

### RangeChart
**Props:**
```typescript
interface RangeChartProps {
    name: string;
    y: string;
    data: TimestampArray;
    height?: number;
    width?: number;
    margin?: Margin;
    lineColour?: string;
    fillColour?: string;
    onBrush?: (extent: Date[]) => void;
}
```
Input data requires a key called `timestamp` which is a parsed date. `onBrush` is called when the chart has been brushed.
This allows for data filtering based on returned time extents. `onBrush` gets the argument of extent which is an array of length 2, which is `[start, end]`

**Usage:**
```tsx
import { h, Component } from 'preact';
import { RangeChart, TimestampArray } from 'preact-charts';
const data: TimestampArray = [...];
...
<RangeChart name='rangechart' y={yKey} data={data} onBrush={this.handleRangeBrush}/>

this.handleRangeBrush = (extent: Date[]) => {
    const brushStart = extent[0];
    const brushEnd = extent[1];
    // do something with brush extents
}
```

### TrendChart
**Props:**
```typescript
interface TrendChartProps {
    name: string;
    x: string;
    y: string;
    data: TimestampArray;
    height?: number;
    width?: number;
    margin?: Margin;
    lineColour?: string;
    extent?: Date[];
    tooltip?: boolean;
    axisControl?: boolean;
}
```
Allows you to pass an extent, as generated by the RangeChart onBrush to filter the presented data. Allows choice of x-axis key, which must still be a date.
Line colour is customizable.
Tooltip being on will display a circle with the related data displayed when hovering over the chart. The chosen point is the closet to the current mouse location.
Axis control being `true` will display `plus` and `minus` buttons at the top and bottom of the y-axis. Allowing the users to have control over the y-axis.

TrendChart is also allowed to have `<Flag />` child components, which will be displayed on the chart and can be interacted with.

**Usage:**
```tsx
import { h, Component } from 'preact';
import { TrendChart, Flag, TimestampArray } from 'preact-charts';
const data: TimestampArray = [...];
const flags: EventsData[] = [...];
...
<TrendChart name='trend1' data={data} y={yKey} x='timestamp' lineColour='cyan' extent={state.rangeExtent}>
    {
        // optional flag addition
        flags.map((flag) => <Flag isClicked={isFlagClicked} {...flag} onClick={this.handleFlagClick}/>)
    }
</TrendChart>

this.handleFlagClick = (e: number) => {
    // e is the flagID number
}
```

## Other Components
### Flag
**Props:**
```typescript
interface FlagProps extends EventsData {
    onClick: (flagID: number) => void;
    isClicked: boolean;
}
```
These are the flag props required from the user, the rest are passed through in TrendChart.
onClick is a function when the flag is clicked.
The flags do not manage their own state and should be told when they should stay in the clicked state. Clicked flags will have a green topper.
Flags will be displayed as a rectangle with over the extent of [start, end]

## Types Reference
```typescript
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
    [key: string]: Array<{name: number | string, value: number}>;
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
```
## Styling
Below is the default styling for each piece. These classes are global so styles can be over-ridden in your css files.
```css
/* Change axis text */
.axis {
    font-size: 1em;
    cursor: default;
}

/* Change axis tick marks */
.axis>.tick>line {
    stroke-width: 1px;
    stroke: black;
    stroke-opacity: 0.5;
    shape-rendering: crispEdges;
}

/* Change axis lines */
.axis>path {
    stroke-width: 2px;
}

/* Removes top line from charts with gridlines */
.grid>path {
    stroke: none;
}

/* Changes chart grid lines */
.grid>.tick>line {
    stroke-width: 1px;
    stroke-opacity: 0.5;
}

/* Histogram bar styling */
.histogramBar {
    fill: steelblue;
    fill-opacity: 1;
    stroke: black;
    stroke-width: 1px;
}

/* Scatter Plot circle */
.dot {
    fill: #7dc7f4;
    stroke: whitesmoke;
    stroke-width: 1px;
}

/* Chart labels */
.label {
    fill: black;
}

/* Range chart brush handles */
.brush > rect.handle {
    fill: darkgoldenrod;
}

/* Default trend chart flag */
.flag {
    fill: gray;
    stroke-width: 1;
    stroke-opacity: 0.9;
    fill-opacity: 0.45;
    stroke: cornflowerblue;
}

.flag:hover {
    fill: lightgray;
}

/* Flag topper */
.topper {
    fill: red;
    fill-opacity: 1;
}

/* Flag topper colour when clicked */
.topperClicked {
    fill: lawngreen;
    fill-opacity: 1;
}

/* Required for trend chart tooltip */
.tooltipOverlay {
    fill: none;
    pointer-events: all;
    border-top: none;
    border-style: none;
}

/* Trend chart tooltip circle */
.tooltipCircle {
    fill: none;
    stroke-width: 2;
    stroke: gold;
}

/* Trend chart tooltip text */
.tooltipText {
    stroke: 1em;
}

/* Trend chart axis controls */
.axisControl {
    stroke: goldenrod;
    text-anchor: middle;
    user-select: none;
    font-size: 1.1em;
}
.axisControlPlus {
    cursor: pointer;
    width: 12px;
}
.axisControlPlus:hover {
    stroke: rgb(250, 223, 154);
}
.axisControlMinus {
    cursor: pointer;
    width: 12px;
    transform: translate(0, 1em);
}
.axisControlMinus:hover {
    stroke: rgb(250, 223, 154);
}

```

## Features
This is a note on some features that are included:

I use resize observer to ensure that the charts will resize on window resize. This requires a browser that implements this feature or a polyfill.
This also means that the charts will always fill their parent container. So placing them in sized divs is important.

Chart names should be unique, they are used for things like chart clipPath IDs.

## Contributing
Please fork and submit pull requests for anything that could be improved. This is my first real repo, I know there has been some oversight as this was created
for my work, so some things may be a bit specific to that environment. Documentation requests are also much appreciated.
