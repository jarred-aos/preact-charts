import { Component } from 'preact';
import { Margin, TimestampArray } from '../../types';
interface RangeChartProps {
    name: string;
    height?: number;
    width?: number;
    margin?: Margin;
    y: string;
    data: TimestampArray;
    lineColour?: string;
    fillColour?: string;
    onBrush?: (extent: Date[]) => void;
    brushColour?: string;
}
interface RangeChartDefaultProps {
    height: number;
    width: number;
    margin?: Margin;
    lineColour?: string;
    fillColour?: string;
    onBrush?: (extent: Date[]) => void;
    brushColour: string;
}
interface RangeChartState {
    width: number;
    innerWidth: number;
    height: number;
    innerHeight: number;
    extent?: number[];
}
export declare class RangeChart extends Component<RangeChartProps, RangeChartState> {
    static defaultProps: RangeChartDefaultProps;
    private brush;
    private brushSetup;
    private xScale;
    private chartSVG;
    private resizeOb;
    private brushClass;
    constructor(props: RangeChartProps);
    render(props: RangeChartProps, { width, height, innerWidth, innerHeight }: RangeChartState): JSX.Element;
    componentDidMount: () => void;
    componentWillUnmount(): void;
    private resizeChart;
}
export {};
